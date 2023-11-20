import styled from 'styled-components';
import { AccountImage } from 'ui/atom/AccountImage';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAccountImage = styled(AccountImage)`
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const AssetWrapper = styled.div`
  display: flex;
`;
