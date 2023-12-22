import { useAppSelector } from 'hooks/redux';
import { Asset, Dollor, Wrapper } from './AssetQuantity.style';
import { formatTokenAmount } from 'utils/utils';
import { useEffect, useState } from 'react';
import { Token } from 'types';

export const AssetQuantityView = () => {
  const { accountBalance, tokens } = useAppSelector((state) => state.wallet);
  const { chainIdLabel } = useAppSelector((state) => state.networks);
  const { selectedToken } = useAppSelector((state) => state.UI);
  const [asset, setAsset] = useState('');
  const [dollor, setDollor] = useState('');

  useEffect(() => {
    if (selectedToken !== 'AERGO') {
      const { tokenBalance } = tokens[chainIdLabel].find(
        (token) => token.hash === selectedToken.hash
      ) as Token;
      setAsset(
        formatTokenAmount(
          tokenBalance?.meta.balance || '0',
          tokenBalance?.token.meta.symbol || '',
          tokenBalance?.token.meta.decimals || 1
        )
      );
      setDollor(
        formatTokenAmount(
          tokenBalance?.meta.balance || '0',
          'USD',
          tokenBalance?.token.meta.decimals || 1
        )
      );
    } else {
      setAsset(formatTokenAmount(accountBalance || '0', 'AERGO', 18));
      setDollor(formatTokenAmount(accountBalance || '0', 'USD', 18));
    }
  }, [selectedToken, tokens[chainIdLabel], accountBalance]);

  return (
    <Wrapper>
      <Asset>{asset}</Asset>
      <Dollor>≈ {dollor}</Dollor>
    </Wrapper>
  );
};
