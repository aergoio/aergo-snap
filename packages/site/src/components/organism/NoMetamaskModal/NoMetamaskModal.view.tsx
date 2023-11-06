import React from 'react';
import { Card } from '../../Card';
import { InstallFlaskButton } from '../../Buttons';
import { CardContainer } from './NoMetamaskModal.style';

export const NoMetamaskModalView = () => {
  return (
    <CardContainer>
      {
        <Card
          content={{
            title: 'Install',
            description:
              'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
            button: <InstallFlaskButton />,
          }}
        />
      }
    </CardContainer>
  );
};
