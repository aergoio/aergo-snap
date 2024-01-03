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
import { useState, useEffect } from 'react';

interface Props {
  onClick: () => void;
}

export const AergoTokenView = ({ onClick }: Props) => {
  const theme = useTheme();
  const { accountBalance } = useAppSelector((state) => state.wallet);
  const [dollor, setDollor] = useState('0 USD');
  const [aergo, setAergo] = useState('0 AERGO');

  useEffect(() => {
    if (accountBalance) {
      const formattedAsset = formatTokenAmount(
        String(accountBalance || '0'),
        '',
        18
      ) as string;
      setAergo(`${String(Math.floor(+formattedAsset * 10000) / 10000)} AERGO`);
      setDollor(`${String(Math.floor(+formattedAsset * 10000) / 10000)} USD`);
    } else {
      setAergo(`0 AERGO`);
      setDollor(`0 USD`);
    }
  }, [accountBalance]);

  return (
    <Container onClick={onClick}>
      <Wrapper>
        <RoundedIcon>
          <AergoSnapLogo color={theme.colors.icon.default} size={30} />
        </RoundedIcon>
        <Content>
          <Top>
            <TokenName>AERGO</TokenName>
            <Dollor>{`$ ${dollor}`}</Dollor>
          </Top>
          <Bottom>
            <Amount>{`${aergo}`}</Amount>
          </Bottom>
        </Content>
      </Wrapper>
      <Line />
    </Container>
  );
};
