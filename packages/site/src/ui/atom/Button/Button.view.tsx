import { MouseEvent, ButtonHTMLAttributes, ReactNode } from 'react';
import { Variant } from 'theme/types';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties } from 'styled-components';
import {
  LeftIcon,
  RightIcon,
  TextWrapper,
  Wrapper,
  StyledCustomLeftIcon,
  StyledCustomRightIcon,
} from './Button.style';

type Props = {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  enabled?: boolean;
  variant?: Variant;
  iconLeft?: IconName;
  iconRight?: IconName;
  backgroundTransparent?: boolean;
  fontSize?: string;
  spacing?: string;
  borderVisible?: boolean;
  upperCaseOnly?: boolean;
  textStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  customIconLeft?: ReactNode;
  customIconRight?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonView = ({
  onClick = () => void 0,
  enabled = true,
  variant,
  iconLeft,
  iconRight,
  customIconLeft,
  customIconRight,
  backgroundTransparent,
  children,
  fontSize,
  spacing,
  borderVisible,
  upperCaseOnly = true,
  textStyle,
  iconStyle,
  ...otherProps
}: Props) => {
  const hasIcons = iconRight !== undefined || iconLeft !== undefined;
  return (
    <Wrapper
      variant={variant}
      onClick={onClick}
      disabled={!enabled}
      backgroundTransparent={backgroundTransparent}
      spacing={spacing}
      borderVisible={borderVisible}
      {...otherProps}
    >
      <StyledCustomLeftIcon>{customIconLeft}</StyledCustomLeftIcon>
      {iconLeft && <LeftIcon icon={['fas', iconLeft]} style={iconStyle} />}
      <TextWrapper
        hasIcons={hasIcons}
        fontSize={fontSize}
        upperCaseOnly={upperCaseOnly}
        style={textStyle}
      >
        {children}
      </TextWrapper>
      {iconRight && <RightIcon icon={['fas', iconRight]} style={iconStyle} />}
      <StyledCustomRightIcon>{customIconRight}</StyledCustomRightIcon>
    </Wrapper>
  );
};
