import { useAppSelector } from 'hooks/redux';
import { AccountAddressCopyButton } from 'ui/molecule/AccountAddressCopyButton';
import { formatTokenAmount, moveDecimalPoint } from 'utils/utils';
import { useEffect, useState } from 'react';
import { Card } from 'ui/molecule';
import {
  Container,
  Wrapper,
  InfoWrapper,
  StyledAccountImage,
  AssetWrapper,
} from './AddressInfo.style';
import { AssetQuantity } from './AssetQuantity';

interface Props {
  sidebar: number;
}

export const AddressInfoView = ({ sidebar }: Props) => {
  const { address, connected, account } = useAppSelector(
    (state) => state.wallet,
  );
  const [usd, setUsd] = useState('0');
  // TODO: Add CoinGekco api
  useEffect(() => {
    if (sidebar === 0) {
      if (account?.meta.balance) {
        setUsd(moveDecimalPoint(account?.meta.balance, -18));
      } else {
        setUsd('0');
      }
    } else if (sidebar === 1) {
      if (account?.meta?.staking) {
        setUsd(moveDecimalPoint(account?.meta?.staking, -18));
      } else {
        setUsd('0');
      }
    }
  }, [account?.meta.balance, sidebar]);

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
                <AccountAddressCopyButton address={address} />
              </InfoWrapper>
              <AssetWrapper>
                <AssetQuantity
                  currencyValue={
                    account
                      ? formatTokenAmount(
                          sidebar === 0
                            ? account?.meta?.balance
                            : account?.meta?.staking,
                          'AERGO',
                          18,
                        )
                      : '0 AERGO'
                  }
                  usdValue={usd}
                />
              </AssetWrapper>
            </Wrapper>
          ),
        }}
      />
    </Container>
  );
};
