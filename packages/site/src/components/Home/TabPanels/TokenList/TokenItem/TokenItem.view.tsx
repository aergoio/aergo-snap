import { Token } from 'types/index';
import { Wrapper } from './TokenItem.style';

interface Props {
  token: Token;
}

export const TokenItemView = ({ token }: Props) => {
  return (
    <Wrapper>
      <span>name:{token.name}</span>
      <span>hash:{token.hash}</span>
      <span>contractAddress:{token.contractAddress}</span>
      <span>amount:{token.amount}</span>
    </Wrapper>
  );
};
