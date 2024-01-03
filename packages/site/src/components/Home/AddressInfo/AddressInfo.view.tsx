import { useAppSelector } from 'hooks/redux';
import { AccountAddressCopyButton } from 'ui/molecule/AccountAddressCopyButton';
import { Card } from 'ui/molecule';
import {
  Container,
  Wrapper,
  InfoWrapper,
  StyledAccountImage,
  AssetWrapper
} from './AddressInfo.style';
import { AssetQuantity } from './AssetQuantity';

export const AddressInfoView = () => {
  const { address, connected } = useAppSelector((state) => state.wallet);

  return (
    <Container>
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
                <AccountAddressCopyButton address={address} placement="top" />
              </InfoWrapper>
              <AssetWrapper>
                <AssetQuantity />
              </AssetWrapper>
            </Wrapper>
          )
        }}
      />
    </Container>
  );
};
