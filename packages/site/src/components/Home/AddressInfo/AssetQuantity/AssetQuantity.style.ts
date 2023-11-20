import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Asset = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h1};
  line-height: ${(props) => props.theme.lineHeights.h1};
  font-weight: ${(props) => props.theme.fontWeights[600]};
`;

export const Dollor = styled.div`
  color: ${(props) => props.theme.colors.grey.grey4};
  font-size: ${(props) => props.theme.fontSizes.large};
  /* line-height: ${(props) => props.theme.lineHeights.h1}; */
  font-weight: ${(props) => props.theme.fontWeights[500]};
`;
