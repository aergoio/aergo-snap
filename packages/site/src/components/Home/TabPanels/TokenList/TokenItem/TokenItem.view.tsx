import { Token } from 'types';
import { RoundedIcon } from 'ui/atom/RoundedIcon';
import { AergoSvg } from 'assets/images';
import {
  Wrapper,
  Content,
  Top,
  Bottom,
  TokenName,
  Amount,
  Dollor,
} from './TokenItem.style';

interface Props {
  token: Token;
}

export const TokenItemView = ({ token }: Props) => {
  return (
    <Wrapper>
      <RoundedIcon>
        <AergoSvg />
      </RoundedIcon>
      <Content>
        <Top>
          <TokenName>{token.name}</TokenName>
          <Dollor>{token.usd}</Dollor>
        </Top>
        <Bottom>
          <Amount>{token.amount}</Amount>
        </Bottom>
      </Content>
      {/* <li>hash:{token.hash}</li> */}
      {/* <li>contractAddress:{token.contractAddress}</li> */}
    </Wrapper>
  );
};
