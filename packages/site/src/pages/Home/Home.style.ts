import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 0 auto;
  width: 80vw;
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100vw;
  }
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.small} {
    justify-content: center;
  }
`;

export const Bottom = styled.div`
  width: 100%;
`;

export const SidebarContentWrapper = styled.div`
  width: 100%;
`;
