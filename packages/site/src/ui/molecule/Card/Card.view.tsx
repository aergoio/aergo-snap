import { ReactNode } from 'react';
import { Description, Title, Wrapper } from './Card.style';

type CardProps = {
  content: {
    title?: string;
    description: ReactNode;
    button?: ReactNode;
  };
  disabled?: boolean;
  fullWidth?: boolean;
};

export const CardView = ({
  content,
  disabled = false,
  fullWidth,
}: CardProps) => {
  const { title, description, button } = content;
  return (
    <Wrapper fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      {button}
    </Wrapper>
  );
};
