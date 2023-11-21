import { Tabs } from 'ui/molecule';
import { Line } from 'ui/atom/Line';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper } from './Home.style';
import { Transactions } from './Transactions';
import { TokenList, NftList, Activities } from './TabPanels';

export const HomeView = () => {
  return (
    <HomeWrapper>
      <AddressInfo />
      <Transactions />
      <Line />
      <Tabs
        tabs={['Token', 'NFT', 'Activities']}
        panels={[<TokenList />, <NftList />, <Activities />]}
      />
    </HomeWrapper>
  );
};
