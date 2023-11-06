import React from 'react';
import { Card } from '../../Card';
import { ConnectButton } from '../../Buttons';
import { useAergoSnap } from '../../../hooks/useAergoSnap';
import { CardContainer } from './ConnectModal.style';

export const ConnectModalView = () => {
  const { connectToSnap } = useAergoSnap();

  return (
    <CardContainer>
      {
        <Card
          content={{
            title: 'Connect',
            description:
              'Get started by connecting to and installing the example snap.',
            button: <ConnectButton onClick={connectToSnap} />,
          }}
        />
      }
    </CardContainer>
  );
};
