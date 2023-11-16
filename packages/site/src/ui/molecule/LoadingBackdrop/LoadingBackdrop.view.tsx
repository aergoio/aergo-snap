import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop } from 'ui/atom/Backdrop';
import { Wrapper } from './LoadingBackdrop.style';

type Props = {
  children?: ReactNode;
};

export const LoadingBackdropView = ({ children }: Props) => {
  return (
    <>
      <Backdrop />
      <Wrapper>
        <FontAwesomeIcon icon="spinner" pulse size="3x" />
        <h1>{children}</h1>
      </Wrapper>
    </>
  );
};
