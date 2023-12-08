import { Token } from 'types';
import { RoundedIcon } from 'ui/atom/RoundedIcon';
import { Line } from 'ui/atom/Line';
import { formatTokenAmount } from 'utils/utils';

import { DefaultAergo } from 'assets/images';
import {
  Wrapper,
  Content,
  Top,
  Bottom,
  TokenName,
  Amount,
  Dollor
} from './TokenItem.style';

interface Props {
  token?: Token;
}
// TODO: USD 가격 변환 & Hover효과 추가
export const TokenItemView = ({ token }: Props) => {
  return (
    <div style={{ width: '100%' }}>
      <Wrapper>
        {token?.meta?.image_url ? (
          <RoundedIcon style={{ padding: 0 }}>
            <img src={token?.meta?.image_url} width={50} />
          </RoundedIcon>
        ) : (
          <RoundedIcon style={{ padding: 0 }}>
            <DefaultAergo width={50} />
          </RoundedIcon>
        )}
        <Content>
          <Top>
            <TokenName>{token?.meta?.name}</TokenName>
            <Dollor>
              {formatTokenAmount(
                token?.tokenBalance?.meta?.balance || '0',
                token?.meta?.symbol || '',
                token?.meta?.decimals || 0
              )}
            </Dollor>
          </Top>
          <Bottom>
            <Amount>
              {formatTokenAmount(
                token?.tokenBalance?.meta?.balance || '0',
                token?.meta?.symbol || '',
                token?.meta?.decimals || 0
              )}
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
