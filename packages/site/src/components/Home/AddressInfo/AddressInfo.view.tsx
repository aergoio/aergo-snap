import { useAppSelector } from 'hooks/redux';
import { AccountAddressCopyButton } from 'ui/molecule/AccountAddressCopyButton';
import { Card } from 'ui/molecule';
import {
  Wrapper,
  InfoWrapper,
  StyledAccountImage,
  AssetWrapper,
} from './AddressInfo.style';
import { AssetQuantity } from './AssetQuantity';

export const AddressInfoView = () => {
  const { address, connected } = useAppSelector((state) => state.wallet);

  return (
    <Card
      content={{
        description: (
          <Wrapper>
            <InfoWrapper>
              <StyledAccountImage
                connected={connected}
                address={address}
                size={50}
              />
              <AccountAddressCopyButton address={address} />
            </InfoWrapper>
            <AssetWrapper>
              <AssetQuantity currencyValue="100" usdValue="100" />
            </AssetWrapper>
          </Wrapper>
        ),
      }}
    />
  );
};
