import { useAppSelector } from 'hooks/redux';
import { AccountAddressCopyButton } from 'components/ui/molecule/AccountAddressCopyButton';
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
    <Wrapper>
      <InfoWrapper>
        <StyledAccountImage connected={connected} address={address} size={50} />
        <AccountAddressCopyButton address={address} placement="right-start" />
      </InfoWrapper>
      <AssetWrapper>
        <AssetQuantity currencyValue="100" usdValue="100" />
      </AssetWrapper>
    </Wrapper>
  );
};
