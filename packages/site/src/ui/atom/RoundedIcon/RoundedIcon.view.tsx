import { HTMLAttributes, ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { Wrapper } from './RoundedIcon.style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
}

export const RoundedIconView = ({ children, style, ...otherProps }: Props) => {
  return (
    <Wrapper style={style} {...otherProps}>
      {children}
    </Wrapper>
  );
};
