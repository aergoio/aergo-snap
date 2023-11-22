import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
