import { Menu } from '@headlessui/react';
import { Line } from 'ui/atom/Line';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setActiveNetwork } from 'slices/networkSlice';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import { Button } from 'ui/atom/Button';
import { StyledFaChevron } from '../Header.style';
import {
  Wrapper,
  MenuItem,
  MenuItems,
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
    <Wrapper>
      <Menu
        as="div"
        style={{
          position: 'relative',
          border: `1px solid ${theme.colors.grey.grey1}`,
          borderRadius: '24px',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left'
        }}
      >
        <StyledAergoSvg />
        <Menu.Button
          as="div"
          style={{
            marginLeft: '6px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            whiteSpace: 'nowrap'
          }}
        >
          <MenuNetworkLabel>{`${
            networks?.items[networks?.activeNetwork]?.label
          }`}</MenuNetworkLabel>
          <StyledFaChevron icon={['fas', 'chevron-down']} />
        </Menu.Button>
        <MenuItems>
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
          <Menu.Item>
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
          </Menu.Item>
        </MenuItems>
      </Menu>
    </Wrapper>
  );
};
