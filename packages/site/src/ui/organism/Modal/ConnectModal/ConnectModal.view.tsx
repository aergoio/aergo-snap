import React from 'react';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { ConnectButton } from 'components/Buttons';
import { Card } from 'ui/molecule';

export const ConnectModalView = () => {
  const { connectToSnap } = useAergoSnap();

  return (
    <Card
      content={{
        title: 'Connect',
        description:
          'Get started by connecting to and installing the example snap.',
        button: <ConnectButton onClick={connectToSnap} />,
      }}
    />
  );
};
