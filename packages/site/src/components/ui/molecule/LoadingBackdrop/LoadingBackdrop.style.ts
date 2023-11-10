import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.primary[3]};
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 900;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: nowrap;
`;
