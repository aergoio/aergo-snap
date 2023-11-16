import styled from 'styled-components';
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
}

export const Wrapper = styled.button<IButtonProps>`
  background: ${(props) =>
    props.backgroundTransparent || props.variant === 'primary-outline'
      ? 'transparent'
      : props.theme.colors[props.variant || VariantOptions.PRIMARY].main};

  color: ${(props) =>
    props.backgroundTransparent || props.variant === 'primary-outline'
      ? props.theme.colors[props.variant || VariantOptions.PRIMARY].main
      : props.theme.colors[props.variant || VariantOptions.PRIMARY].inverse};
  opacity: ${(props) => (props.disabled ? '50%' : '100%')};
  border-radius: 100px;
  border-width: 2px;
  border-style: ${(props) =>
    props.borderVisible || props.variant === 'primary-outline'
      ? 'solid'
      : 'none'};
  border-color: ${(props) =>
    props.theme.colors[props.variant || VariantOptions.PRIMARY].main};
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  height: 4.6rem;
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

  font-size: ${(props) => props.fontSize || props.theme.fontSizes.text};
  font-weight: ${(props) =>
    props.hasIcons
      ? props.theme.fontWeights.normal
      : props.theme.fontWeights.bold};
  text-transform: ${(props) => (props.upperCaseOnly ? 'uppercase' : 'initial')};
`;

export const LeftIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const RightIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-left: ${(props) => props.theme.spacing.tiny2};
`;
