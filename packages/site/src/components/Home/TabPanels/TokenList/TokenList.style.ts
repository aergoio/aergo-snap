import styled from 'styled-components';
import { Button } from 'ui/atom/Button';
import { List } from 'ui/molecule';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const StyledButton = styled(Button)`
  padding: 0;
`;

export const ListWrapper = styled(List)``;
