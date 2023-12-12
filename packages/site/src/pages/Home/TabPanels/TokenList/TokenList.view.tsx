import { useEffect, useState } from 'react';
import { List, PopIn } from 'ui/molecule';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { setTokenType } from 'slices/UISlice';
import { AergoToken, TokenItem } from './TokenItem';
import { Wrapper, ButtonWrapper, StyledButton } from './TokenList.style';
import { ImportAssetModal } from './ImportAssetModal';

interface Props {
  tokenType: 'ARC1' | 'ARC2';
}

export const TokenListView = ({ tokenType }: Props) => {
  const dispatch = useAppDispatch();
  const [importAssetModal, setImportAssetModal] = useState(false);
  const { getWalletData } = useAergoSnap();
  const { tokens } = useAppSelector((state) => state.wallet);
  const { network, chainIdLabel } = useAppSelector((state) => state.networks);

  const handleClickRefresh = () => {
    getWalletData(network);
  };

  useEffect(() => {
    dispatch(setTokenType(tokenType));
  }, []);

  return (
    <Wrapper>
      <PopIn isOpen={importAssetModal} setIsOpen={setImportAssetModal}>
        <ImportAssetModal />
      </PopIn>
      {tokenType === 'ARC1' ? <AergoToken /> : null}
      <List
        data={
          tokens[chainIdLabel].filter(
            (token) => token?.meta?.type === tokenType,
          ) || []
        }
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
          {`Import ${tokenType === 'ARC1' ? 'Token' : 'NFT'}`}
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
