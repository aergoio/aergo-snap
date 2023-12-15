import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

interface WrapperProps {
  type: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.type === 'row' ? 'row' : 'column')};
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey.grey8};
`;
