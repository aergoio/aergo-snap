import styled from 'styled-components';

export const Wrapper = styled.div<{
  fullWidth?: boolean;
  disabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '')};
  background-color: ${({ theme }) => theme.colors.card.default};
  border-radius: ${({ theme }) => theme.radii.rounded};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

export const Description = styled.div``;
