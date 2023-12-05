import { Tabs } from 'ui/molecule';
import { Line } from 'ui/atom/Line';
import { SideBar } from 'components/SideBar';
import { useState } from 'react';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper, Top, Bottom, AddressWrapper } from './Home.style';
import { Transactions } from './Transactions';
import { TokenList, NftList, TransactionHistory } from './TabPanels';

export const HomeView = () => {
  const [sidebar, setSidebar] = useState(0);

  return (
    <HomeWrapper>
      <Top>
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />
        <AddressWrapper>
          <AddressInfo sidebar={sidebar} />
          <Transactions />
        </AddressWrapper>
      </Top>
      <Bottom>
        <Line />
        <Tabs
          tabs={['Token', 'NFT', 'Transaction History']}
          panels={[<TokenList />, <NftList />, <TransactionHistory />]}
        />
      </Bottom>
    </HomeWrapper>
  );
};
