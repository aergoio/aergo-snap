import { useEffect, useState } from 'react';
import { InputWithLabel } from 'ui/atom/InputWithLabel';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { scanApi } from 'apis/scanApi';
import { Token } from 'types';
import { List } from 'ui/molecule';
import { setToken } from 'slices/walletSlice';
import { setError } from 'slices/UISlice';

export const SearchView = () => {
  const networks = useAppSelector((state) => state.networks);
  const { tokenType } = useAppSelector((state) => state.UI);
  const [search, setSearch] = useState('');
  const [searchedToken, setSearchedToken] = useState([]);
  const { tokens } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debouncedSetSearch = debounce(async (value) => {
      const network = networks.items[networks.activeNetwork];
      const scanApiInstance = await scanApi(network);
      if (scanApiInstance) {
        try {
          const getSearchedToken = (
            await scanApiInstance.get(
              `tokenVerified?q=(name_lower:*${value.toLowerCase()}* OR symbol_lower:*${value.toLowerCase()}*) AND type:${tokenType}`,
            )
          ).data.hits;
          setSearchedToken(getSearchedToken);
        } catch (e) {
          console.error(e);
        }
      }
    }, 300);

    debouncedSetSearch(search);

    return () => debouncedSetSearch.cancel();
  }, [search]);

  return (
    <>
      <InputWithLabel
        value={search}
        setValue={setSearch}
        placeholder="Name / Symbol"
      />
      <List
        data={searchedToken}
        render={(token: Token) => (
          <span
            onClick={() => {
              !tokens.some((addedToken) => addedToken.hash === token.hash)
                ? dispatch(setToken(token))
                : console.log(`Already Added ${token.meta.name}`);
            }}
          >
            {token.meta.name}
          </span>
        )}
        keyExtractor={(token: Token) => token.hash.toString()}
      />
    </>
  );
};
