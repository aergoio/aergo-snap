import { Token } from 'types';
import { RoundedIcon } from 'ui/atom/RoundedIcon';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { useTheme } from 'styled-components';
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
  const theme = useTheme();

  return (
    <Wrapper>
      <RoundedIcon>
        <AergoSnapLogo color={theme.colors.icon.default} size={30} />
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
