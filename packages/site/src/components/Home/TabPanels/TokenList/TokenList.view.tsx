import { FC, useEffect, useState } from 'react';
import { PopIn } from 'ui/molecule';
import { Token } from 'types';
import { IListProps } from 'ui/molecule/List/List.view';
import { useAppSelector } from 'hooks/redux';
import { formatTokenAmount, moveDecimalPoint } from 'utils/utils';
import { TokenItem } from './TokenItem';
import {
  Wrapper,
  ButtonWrapper,
  StyledButton,
  ListWrapper,
} from './TokenList.style';

// TODO: Should Add token Spec

export const TokenListView = () => {
  const [importAssetModal, setImportAssetModal] = useState(false);
  const [tokens, setTokens] = useState([
    {
      name: 'AERGO',
      hash: '',
      contractAddress: '0x91af0fbb28aba7e31403cb457106ce79397fd4e6',
      amount: '0 AERGO',
      usd: '$0 USD',
    },
  ]);
  const wallet = useAppSelector((state) => state.wallet);
  const handleClickRefresh = () => {
    console.log('handleClickRefresh');
  };

  useEffect(() => {
    const { account } = wallet;
    setTokens((prevTokens) => [
      {
        ...prevTokens[0],
        hash: account?.hash || '',
        amount: formatTokenAmount(account?.meta.balance || '0', 'AERGO', 18),
        usd: `$${moveDecimalPoint(account?.meta.balance || '0', -18)} USD`,
      },
      ...prevTokens.slice(1),
    ]);
  }, [wallet?.account?.hash]);

  return (
    <Wrapper>
      <PopIn isOpen={importAssetModal} setIsOpen={setImportAssetModal}>
        importAssetModal
      </PopIn>

      <ListWrapper<FC<IListProps<Token>>>
        data={tokens.length > 0 ? tokens : wallet.tokens}
        render={(token: any) => <TokenItem token={token} />}
        keyExtractor={(token: any) => token.hash.toString()}
      />

      <ButtonWrapper>
        <StyledButton
          variant="primary"
          iconLeft="plus"
          backgroundTransparent
          onClick={() => setImportAssetModal(true)}
        >
          Import Asset
        </StyledButton>
        <StyledButton
          variant="primary"
          iconLeft="rotate"
          backgroundTransparent
          onClick={handleClickRefresh}
        >
          Refresh
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
};
