import React from 'react';
import { Card } from '@ui/atom/Card';
import { InstallFlaskButton } from 'components/Buttons';

export const NoMetamaskModalView = () => {
  return (
    <Card
      content={{
        title: 'Install',
        description:
          'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
        button: <InstallFlaskButton />,
      }}
    />
  );
};
