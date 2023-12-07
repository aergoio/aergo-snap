import { RoundedIcon } from 'ui/atom/RoundedIcon';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { useTheme } from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { Line } from 'ui/atom/Line';
import {
  Wrapper,
  Content,
  Top,
  Bottom,
  TokenName,
  Amount,
  Dollor,
} from './TokenItem.style';

export const AergoTokenView = () => {
  const theme = useTheme();
  const { account } = useAppSelector((state) => state.wallet);

  return (
    <div style={{ width: '100%' }}>
      <Wrapper>
        <RoundedIcon>
          <AergoSnapLogo color={theme.colors.icon.default} size={30} />
        </RoundedIcon>
        <Content>
          <Top>
            <TokenName>AERGO</TokenName>
            <Dollor>{account?.meta?.unstaked_balance_usd || '$ 0 USD'}</Dollor>
          </Top>
          <Bottom>
            <Amount>
              {account?.meta?.unstaked_balance_formatAmount || '0 AERGO'}
            </Amount>
          </Bottom>
        </Content>
        {/* <li>hash:{token.hash}</li> */}
        {/* <li>contractAddress:{token.contractAddress}</li> */}
      </Wrapper>
      <Line />
    </div>
  );
};
