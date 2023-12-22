import styled from 'styled-components';
import { Max } from 'components/Home/TabPanels/Governance/Governance.style';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  height: 40rem;
  width: 30rem;
`;
export const TokenType = styled.span`
  color: #84ceeb;
  font-size: ${(props) => props.theme.fontSizes.xxsmall};
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const Usd = styled.span`
  opacity: 0.75;
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  white-space: nowrap;
`;

export const StyledMax = styled(Max)`
  margin-top: 0;
  margin-right: 0;
`;
