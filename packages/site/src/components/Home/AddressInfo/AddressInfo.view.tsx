import { useAppSelector } from 'hooks/redux';
import { AccountAddressCopyButton } from 'ui/molecule/AccountAddressCopyButton';
import { Card } from 'ui/molecule';
import { formatTokenAmount, moveDecimalPoint } from 'utils/utils';
import { useEffect, useState } from 'react';
import {
  Wrapper,
  InfoWrapper,
  StyledAccountImage,
  AssetWrapper,
} from './AddressInfo.style';
import { AssetQuantity } from './AssetQuantity';

export const AddressInfoView = () => {
  const { address, connected, account } = useAppSelector(
    (state) => state.wallet,
  );
  const [usd, setUsd] = useState('0');
  // TODO: Add CoinGekco api
  useEffect(() => {
    if (account?.meta.balance) {
      setUsd(moveDecimalPoint(account?.meta.balance, -18));
    } else {
      setUsd('0');
    }
  }, [account?.meta.balance]);

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
              <AssetQuantity
                currencyValue={
                  account
                    ? formatTokenAmount(account?.meta.balance, 'AERGO', 18)
                    : '0 AERGO'
                }
                usdValue={usd}
              />
            </AssetWrapper>
          </Wrapper>
        ),
      }}
    />
  );
};
