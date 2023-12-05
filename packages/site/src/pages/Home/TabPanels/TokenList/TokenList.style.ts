import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 3rem ${(props) => props.theme.spacing.large};
`;

export const ButtonWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const StyledButton = styled(Button)`
  padding: 0;
`;
