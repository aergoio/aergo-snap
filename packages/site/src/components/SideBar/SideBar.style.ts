import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

export const Container = styled.div`
  display: flex;
  min-width: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1rem;
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey.grey8};
  margin-left: ${(props) => props.theme.spacing.large};
`;

export const StyledButtonText = styled.span`
  @media screen and (max-width: 900px) {
    display: none !important;
  }
`;