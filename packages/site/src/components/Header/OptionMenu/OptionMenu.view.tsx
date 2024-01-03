import { Menu } from '@headlessui/react';
import { StyledFaEllipsisV } from './OptionMenu.style';
import { useAppSelector } from 'hooks/redux';
import { useTheme } from 'styled-components';

export const OptionMenuView = () => {
  const theme = useTheme();
  const { address } = useAppSelector((state) => state.wallet);
  const { network } = useAppSelector((state) => state.networks);
  const handleGoToScanExplorer = () => {
    window
      .open(`${network.scanExplorerUrl}/account/${address}`, '_blank')
      ?.focus();
  };
  return (
    <Menu
      as="div"
      style={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left'
      }}
    >
      <Menu.Button as="div">
        <StyledFaEllipsisV icon={['fas', 'ellipsis-vertical']} />
      </Menu.Button>
      <Menu.Items
        style={{
          width: '10rem',
          zIndex: '1',
          position: 'absolute',
          //   right: '0',
          background: `${theme.colors.background.default}`,
          border: `1px solid ${theme.colors.grey.grey1}`,
          boxShadow: '0px 14px 24px -6px rgba(106, 115, 125, 0.2)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          padding: `${theme.spacing.large} 0`
        }}
      >
        <span onClick={handleGoToScanExplorer}>Aergo Scan</span>
      </Menu.Items>
    </Menu>
  );
};
