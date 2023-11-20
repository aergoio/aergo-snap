import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: ${({ theme }) => (theme.mediaQueries.small ? `80vw` : `100vw`)};
  margin: 0 auto;
  /* border: 1px solid ${({ theme }) => theme.colors.card.default}; */
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.card.inverse};
  box-shadow: ${(props) => props.theme.shadows.default};
  opacity: 0.1;
  margin-top: ${({ theme }) => theme.spacing.large2};
`;
