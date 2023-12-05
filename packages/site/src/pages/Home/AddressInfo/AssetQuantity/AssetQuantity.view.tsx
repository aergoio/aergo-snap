import { useAppSelector } from 'hooks/redux';
import { Asset, Dollor, Wrapper } from './AssetQuantity.style';

export const AssetQuantityView = () => {
  const { account } = useAppSelector((state) => state.wallet);
  const { sidebar } = useAppSelector((state) => state.UI);

  return (
    <Wrapper>
      <Asset>
        {sidebar === 0
          ? account?.meta?.unstaked_balance_formatAmount || '0 AERGO'
          : account?.meta?.staking_formatAmount || '0 AERGO'}
      </Asset>
      <Dollor>
        {sidebar === 0
          ? account?.meta?.unstaked_balance_usd || '$ 0 USD'
          : account?.meta?.staking_usd || '$ 0 USD'}
      </Dollor>
    </Wrapper>
  );
};
