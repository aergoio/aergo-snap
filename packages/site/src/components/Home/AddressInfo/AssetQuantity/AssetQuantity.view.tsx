import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Asset, Dollor, Wrapper } from './AssetQuantity.style';
import { formatTokenAmount } from 'utils/utils';
import { useEffect, useState } from 'react';
import { Token } from 'types';
import { resetWallet } from 'slices/walletSlice';
import { setSelectedToken } from 'slices/UISlice';

export const AssetQuantityView = () => {
  const dispatch = useAppDispatch();
  const { accountBalance, tokens } = useAppSelector((state) => state.wallet);
  const { chainIdLabel } = useAppSelector((state) => state.networks);
  const { selectedToken } = useAppSelector((state) => state.UI);
  const [asset, setAsset] = useState<string | number | undefined>('');
  const [dollor, setDollor] = useState<string | number | undefined>('');

  useEffect(() => {
    if (selectedToken !== 'AERGO' && tokens[chainIdLabel]) {
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
      dispatch(setSelectedToken('AERGO'));
      if (accountBalance) {
        const formattedAsset = formatTokenAmount(
          String(accountBalance || '0'),
          '',
          18
        ) as string;
        setAsset(
          `${String(Math.floor(+formattedAsset * 10000) / 10000)} AERGO`
        );
        setDollor(`${String(Math.floor(+formattedAsset * 10000) / 10000)} USD`);
      } else {
        setAsset(`0 AERGO`);
        setDollor(`0 USD`);
      }
    }
  }, [selectedToken, tokens[chainIdLabel], accountBalance]);

  return (
    <Wrapper>
      <Asset>{asset}</Asset>
      <Dollor>≈ {dollor}</Dollor>
    </Wrapper>
  );
};
