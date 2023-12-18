import { useEffect, useState } from 'react';
import { List, PopIn } from 'ui/molecule';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { setSelectedToken, setTokenType } from 'slices/UISlice';
import { AergoToken, TokenItem } from './TokenItem';
import { Wrapper, ButtonWrapper, StyledButton, NoNft } from './TokenList.style';
import { ImportAssetModal } from './ImportAssetModal';
import { Token } from 'types';

interface Props {
  tokenType: 'ARC1' | 'ARC2';
}

export const TokenListView = ({ tokenType }: Props) => {
  const dispatch = useAppDispatch();
  const [importAssetModal, setImportAssetModal] = useState(false);
  const { getWalletData } = useAergoSnap();
  const { tokens, address } = useAppSelector((state) => state.wallet);
  const { network, chainIdLabel } = useAppSelector((state) => state.networks);
  const { selectedToken, loader } = useAppSelector((state) => state.UI);
  const isNoNFT =
    tokenType === 'ARC2' &&
    (tokens[chainIdLabel]?.filter(
      (token: any) => token?.meta?.type === tokenType
    ).length === 0 ||
      !tokens[chainIdLabel]);

  const handleClickRefresh = () => {
    getWalletData(
      network,
      address,
      selectedToken !== 'AERGO' ? selectedToken.hash : null
    );
  };

  useEffect(() => {
    dispatch(setTokenType(tokenType));
  }, []);

  const handleChangeToken = (tokenType: any) => {
    dispatch(setSelectedToken(tokenType));
  };

  return (
    <Wrapper>
      <PopIn isOpen={importAssetModal} setIsOpen={setImportAssetModal}>
        <ImportAssetModal setIsOpen={setImportAssetModal} />
      </PopIn>
      {tokenType === 'ARC1' ? (
        <AergoToken onClick={() => handleChangeToken('AERGO')} />
      ) : null}

      {!loader.isLoading && (
        <List
          data={
            tokens[chainIdLabel]?.filter(
              (token: any) => token?.meta?.type === tokenType
            ) || []
          }
          render={(token: any) => (
            <TokenItem token={token} onClick={() => handleChangeToken(token)} />
          )}
          keyExtractor={(token: any) => token.hash.toString()}
        />
      )}

      {isNoNFT && <NoNft>No NFT</NoNft>}

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
