import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large2};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  margin-left: 2rem;
`;
