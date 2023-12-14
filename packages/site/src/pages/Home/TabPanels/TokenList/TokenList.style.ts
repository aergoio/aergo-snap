import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem ${(props) => props.theme.spacing.large};
`;

export const ButtonWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const StyledButton = styled(Button)`
  padding: 0;
`;

export const NoNft = styled.span`
  color: ${({ theme }) => theme.colors.grey.grey3};
  margin-top: ${({ theme }) => theme.spacing.large};
  width: 100%;
  text-align: center;
`;
