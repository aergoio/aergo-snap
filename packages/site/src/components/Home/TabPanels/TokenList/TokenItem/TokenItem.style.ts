import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
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
  color: ${(props) => props.theme.colors.grey.grey8};
  font-weight: inherit;
`;

export const Amount = styled.span`
  color: ${(props) => props.theme.colors.grey.grey4};
  font-weight: normal;
`;

export const Dollor = styled.span`
  font-weight: 600;
`;
