import { HTMLAttributes } from 'react';
import { LoadingSpinner, Wrapper } from './Loading.style';

type Props = HTMLAttributes<HTMLDivElement>;

export const LoadingView = ({ ...otherProps }: Props) => {
  return (
    <Wrapper {...otherProps}>
      <LoadingSpinner icon="spinner" pulse />
    </Wrapper>
  );
};
