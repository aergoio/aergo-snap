import { Tabs } from 'ui/molecule';
import { Line } from 'ui/atom/Line';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper, Top, Bottom, AccountInfoWrapper } from './Home.style';
import { Transactions } from './Transactions';
import { TokenList, Activity, Governance } from './TabPanels';
import { useState, useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
export const HomeView = () => {
  const { network } = useAppSelector((state) => state.networks);
  const [isGovernance, setIsGovernance] = useState(true);

  useEffect(() => {
    const getBlockChainData = async () => {
      if (network.consensus === 'raft') {
        setIsGovernance(false);
      } else {
        setIsGovernance(true);
      }
    };
    if (network) {
      getBlockChainData();
    }
  }, [network]);

  return (
    <HomeWrapper>
      <Top>
        <AccountInfoWrapper>
          <AddressInfo />
          <Transactions />
        </AccountInfoWrapper>
      </Top>
      <Bottom>
        <Line />
        <Tabs
          tabs={
            isGovernance
              ? ['Token', 'NFT', 'Governance', 'Activity']
              : ['Token', 'NFT', 'Activity']
          }
          panels={
            isGovernance
              ? [
                  <TokenList tokenType="ARC1" />,
                  <TokenList tokenType="ARC2" />,
                  <Governance />,
                  <Activity />
                ]
              : [
                  <TokenList tokenType="ARC1" />,
                  <TokenList tokenType="ARC2" />,
                  <Activity />
                ]
          }
        />
      </Bottom>
    </HomeWrapper>
  );
};
