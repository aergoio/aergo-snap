import { Menu } from '@headlessui/react';
import { Line } from 'ui/atom/Line';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setActiveNetwork } from 'slices/networkSlice';
import { useTheme } from 'styled-components';
import { Button } from 'ui/atom/Button';
import { StyledFaChevron } from '../Header.style';
import {
  MenuItem,
  Bold,
  StyledFaCircle,
  NetworkItemWrapper,
  MenuNetworkLabel,
  StyledAergoSvg
} from './NetworkMenu.style';

export const NetworkMenuView = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const networks = useAppSelector((state) => state.networks);
  const handleChangeNetwork = (activeNetwork: number) => {
    dispatch(setActiveNetwork(activeNetwork));
  };

  const handleConfigureNetwork = () => {
    console.log('handleConfigureNetwork');
  };

  return (
    <Menu
      as="div"
      style={{
        marginLeft: '1rem',
        position: 'relative',
        border: `1px solid ${theme.colors.grey.grey1}`,
        borderRadius: '24px',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        minHeight: '3rem'
      }}
    >
      <Menu.Button
        as="div"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          whiteSpace: 'nowrap'
        }}
      >
        <StyledAergoSvg style={{ width: '24px' }} />
        <MenuNetworkLabel>{`${
          networks?.items[networks?.activeNetwork]?.label
        }`}</MenuNetworkLabel>
        <StyledFaChevron icon={['fas', 'chevron-down']} />
      </Menu.Button>
      <Menu.Items
        style={{
          width: '25rem',
          zIndex: '1',
          position: 'absolute',
          left: '0',
          top: '100%',
          right: '0',
          background: `${theme.colors.background.default}`,
          border: `1px solid ${theme.colors.grey.grey1}`,
          boxShadow: '0px 14px 24px -6px rgba(106, 115, 125, 0.2)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          padding: `${theme.spacing.large} 0`
        }}
      >
        <Menu.Item>
          <Bold>Select Network</Bold>
        </Menu.Item>
        <Line />
        {networks.items.map((network, index) => (
          <Menu.Item key={`${network.chainId}_${index}`}>
            <NetworkItemWrapper onClick={() => handleChangeNetwork(index)}>
              <StyledFaCircle
                icon={
                  networks?.items[networks?.activeNetwork]?.label ===
                  network.label
                    ? ['fas', 'circle-check']
                    : ['far', 'circle']
                }
                checked={
                  networks?.items[networks?.activeNetwork]?.label ===
                  network.label
                }
              />
              <MenuItem>{network.label}</MenuItem>
            </NetworkItemWrapper>
          </Menu.Item>
        ))}
        <Button
          onClick={handleConfigureNetwork}
          upperCaseOnly={false}
          style={{
            width: '90%',
            marginLeft: theme.spacing.large,
            marginTop: theme.spacing.tiny1
          }}
        >
          Configure Network
        </Button>
      </Menu.Items>
    </Menu>
  );
};
