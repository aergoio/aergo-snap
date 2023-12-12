import styled from 'styled-components';
import { Button } from 'ui/atom/Button';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 10rem;
`;

export const StyledButton = styled(Button)`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey.grey8};
`;

export const StyledButtonText = styled.span`
  @media screen and (max-width: 900px) {
    display: none !important;
  }
`;
