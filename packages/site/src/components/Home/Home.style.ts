import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: ${({ theme }) => (theme.mediaQueries.small ? `80vw` : `100vw`)};
  margin: 0 auto;
  min-width: 45rem;
  /* border: 1px solid ${({ theme }) => theme.colors.card.default}; */
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;
