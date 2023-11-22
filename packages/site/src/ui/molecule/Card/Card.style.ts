import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  /* max-width: 64.8rem; */
  /* width: 100%; */
  /* height: 100%; */
  /* margin-top: 1.5rem; */
`;

export const Wrapper = styled.div<{
  fullWidth?: boolean;
  disabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: ${({ fullWidth }) => (fullWidth ? '100%' : '250px')}; */
  background-color: ${({ theme }) => theme.colors.card.default};
  margin-top: ${({ theme }) => theme.spacing.large2};
  margin-bottom: ${({ theme }) => theme.spacing.large2};
  padding: ${({ theme }) => theme.spacing.large2};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

export const Description = styled.div`
  /* margin-top: 2.4rem; */
  /* margin-bottom: 2.4rem; */
`;
