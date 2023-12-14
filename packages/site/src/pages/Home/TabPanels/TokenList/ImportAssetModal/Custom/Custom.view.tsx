import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InputWithLabel } from 'ui/molecule/InputWithLabel';
import { debounce } from 'lodash';
import { scanApi } from 'apis/scanApi';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Token } from 'types';
import { setToken } from 'slices/walletSlice';
import { Button } from 'ui/atom/Button';
import { InputWrapper } from './Custom.style';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { setSelectedToken } from 'slices/UISlice';
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CustomView = ({ setIsOpen }: Props) => {
  const { network, chainIdLabel } = useAppSelector((state) => state.networks);
  const { tokens } = useAppSelector((state) => state.wallet);
  const { tokenType } = useAppSelector((state) => state.UI);
  const dispatch = useAppDispatch();
  const [contractAddress, setContractAddress] = useState('');
  const [searchedToken, setSearchedToken] = useState<Token | null>(null);

  useEffect(() => {
    const debouncedSetContractAddress = debounce(async (value) => {
      const scanApiInstance = await scanApi(network);
      if (scanApiInstance && value) {
        try {
          const getTokenByContractAddress = (
            await scanApiInstance.get(`token?q=_id:${value}&type:${tokenType}`)
          ).data.hits[0];
          setSearchedToken(getTokenByContractAddress);
        } catch (e) {
          setSearchedToken(null);
          console.error(e);
        }
      }
    }, 300);

    debouncedSetContractAddress(contractAddress);

    return () => debouncedSetContractAddress.cancel();
  }, [contractAddress]);

  const handleAddTokenByCustomAddress = () => {
    const payload = {
      chainIdLabel,
      token: searchedToken
    };
    if (tokens[chainIdLabel]) {
      if (
        !tokens[chainIdLabel].some(
          (addedToken: any) => addedToken?.hash === searchedToken?.hash
        )
      ) {
        dispatch(setToken(payload));
      } else {
        console.log(`Already Added ${searchedToken?.meta?.name}`);
      }
    } else {
      dispatch(setToken(payload));
    }
    setIsOpen(false);
    dispatch(setSelectedToken(payload.token));
  };

  return (
    <>
      <InputWrapper>
        <InputWithLabel
          label="Contract Address"
          address={contractAddress}
          value={contractAddress}
          setValue={setContractAddress}
          placeholder="Am..."
        />
        <InputWithLabel
          key={searchedToken?.meta?.type}
          disabled
          label="Asset Type"
          value={searchedToken?.meta?.type || ''}
        />
        <InputWithLabel
          key={searchedToken?.meta?.symbol}
          disabled
          label="Symbol"
          value={searchedToken?.meta?.symbol || ''}
        />
        <InputWithLabel
          key={searchedToken?.meta?.decimals}
          disabled
          label="Decimals"
          value={searchedToken?.meta?.decimals || ''}
        />
      </InputWrapper>

      <Button
        disabled={!searchedToken}
        onClick={handleAddTokenByCustomAddress}
        style={{ width: '100%' }}
      >
        Import
      </Button>
    </>
  );
};
