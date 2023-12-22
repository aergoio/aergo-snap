import { SideBar } from 'ui/molecule/SideBar';
import {
  Row,
  Column,
  Wrapper,
  Max,
  TextWrapper,
  ModalWrapper,
  PieWrapper,
  VoteWrapper,
  Voted,
  UnVoted,
  Percentage,
  VotingTitle,
  VotingInfo,
  RewardTitle,
  RewardValue,
  FlexEnd,
  VotingPowerValue,
  TableWrapper,
  TableTitle,
  Table,
  TableHead,
  TableBody,
  Th,
  Tr,
  Td
} from './Governance.style';
import { useEffect, useState } from 'react';
import { Button } from 'ui/atom/Button';
import { InputWithLabel } from 'ui/molecule/InputWithLabel';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { PopIn } from 'ui/molecule';
import { useAergoSnap } from 'apis/useAergoSnap';
import { useAppSelector } from 'hooks/redux';
import { amountWithDecimals, formatTokenAmount } from 'utils/utils';
import { useTheme } from 'styled-components';
import { cloneDeep } from 'lodash';
import { scanApi } from 'apis/scanApi';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  }
};

export const GovernanceView = () => {
  const theme = useTheme();
  const { network } = useAppSelector((state) => state.networks);
  const { address, accountBalance } = useAppSelector((state) => state.wallet);
  const [sidebar, setSidebar] = useState<{ text: string; icon: IconName }>({});
  const [value, setValue] = useState('0');
  const [isStake, setIsStake] = useState(true);
  const {
    getStaking,
    sendStake,
    getVotes,
    getConsensusInfo,
    getAccountVotes,
    blockchain,
    sendVote
  } = useAergoSnap();
  const [votesList, setVotesList] = useState([
    {
      id: 'voteBP',
      name: 'Block Producers',
      defaultValue: '',
      payload: { name: 'v1voteBP', args: [] },
      userVotes: { amount: '', candidates: [], id: '' }
    },
    {
      id: 'BPCOUNT',
      name: 'Block Producer Count',
      defaultValue: '',
      payload: { name: 'v1voteDAO', args: ['BPCOUNT', ''] },
      userVotes: { amount: '', candidates: [], id: '' }
    },
    {
      id: 'STAKINGMIN',
      name: 'Staking Minimum',
      defaultValue: '',
      payload: { name: 'v1voteDAO', args: ['STAKINGMIN', ''] },
      userVotes: { amount: '', candidates: [], id: '' }
    },
    {
      id: 'GASPRICE',
      name: 'Gas Price',
      defaultValue: '',
      payload: { name: 'v1voteDAO', args: ['GASPRICE', ''] },
      userVotes: { amount: '', candidates: [], id: '' }
    },
    {
      id: 'NAMEPRICE',
      name: 'Name Transaction Price',
      defaultValue: '',
      payload: { name: 'v1voteDAO', args: ['NAMEPRICE', ''] },
      userVotes: { amount: '', candidates: [], id: '' }
    }
  ]);
  const [stakingChartData, setStakingChartData] = useState({
    labels: ['Staked: 0 aergo', 'UnStake: 0 aergo'],
    datasets: [
      {
        label: '# of AERGOS',
        data: [0, 0],
        borderWidth: 1
      }
    ]
  });
  const [inputStakingChartData, setInputStakingChartData] = useState({
    labels: ['Staked: 0 aergo', 'UnStake: 0 aergo', 'Input: 0 aergo'],
    datasets: [
      {
        label: '# of AERGOS',
        data: [0, 0, 0],
        borderWidth: 1
      }
    ]
  });
  const [votingChartData, setVotingChartData] = useState({
    labels: [
      'BP',
      'BP Count',
      'Gas Price',
      'Staking Minimum',
      'Name Price',
      'UnVoting'
    ],
    datasets: [
      {
        label: '# of Voting Power',
        data: [10, 20, 30, 40, 50, 20],
        borderWidth: 1
      }
    ]
  });
  const [rewards, setRewards] = useState({ blockCount: 0, blockPerDay: [] });

  useEffect(() => {
    const getStakedBalance = async () => {
      const { amount } = await getStaking(address);
      if (amount && accountBalance) {
        const staked = Number(formatTokenAmount(amount, '', 18));
        const unstaked = Number(
          formatTokenAmount(
            String(BigInt(accountBalance) - BigInt(amount)),
            '',
            18
          )
        );
        if (staked && unstaked) {
          const newStakingChartData = {
            labels: [`Staked: ${staked} AERGO`, `UnStaked: ${unstaked} AERGO`],
            datasets: [
              {
                label: '# of AERGOS',
                data: [staked, unstaked],
                borderWidth: 1
              }
            ]
          };
          setStakingChartData(newStakingChartData);
          const newInputStakingChartData = cloneDeep(newStakingChartData);
          newInputStakingChartData.labels.push('Input: 0 AERGO');
          newInputStakingChartData.datasets[0].data.push(0);
          setInputStakingChartData(newInputStakingChartData);
        }
      }
    };

    if (address && accountBalance) {
      getStakedBalance();
    } else {
      console.log('no Balance');
    }
  }, [address, accountBalance]);

  const handleStake = async () => {
    const valueWithDecimals = amountWithDecimals(value, 18);
    // console.log(valueWithDecimals, 'valueWithDecimals');
    const results = await sendStake(address, valueWithDecimals);
    console.log(results, 'results');
  };

  useEffect(() => {
    const getVotesFunc = async () => {
      const { bps } = await getConsensusInfo();
      const { chainInfo } = await blockchain();
      const { voting } = await getAccountVotes(address);

      votesList.find((votes) =>
        votes.id === 'voteBP'
          ? ((votes.defaultValue = 'ALL'),
            (votes.payload = {
              name: 'v1voteBP',
              args: bps?.map((bp: any) => bp.PeerID)
            }),
            (votes.userVotes = voting.find(
              (accountVote: any) => accountVote.id === votes.id
            )))
          : null
      );

      votesList.find((votes) =>
        votes.id === 'BPCOUNT'
          ? ((votes.defaultValue = chainInfo?.bpNumber),
            (votes.payload = {
              name: 'v1voteDAO',
              args: ['BPCOUNT', String(chainInfo?.bpNumber)]
            }),
            (votes.userVotes = voting.find(
              (accountVote: any) => accountVote.id === votes.id
            )))
          : null
      );

      votesList.find((votes) =>
        votes.id === 'STAKINGMIN'
          ? ((votes.defaultValue = formatTokenAmount(
              chainInfo?.stakingminimum,
              'AERGO',
              18
            ) as string),
            (votes.payload = {
              name: 'v1voteDAO',
              args: ['STAKINGMIN', chainInfo?.stakingminimum]
            }),
            (votes.userVotes = voting.find(
              (accountVote: any) => accountVote.id === votes.id
            )))
          : null
      );

      votesList.find((votes) =>
        votes.id === 'GASPRICE'
          ? ((votes.defaultValue = formatTokenAmount(
              chainInfo?.gasprice,
              'gaer',
              9
            ) as string),
            (votes.payload = {
              name: 'v1voteDAO',
              args: ['GASPRICE', chainInfo?.gasprice]
            }),
            (votes.userVotes = voting.find(
              (accountVote: any) => accountVote.id === votes.id
            )))
          : null
      );

      votesList.find((votes) =>
        votes.id === 'NAMEPRICE'
          ? ((votes.defaultValue = formatTokenAmount(
              chainInfo?.nameprice,
              'AERGO',
              18
            ) as string),
            (votes.payload = {
              name: 'v1voteDAO',
              args: ['NAMEPRICE', chainInfo?.nameprice]
            }),
            (votes.userVotes = voting.find(
              (accountVote: any) => accountVote.id === votes.id
            )))
          : null
      );
    };
    if (address) {
      getVotesFunc();
    }
  }, [address]);

  const handleClickVotingPower = async (payload: any) => {
    console.log(payload, 'payload');
    const results = await sendVote(address, payload);
    console.log(results, 'results');
  };

  useEffect(() => {
    if (isStake) {
      const newInputChartData = cloneDeep(inputStakingChartData);
      console.log(newInputChartData, 'newInputChartData1');
      newInputChartData.labels[2] = `${value} AERGO`;
      newInputChartData.datasets[0].data[2] = +value;
      console.log(newInputChartData, 'newInputChartData2');
      setInputStakingChartData(newInputChartData);
    }
  }, [value]);

  useEffect(() => {
    const getRewards = async () => {
      const scanApiInstance = await scanApi(network);
      if (scanApiInstance && address) {
        const getRewardsHistory = (
          await scanApiInstance.get(
            `rewards?address=${address}&sort=no:desc&size=30&from=0`
          )
        ).data;
        setRewards(getRewardsHistory);
      }
    };
    getRewards();
  }, [address]);

  return (
    <Wrapper>
      <PieWrapper>
        <Pie
          data={stakingChartData}
          options={{
            ...options,
            plugins: {
              legend: {
                labels: { color: theme.colors.grey.grey6 },
                position: 'bottom'
              }
            }
          }}
        />
      </PieWrapper>
      <SideBar
        type="row"
        buttons={[
          { text: 'Staking', icon: 'coins' },
          { text: 'Voting', icon: 'money-bill-trend-up' }
        ]}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      <TableWrapper>
        <TableTitle>Last 30 days Rewards</TableTitle>
        <Table>
          <TableHead>
            <Tr>
              <Th>
                <div>#</div>
              </Th>
              <Th>
                <div>TIMESTAMP</div>
              </Th>
              <Th>
                <div>COUNT</div>
              </Th>
              <Th>
                <div>REWARD</div>
              </Th>
            </Tr>
          </TableHead>
          <TableBody>
            {rewards.blockPerDay.length > 0 ? (
              rewards.blockPerDay.map((block: any, idx) => (
                <Tr>
                  <Td>{idx + 1}</Td>
                  <Td>{block['key_as_string']}</Td>
                  <Td>{block['doc_count']}</Td>
                  <Td>{block['doc_count'] * 0.16}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={100}>No Rewards Historys</Td>
              </Tr>
            )}
          </TableBody>
        </Table>
      </TableWrapper>

      <PopIn isOpen={sidebar.text === 'Staking'} setIsOpen={setSidebar}>
        <ModalWrapper>
          <Column>
            <TextWrapper>
              <VotingTitle>{`Stake [ ${
                inputStakingChartData.datasets[0].data[0]
              }/${
                inputStakingChartData.datasets[0].data[0] +
                inputStakingChartData.datasets[0].data[1]
              } ]`}</VotingTitle>

              <Row style={{ width: '20rem' }}>
                <div>
                  <input type="radio" />
                  <label>Stake</label>
                </div>
                <div>
                  <input type="radio" />
                  <label>UnStake</label>
                </div>
              </Row>
            </TextWrapper>

            <Doughnut
              style={{ maxHeight: '300px' }}
              data={inputStakingChartData}
            />
            <InputWithLabel
              value={value}
              setValue={setValue}
              width="80%"
              align="center"
            />
            <Row
              style={{
                width: '65%',
                marginRight: '4rem',
                marginBottom: '2rem'
              }}
            >
              <Max>10%</Max>
              <Max>25%</Max>
              <Max>50%</Max>
              <Max>75%</Max>
              <Max>MAX</Max>
            </Row>
          </Column>
          <Button style={{ width: '100%' }} onClick={handleStake}>
            Continue
          </Button>
        </ModalWrapper>
      </PopIn>
      <PopIn isOpen={sidebar.text === 'Voting'} setIsOpen={setSidebar}>
        <ModalWrapper>
          <Column>
            <TextWrapper>
              <VotingTitle>{`Voting Power [ ${
                stakingChartData.datasets[0].data[0]
              }/${stakingChartData.datasets[0].data[0] * 5} ]`}</VotingTitle>
            </TextWrapper>
            <TextWrapper>
              <VotingInfo>- Next voting time in 1 day</VotingInfo>
            </TextWrapper>
            <Pie
              style={{ maxHeight: '300px' }}
              data={votingChartData}
              options={{
                ...options,
                plugins: { legend: { position: 'right' } }
              }}
            />
            <TextWrapper style={{ textAlign: 'center' }}>
              <RewardTitle>Expected Daily Reward</RewardTitle>
              <RewardValue>{rewards.blockCount * 0.16} AERGO</RewardValue>
            </TextWrapper>
            {votesList.map(({ name, defaultValue, payload, userVotes }) => (
              <Row style={{ width: '100%' }}>
                <InputWithLabel
                  style={{ padding: '0 0.5rem' }}
                  label={`${name}: ${defaultValue}`}
                  disabled
                  value={''}
                >
                  <VoteWrapper>
                    <Voted
                      percentage={
                        (Number(
                          formatTokenAmount(userVotes.amount || '0', '', 18)
                        ) /
                          stakingChartData.datasets[0].data[0]) *
                        100
                      }
                    />
                    <UnVoted
                      percentage={
                        (Number(
                          formatTokenAmount(userVotes.amount || '0', '', 18)
                        ) /
                          stakingChartData.datasets[0].data[0]) *
                        100
                      }
                    />
                  </VoteWrapper>
                  <Percentage>
                    {`${
                      (Number(
                        formatTokenAmount(userVotes.amount || '0', '', 18)
                      ) /
                        stakingChartData.datasets[0].data[0]) *
                      100
                    }%`}
                  </Percentage>
                </InputWithLabel>
                <FlexEnd>
                  <VotingPowerValue>{`[ ${Number(
                    formatTokenAmount(userVotes.amount || '0', '', 18)
                  )}/${
                    stakingChartData.datasets[0].data[0]
                  } ]`}</VotingPowerValue>
                  <Button
                    onClick={() => handleClickVotingPower(payload)}
                    variant="font-gradation"
                    style={{
                      marginLeft: '2rem'
                    }}
                    fontSize="1.4rem"
                  >
                    Power Up
                  </Button>
                </FlexEnd>
              </Row>
            ))}
          </Column>
        </ModalWrapper>
      </PopIn>
    </Wrapper>
  );
};
