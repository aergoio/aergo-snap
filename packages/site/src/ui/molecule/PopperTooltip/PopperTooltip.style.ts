import styled from 'styled-components';

interface IDiv {
  arrowVisible?: boolean;
}

export const Wrapper = styled.div`
  width: fit-content;
`;

export const PopperContainer = styled.div<IDiv>`
  border-radius: ${(props) => props.theme.radii.rounded};
  background-color: ${(props) => props.theme.colors.grey.white};
  padding: ${(props) => props.theme.spacing.large};
  text-align: center;
  box-shadow: 0px 0px 60px 0px rgba(106, 115, 125, 0.2);

  .arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    &:after {
      content: ' ';
      position: absolute;
      top: -26px; // we account for the PopperContainer padding
      left: 40px;
      transform: rotate(45deg);
      width: 20px;
      height: 20px;
      background-color: white;
    }
  }

  &[data-popper-placement^='top'] > .arrow {
    bottom: -37px;
  }

  &[data-popper-placement^='right'] > .arrow {
    &:after {
      left: -27px;
      top: calc(50% - 10px);
    }
  }

  &[data-popper-placement^='left'] > .arrow {
    right: 0px;
    &:after {
      top: calc(50% - 10px);
    }
  }
`;

export const ToolTipContent = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  /* color: ${(props) => props.theme.colors.primary.main}; */
  background: ${(props) => props.theme.colors.gradation.main};
  -webkit-background-clip: text; /* Safari/Chrome 지원을 위한 접두사 */
  background-clip: text;
  color: transparent;
`;
