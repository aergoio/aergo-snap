import React, { HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop } from 'ui/atom/Backdrop';
import { Wrapper, CloseButton, Panel } from './PopIn.style';

type Props = {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean | any>>;
  showClose?: boolean;
  initialFocus?: MutableRefObject<HTMLElement | null> | undefined;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const PopInView = ({
  isOpen,
  setIsOpen,
  showClose = false,
  initialFocus,
  children,
  ...otherProps
}: Props) => {
  return (
    <Dialog
      style={{ position: 'relative', zIndex: 50 }}
      open={isOpen}
      onClose={() => setIsOpen?.(false)}
      initialFocus={initialFocus}
    >
      <Backdrop aria-hidden="true" />
      <Wrapper>
        <Panel {...otherProps}>
          <CloseButton
            className="modal-close-button"
            style={{ display: showClose ? 'inline-block' : 'none' }}
            onClick={() => setIsOpen?.(false)}
          >
            <FontAwesomeIcon icon={['fas', 'xmark']} />
          </CloseButton>
          {children}
        </Panel>
      </Wrapper>
    </Dialog>
  );
};
