import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey.grey1};
  padding: ${(props) => props.theme.spacing.tiny1};
  margin-right: ${(props) => props.theme.spacing.tiny1};
  border-radius: 50%;
  box-sizing: border-box;
  justify-content: center;
  color: ${(props) => props.theme.colors.grey.grey1};
  align-items: center;
  display: flex;
`;
