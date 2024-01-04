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
  Td,
  IsStake
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
import { formatDistance } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export const GovernanceView = () => {
  const theme = useTheme();
  const { network, activeNetwork } = useAppSelector((state) => state.networks);
  const { address, accountBalance } = useAppSelector((state) => state.wallet);
  const [sidebar, setSidebar] = useState<{ text: string; icon: IconName } | {}>(
    {}
  );
  const [value, setValue] = useState('0');
  const [isStake, setIsStake] = useState(true);
  const {
    getStaking,
    sendStake,
    sendUnStake,
    getVotes,
    getBlock,
    getConsensusInfo,
    getAccountVotes,
    blockchain,
    sendVote
  } = useAergoSnap();

  const [stakingChartData, setStakingChartData] = useState(
    initialStakingChartData
  );
  const [inputStakingChartData, setInputStakingChartData] = useState(
    initialInputStakingChart
  );
  const [votingChartData, setVotingChartData] = useState(initialVotingChart);
  const [rewards, setRewards] = useState({ blockCount: 0, blockPerDay: [] });
  const [hash, setHash] = useState('');
  const [remainVotingTime, setRemainVotingTime] = useState('');
  const [expectedRewards, setExpectedRewards] = useState(0);

  useEffect(() => {
    const getStakedBalance = async () => {
      const { amount } = await getStaking(address);
      if (amount && accountBalance) {
        const staked = Math.floor(Number(formatTokenAmount(amount, '', 18)));
        const unstaked = Math.floor(
          Number(formatTokenAmount(String(BigInt(accountBalance)), '', 18))
        );
        if (staked || unstaked) {
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
          newInputStakingChartData.labels.push(
            `New ${isStake ? 'Staking' : 'UnStaking'}: ${value} AERGO`
          );
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
  }, [address, accountBalance, isStake, activeNetwork]);

  const handleStake = async () => {
    const valueWithDecimals = amountWithDecimals(value, 18);
    if (isStake) {
      const stakeResults = await sendStake(address, valueWithDecimals);
      console.log(stakeResults, 'stakeResults');
    } else {
      const unStakeResults = await sendUnStake(address, valueWithDecimals);
      console.log(unStakeResults, 'unStakeResults');
    }
  };

  const handleClickVotingPower = async (payload: any) => {
    const sendVoteResults = await sendVote(address, payload);
    console.log(sendVoteResults, 'sendVoteResults');
    console.log(sendVoteResults[0].hash, 'sendVoteResults hash');
    if (!sendVoteResults[0].error) {
      setHash(sendVoteResults[0].hash);
    } else {
      console.log(sendVoteResults[0].error, 'Not Voting yet');
    }
  };

  useEffect(() => {
    const newInputChartData = cloneDeep(inputStakingChartData);
    newInputChartData.labels[2] = `New ${
      isStake ? 'Staking' : 'UnStaking'
    }: ${value} AERGO`;
    if (isStake) {
      newInputChartData.datasets[0].data[2] = +value;
      newInputChartData.labels[1] = `UnStaked: ${
        stakingChartData.datasets[0].data[1] - +value
      } AERGO`;
      newInputChartData.datasets[0].data[1] =
        stakingChartData.datasets[0].data[1] - +value;
    } else if (stakingChartData.datasets[0].data[0] > +value) {
      newInputChartData.labels[0] = `Staked: ${
        stakingChartData.datasets[0].data[0] - +value
      } AERGO`;
      newInputChartData.datasets[0].data[0] =
        stakingChartData.datasets[0].data[0] - +value;
    } else if (stakingChartData.datasets[0].data[0] < +value) {
      console.log('Cannot Unstake, because No staked enough');
    }
    setInputStakingChartData(newInputChartData);
  }, [isStake, value]);

  useEffect(() => {
    const getRewards = async () => {
      const { when } = await getStaking(address);
      if (when) {
        const { header } = await getBlock(when);
        if (header?.timestamp) {
          const nextActionTime =
            header.timestamp / 1000000 + 60 * 60 * 24 * 1000;
          const now = Math.floor(new Date().getTime());

          if (nextActionTime < now) {
            setRemainVotingTime('now');
          } else {
            setRemainVotingTime(formatDistance(new Date(), nextActionTime));
          }
        }
      }
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
    if (address) {
      getRewards();
    }
  }, [address, hash, activeNetwork]);

  useEffect(() => {
    const newVotingChartData = cloneDeep(votingChartData);
    const getVotesFunc = async () => {
      const { bps } = await getConsensusInfo();
      const { voting } = await getAccountVotes(address);
      console.log(voting, 'voting');
      const { chainInfo } = await blockchain();
      votesList.find(async (votes) =>
        votes.id === 'voteBP'
          ? ((votes.defaultValue = 'ALL'),
            (votes.payload = {
              name: 'v1voteBP',
              args: bps?.map((bp: any) => bp.PeerID)
            }),
            (votes.userVotes = voting?.find(
              (accountVote: any) => accountVote.id === votes.id
            )),
            (newVotingChartData.datasets[0].data[0] = Math.floor(
              +Number(
                formatTokenAmount(
                  voting?.find(
                    (accountVote: any) => accountVote.id === votes.id
                  )?.amount,
                  '',
                  18
                )
              )
            )),
            (newVotingChartData.datasets[0].data[5] =
              stakingChartData.datasets[0].data[0] * 5 -
              Math.floor(
                +Number(
                  formatTokenAmount(
                    voting?.find(
                      (accountVote: any) => accountVote.id === votes.id
                    )?.amount,
                    '',
                    18
                  )
                )
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
            (votes.userVotes = voting?.find(
              (accountVote: any) => accountVote.id === votes.id
            )),
            (newVotingChartData.datasets[0].data[1] = Math.floor(
              +Number(
                formatTokenAmount(
                  voting?.find(
                    (accountVote: any) => accountVote.id === votes.id
                  )?.amount,
                  '',
                  18
                )
              )
            )),
            (newVotingChartData.datasets[0].data[5] =
              newVotingChartData.datasets[0].data[5] -
              Math.floor(
                +Number(
                  formatTokenAmount(
                    voting?.find(
                      (accountVote: any) => accountVote.id === votes.id
                    )?.amount,
                    '',
                    18
                  )
                )
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
            (votes.userVotes = voting?.find(
              (accountVote: any) => accountVote.id === votes.id
            )),
            (newVotingChartData.datasets[0].data[2] = Math.floor(
              +Number(
                formatTokenAmount(
                  voting?.find(
                    (accountVote: any) => accountVote.id === votes.id
                  )?.amount,
                  '',
                  18
                )
              )
            )),
            (newVotingChartData.datasets[0].data[5] =
              newVotingChartData.datasets[0].data[5] -
              Math.floor(
                +Number(
                  formatTokenAmount(
                    voting?.find(
                      (accountVote: any) => accountVote.id === votes.id
                    )?.amount,
                    '',
                    18
                  )
                )
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
            (votes.userVotes = voting?.find(
              (accountVote: any) => accountVote.id === votes.id
            )),
            (newVotingChartData.datasets[0].data[3] = Math.floor(
              +Number(
                formatTokenAmount(
                  voting?.find(
                    (accountVote: any) => accountVote.id === votes.id
                  )?.amount,
                  '',
                  18
                )
              )
            )),
            (newVotingChartData.datasets[0].data[5] =
              newVotingChartData.datasets[0].data[5] -
              Math.floor(
                +Number(
                  formatTokenAmount(
                    voting?.find(
                      (accountVote: any) => accountVote.id === votes.id
                    )?.amount,
                    '',
                    18
                  )
                )
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
            (votes.userVotes = voting?.find(
              (accountVote: any) => accountVote.id === votes.id
            )),
            (newVotingChartData.datasets[0].data[4] = Math.floor(
              +Number(
                formatTokenAmount(
                  voting?.find(
                    (accountVote: any) => accountVote.id === votes.id
                  )?.amount,
                  '',
                  18
                )
              )
            )),
            (newVotingChartData.datasets[0].data[5] =
              newVotingChartData.datasets[0].data[5] -
              Math.floor(
                +Number(
                  formatTokenAmount(
                    voting?.find(
                      (accountVote: any) => accountVote.id === votes.id
                    )?.amount,
                    '',
                    18
                  )
                )
              )))
          : null
      );

      setVotingChartData(newVotingChartData);
    };
    if (address && stakingChartData.datasets[0].data[0]) {
      getVotesFunc();
    }
  }, [address, hash, activeNetwork, stakingChartData.datasets[0].data[0]]);

  const handleClickAmountPercent = (percent: string) => {
    setValue(String(stakingChartData.datasets[0].data[1] * (+percent / 100)));
  };

  useEffect(() => {
    const getExpectedRewards = async () => {
      //* (My VotingPowers / Total Voting Power) * 86400
      const { chainInfo } = await blockchain();
      if (chainInfo?.totalvotingpower) {
        const formatedTotalVotingPower = Number(
          formatTokenAmount(chainInfo.totalvotingpower, '', 18)
        );
        setExpectedRewards(
          Math.floor(
            ((votingChartData.datasets[0].data[0] +
              votingChartData.datasets[0].data[1] +
              votingChartData.datasets[0].data[2] +
              votingChartData.datasets[0].data[3] +
              votingChartData.datasets[0].data[4]) /
              formatedTotalVotingPower) *
              86400 *
              0.16 *
              100
          ) / 100
        );
      }
    };
    getExpectedRewards();
  }, [votingChartData.datasets[0].data, stakingChartData.datasets[0].data]);

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
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{block['key_as_string']}</Td>
                  <Td>{block['doc_count']}</Td>
                  <Td>{Math.floor(block['doc_count'] * 0.16 * 100) / 100}</Td>
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
                +stakingChartData.datasets[0].data[0] +
                +stakingChartData.datasets[0].data[1]
              } ]`}</VotingTitle>

              <Row style={{ width: '20rem' }}>
                <IsStake onClick={() => setIsStake(true)}>
                  <input
                    type="radio"
                    checked={isStake}
                    onChange={() => setIsStake(true)}
                  />
                  <label>Stake</label>
                </IsStake>
                <IsStake onClick={() => setIsStake(false)}>
                  <input
                    type="radio"
                    checked={!isStake}
                    onChange={() => setIsStake(false)}
                  />
                  <label>UnStake</label>
                </IsStake>
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
              {maxArr.map((max) => (
                <Max
                  key={max}
                  onClick={() => handleClickAmountPercent(max)}
                >{`${max}%`}</Max>
              ))}
            </Row>
          </Column>
          <Button style={{ width: '100%' }} onClick={handleStake}>
            Continue
          </Button>
        </ModalWrapper>
      </PopIn>
      <PopIn isOpen={sidebar.text === 'Voting'} setIsOpen={setSidebar}>
        <ModalWrapper>
          {stakingChartData.datasets[0].data[0] ? (
            <Column>
              <TextWrapper>
                <VotingTitle>{`Voting Power [ ${
                  votingChartData.datasets[0].data[0] +
                  votingChartData.datasets[0].data[1] +
                  votingChartData.datasets[0].data[2] +
                  votingChartData.datasets[0].data[3] +
                  votingChartData.datasets[0].data[4]
                }/${stakingChartData.datasets[0].data[0] * 5} ]`}</VotingTitle>
              </TextWrapper>
              <TextWrapper>
                <VotingInfo>
                  - Next Voting time in {remainVotingTime}
                </VotingInfo>
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
                <RewardValue>
                  {expectedRewards}
                  {/* {Math.floor(rewards.blockCount * 0.16 * 10000) / 10000} AERGO */}
                </RewardValue>
              </TextWrapper>
              {votesList.map(
                ({ name, defaultValue, payload, userVotes }, idx) => (
                  <Row style={{ width: '100%' }} key={name}>
                    <InputWithLabel
                      style={{ padding: '0 0.5rem' }}
                      label={`${name}: ${defaultValue}`}
                      disabled
                      value={''}
                    >
                      <VoteWrapper>
                        <Voted
                          percentage={`${
                            (votingChartData.datasets[0].data[idx] /
                              stakingChartData.datasets[0].data[0]) *
                            100
                          }`}
                        />
                        <UnVoted
                          percentage={`${
                            (votingChartData.datasets[0].data[idx] /
                              stakingChartData.datasets[0].data[0]) *
                            100
                          }`}
                        />
                      </VoteWrapper>
                      <Percentage>
                        {`${
                          Math.floor(
                            (votingChartData.datasets[0].data[idx] /
                              stakingChartData.datasets[0].data[0]) *
                              100 *
                              10
                          ) / 10
                        }%`}
                      </Percentage>
                    </InputWithLabel>
                    <FlexEnd>
                      <VotingPowerValue>{`[ ${votingChartData.datasets[0].data[idx]}/${stakingChartData.datasets[0].data[0]} ]`}</VotingPowerValue>
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
                )
              )}
            </Column>
          ) : (
            <span>Staking first</span>
          )}
        </ModalWrapper>
      </PopIn>
    </Wrapper>
  );
};

const votesList = [
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
];

const initialVotingChart = {
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
      data: [0, 0, 0, 0, 0, 0],
      borderWidth: 1
    }
  ]
};

const initialStakingChartData = {
  labels: ['Staked: 0 aergo', 'UnStake: 0 aergo'],
  datasets: [
    {
      label: '# of AERGOS',
      data: [0, 0],
      borderWidth: 1
    }
  ]
};

const initialInputStakingChart = {
  labels: ['Staked: 0 aergo', 'UnStake: 0 aergo', 'New Staking: 0 aergo'],
  datasets: [
    {
      label: '# of AERGOS',
      data: [0, 0, 0],
      borderWidth: 1
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  }
};

const maxArr = ['10', '25', '50', '75', '100'];
