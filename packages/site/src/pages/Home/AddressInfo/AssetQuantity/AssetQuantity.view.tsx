import { useAppSelector } from 'hooks/redux';
import { Asset, Dollor, Wrapper } from './AssetQuantity.style';
import { formatTokenAmount } from 'utils/utils';

export const AssetQuantityView = () => {
  const { accountBalance } = useAppSelector((state) => state.wallet);
  const { sidebar } = useAppSelector((state) => state.UI);

  return (
    <Wrapper>
      <Asset>{formatTokenAmount(accountBalance || '0', 'AERGO', 18)}</Asset>
      <Dollor>{formatTokenAmount(accountBalance || '0', 'AERGO', 18)}</Dollor>
    </Wrapper>
  );
};
