import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
`;

export const ButtonWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.small};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
