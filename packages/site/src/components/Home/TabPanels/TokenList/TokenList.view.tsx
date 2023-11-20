import { FC, useState } from 'react';
import { PopIn } from 'ui/molecule';
import { Token } from 'types';
import { IListProps } from 'ui/molecule/List/List.view';
import { useAppSelector } from 'hooks/redux';
import { TokenItem } from './TokenItem';
import {
  Wrapper,
  ButtonWrapper,
  StyledButton,
  ListWrapper,
} from './TokenList.style';

const tokens: Token[] = [
  {
    name: 'aergo',
    hash: 'AmMMZxK5EjDTtWtEFhHHbdhVf84AQpGGeZUk5ZaS6Zq2krECBMcf',
    contractAddress: 'Amhpi4LgVS74YJoZAWXsVgkJfEztYe5KkV3tY7sYtCgXchcKQeCQ',
    amount: '100',
  },
];

export const TokenListView = () => {
  const [importAssetModal, setImportAssetModal] = useState(false);
  const wallet = useAppSelector((state) => state.wallet);
  const handleClickRefresh = () => {
    console.log('handleClickRefresh');
  };

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
