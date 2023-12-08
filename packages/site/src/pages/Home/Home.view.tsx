import { Tabs } from 'ui/molecule';
import { Line } from 'ui/atom/Line';
import { useAppSelector } from 'hooks/redux';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper, Top, Bottom, SidebarContentWrapper } from './Home.style';
import { Transactions } from './Transactions';
import { TokenList, TransactionHistory } from './TabPanels';

export const HomeView = () => {
  const { sidebar } = useAppSelector((state) => state.UI);

  return (
    <HomeWrapper>
      <Top>
        {sidebar = == 0 ? (
          <SidebarContentWrapper>
            <AddressInfo />
            <Transactions />
          </SidebarContentWrapper>
        ) : null}
        {sidebar === 1 ? <SidebarContentWrapper></SidebarContentWrapper> : null}
        {sidebar === 2 ? <SidebarContentWrapper></SidebarContentWrapper> : null}
      </Top>
      <Bottom>
        <Line />
        <Tabs
          tabs={['Token', 'NFT', 'Transaction History']}
          panels={[
            <TokenList tokenType="ARC1" />,
            <TokenList tokenType="ARC2" />,
            <TransactionHistory />
          ]}
        />
      </Bottom>
    </HomeWrapper>
  );
};
