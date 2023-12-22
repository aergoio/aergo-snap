import { RoundedIcon } from 'ui/atom/RoundedIcon';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { useTheme } from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { Line } from 'ui/atom/Line';
import {
  Container,
  Wrapper,
  Content,
  Top,
  Bottom,
  TokenName,
  Amount,
  Dollor
} from './TokenItem.style';
import { formatTokenAmount } from 'utils/utils';

interface Props {
  onClick: () => void;
}

export const AergoTokenView = ({ onClick }: Props) => {
  const theme = useTheme();
  const { accountBalance } = useAppSelector((state) => state.wallet);

  return (
    <Container onClick={onClick}>
      <Wrapper>
        <RoundedIcon>
          <AergoSnapLogo color={theme.colors.icon.default} size={30} />
        </RoundedIcon>
        <Content>
          <Top>
            <TokenName>AERGO</TokenName>
            <Dollor>
              {`$ ${formatTokenAmount(accountBalance || '0', 'USD', 18)}`}
            </Dollor>
          </Top>
          <Bottom>
            <Amount>
              {formatTokenAmount(accountBalance || '0', 'AERGO', 18)}
            </Amount>
          </Bottom>
        </Content>
        {/* <li>hash:{token.hash}</li> */}
        {/* <li>contractAddress:{token.contractAddress}</li> */}
      </Wrapper>
      <Line />
    </Container>
  );
};