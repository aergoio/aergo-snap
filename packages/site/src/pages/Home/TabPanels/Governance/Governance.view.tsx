import { SideBar } from 'ui/molecule/SideBar';
import {
  Row,
  Column,
  Wrapper,
  Max,
  StakedBalance,
  ModalWrapper
} from './Governance.style';
import { useEffect, useState } from 'react';
import { Button } from 'ui/atom/Button';
import { InputWithLabel } from 'ui/molecule/InputWithLabel';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PopIn } from 'ui/molecule';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    'Staked: 10000 aergo',
    'UnStake: 10000 aergo',
    'Balance: 99999 aergo'
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 5],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }
  ]
};

export const GovernanceView = () => {
  const [sidebar, setSidebar] = useState<{ text: string; icon: IconName }>({});
  const [value, setValue] = useState('0');
  const [stakingModal, setStakingModal] = useState(false);

  useEffect(() => {
    if (sidebar.text === 'Staking') {
      setStakingModal(true);
    }
  }, [sidebar.text]);

  useEffect(() => {
    if (!stakingModal) {
      setSidebar({});
    }
  }, [stakingModal]);

  return (
    <Wrapper>
      <SideBar
        type="row"
        buttons={[
          { text: 'Staking', icon: 'coins' },
          { text: 'Voting', icon: 'money-bill-trend-up' }
        ]}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
      {sidebar.text === 'Staking' ? (
        <PopIn isOpen={stakingModal} setIsOpen={setStakingModal}>
          <ModalWrapper>
            <Column>
              <Pie data={data} />
              <StakedBalance>Staked Balance:100000</StakedBalance>
              <InputWithLabel
                value={value}
                setValue={setValue}
                width="80%"
                align="center"
              />
              <Max>MAX</Max>
            </Column>
            <Row>
              <Button variant="primary-outline">Stake</Button>
              <Button variant="secondary-outline">Unstake</Button>
            </Row>
          </ModalWrapper>
        </PopIn>
      ) : null}
    </Wrapper>
  );
};
