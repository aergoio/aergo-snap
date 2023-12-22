import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  :hover {
    background: ${(props) => props.theme.colors.grey.grey1};
  }
`;
export const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Bottom = styled.div``;

export const TokenName = styled.span`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey.grey8};
  font-weight: inherit;
  margin-right: ${(props) => props.theme.spacing.large};
`;

export const Amount = styled.span`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey.grey4};
  font-weight: normal;
`;

export const Dollor = styled.span`
  margin-right: ${(props) => props.theme.spacing.large3};
  white-space: nowrap;
  font-weight: 600;
`;
