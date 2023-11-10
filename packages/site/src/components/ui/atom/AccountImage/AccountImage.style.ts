import styled from 'styled-components';

type IDiv = {
  connected?: boolean;
  size?: number;
};

export const Wrapper = styled.div<IDiv>`
  width: fit-content;
  background-image: ${(props) =>
    props.connected ? props.theme.colors.gradation.gradation4 : ''};
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  height: ${(props) => (props.size ? `${props.size}px` : '40px')};
  border-radius: 8px;
`;
