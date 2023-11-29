import { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import { Description, Title, Wrapper } from './Card.style';

type CardProps = {
  content: {
    title?: string;
    description: ReactNode;
    button?: ReactNode;
  };
  disabled?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
};

export const CardView = ({
  content,
  disabled = false,
  fullWidth,
  style,
}: CardProps) => {
  const { title, description, button } = content;
  return (
    <Wrapper style={style} fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      {button}
    </Wrapper>
  );
};
