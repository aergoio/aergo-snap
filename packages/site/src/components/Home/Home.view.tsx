import { Card } from '@ui/atom/Card';
import { AddressInfo } from './AddressInfo';
import { HomeWrapper } from './Home.style';

export const HomeView = () => {
  return (
    <HomeWrapper>
      <Card content={{ description: <AddressInfo /> }} />
    </HomeWrapper>
  );
};
