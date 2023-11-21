import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.card.inverse};
  box-shadow: ${(props) => props.theme.shadows.default};
  opacity: 0.1;
  margin-top: ${({ theme }) => theme.spacing.large2};
`;
