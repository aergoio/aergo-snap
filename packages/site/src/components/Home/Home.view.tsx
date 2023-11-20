import { Tabs } from 'ui/molecule';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper, Line } from './Home.style';
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
