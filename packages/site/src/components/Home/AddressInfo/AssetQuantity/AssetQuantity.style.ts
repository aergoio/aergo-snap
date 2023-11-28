import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Asset = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h1};
  margin-top: ${(props) => props.theme.spacing.large};
  font-weight: 600;
`;

export const Dollor = styled.div`
  margin-top: ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.colors.grey.grey4};
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 500;
`;
