import styled, { css } from 'styled-components';

interface WrapperProps {
  vertical?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  border-bottom: 1px solid ${(props) => props.theme.colors.card.inverse};
  ${(props) =>
    props.vertical &&
    css`
      border-right: 1px solid ${(props) => props.theme.colors.card.inverse};
    `}
  box-shadow: ${(props) => props.theme.shadows.default};
  opacity: 0.1;
`;
