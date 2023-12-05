import styled, { css } from 'styled-components';
import { Variant, VariantOptions } from 'theme/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IButtonProps {
  variant?: Variant;
  enabled?: boolean;
  backgroundTransparent?: boolean;
  spacing?: string;
  borderVisible?: boolean;
}

interface ITextWrapper {
  fontSize?: string;
  upperCaseOnly?: boolean;
  hasIcons: boolean;
  noText: boolean;
}

export const Wrapper = styled.button<IButtonProps>`
  background: ${(props) =>
    props.backgroundTransparent ||
    props.variant === 'primary-outline' ||
    props.variant === 'secondary-outline'
      ? 'transparent'
      : props.theme.colors[props.variant || VariantOptions.PRIMARY].main};
  ${(props) =>
    props.variant === 'font-gradation' &&
    css`
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      box-shadow: ${(props: any) =>
        props.theme.colors[props.variant || VariantOptions.PRIMARY].shadow};

      :hover {
        opacity: 100% !important;
        background: ${(props: any) =>
          props.theme.colors[props.variant || VariantOptions.PRIMARY].hover};
        span,
        path {
          color: #fff;
          fill: #fff;
          -webkit-text-fill-color: #fff;
        }
      }
    `}
  color: ${(props) =>
    props.backgroundTransparent ||
    props.variant === 'primary-outline' ||
    props.variant === 'secondary-outline' ||
    props.variant === 'font-gradation'
      ? props.theme.colors[props.variant || VariantOptions.PRIMARY].main
      : props.theme.colors[props.variant || VariantOptions.PRIMARY].inverse};
  opacity: ${(props) => (props.disabled ? '50%' : '100%')};
  border-radius: 100px;
  border-width: 2px;
  border-style: ${(props) =>
    props.borderVisible ||
    props.variant === 'primary-outline' ||
    props.variant === 'secondary-outline'
      ? 'solid'
      : 'none'};
  border-color: ${(props) =>
    props.theme.colors[props.variant || VariantOptions.PRIMARY].main};
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px
    ${(props) =>
      props.spacing
        ? props.theme.spacing[props.spacing]
        : props.theme.spacing.tiny1};
  transition: 0.1s all;
  :hover {
    opacity: 0.75;
  }
  :active {
    opacity: 0.5;
  }
`;

export const TextWrapper = styled.span<ITextWrapper>`
  font-family: 'Outfit-Medium';

  font-size: ${(props) => props.fontSize || props.theme.fontSizes.small};
  font-weight: ${(props) =>
    props.hasIcons
      ? props.theme.fontWeights.normal
      : props.theme.fontWeights.bold};
  text-transform: ${(props) => (props.upperCaseOnly ? 'uppercase' : 'initial')};
  margin: ${(props) =>
    props.hasIcons && !props.noText ? props.theme.spacing.tiny2 : ''};
`;

export const LeftIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.theme.fontSizes.large};
  /* margin-right: ${(props) => props.theme.spacing.tiny2}; */
`;
export const StyledCustomLeftIcon = styled.span`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const RightIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.theme.fontSizes.large};
  /* margin-left: ${(props) => props.theme.spacing.tiny2}; */
`;

export const StyledCustomRightIcon = styled.span`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-left: ${(props) => props.theme.spacing.tiny2};
`;
