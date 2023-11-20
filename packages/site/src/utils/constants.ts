import { Network } from 'types';

export const COINGECKO_API = 'https://api.coingecko.com/api/v3/';

export const POPOVER_DURATION = 1000;

export const Networks: Network[] = [
  {
    label: 'mainnet',
    chainId: 'aergo.io',
    nodeUrl: 'https://mainnet-api-http.aergo.io',
    scanExplorerUrl: 'https://mainnet.aergoscan.io',
    scanApiUrl: 'https://api2-mainnet.aergoscan.io/v2',
  },
  {
    label: 'testnet',
    chainId: 'testnet.aergo.io',
    nodeUrl: 'https://testnet-api-http.aergo.io',
    scanExplorerUrl: 'https://testnet.aergoscan.io',
    scanApiUrl: 'https://api2-testnet.aergoscan.io/v2',
  },
  {
    label: 'alpha',
    chainId: 'alpha.aergo.io',
    nodeUrl: 'https://alpha-api-http.aergo.io',
    scanExplorerUrl: 'https://alpha.aergoscan.io',
    scanApiUrl: 'https://api2-alpha.aergoscan.io/v2',
  },
];
