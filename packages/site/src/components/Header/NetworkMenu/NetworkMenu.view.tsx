import { Menu } from '@headlessui/react';
import { Line } from 'ui/atom/Line';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setActiveNetwork } from 'slices/networkSlice';
import { useTheme } from 'styled-components';
import { AergoSvg } from 'assets/images';
import { useState } from 'react';
import { StyledFaChevron } from '../Header.style';
import {
  MenuItem,
  MenuItems,
  Bold,
  StyledFaCircle,
  NetworkItemWrapper,
} from './NetworkMenu.style';

export const NetworkMenuView = () => {
  const [isPressed, setIsPressed] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const networks = useAppSelector((state) => state.networks);
  const handleChangeNetwork = (activeNetwork: number) => {
    dispatch(setActiveNetwork(activeNetwork));
  };

  return (
    <Menu
      as="div"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onBlur={() => setIsPressed(false)}
      style={{
        minWidth: '160px',
        border: `1px solid ${theme.colors.grey.grey1}`,
        borderRadius: '9999px',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'left',
        opacity: isPressed ? `0.5` : '1',
      }}
    >
      <AergoSvg style={{ marginRight: theme.spacing.small, width: '36px' }} />
      <Menu.Button
        as="div"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{`${networks?.items[networks?.activeNetwork]?.label}`}</span>
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
      </MenuItems>
    </Menu>
  );
};
