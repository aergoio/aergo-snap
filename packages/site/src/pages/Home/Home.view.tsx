import { Tabs } from 'ui/molecule';
import { Line } from 'ui/atom/Line';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper, Top, Bottom, AccountInfoWrapper } from './Home.style';
import { Transactions } from './Transactions';
import { TokenList, Activity, Governance } from './TabPanels';

export const HomeView = () => {
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
          tabs={['Governance', 'Token', 'NFT', 'Activity']}
          panels={[
            <Governance />,
            <TokenList tokenType="ARC1" />,
            <TokenList tokenType="ARC2" />,
            <Activity />
          ]}
        />
      </Bottom>
    </HomeWrapper>
  );
};
