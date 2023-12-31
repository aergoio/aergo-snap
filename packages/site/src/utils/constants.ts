import { Network } from 'types';

export const COINGECKO_API = 'https://api.coingecko.com/api/v3/';

export const POPOVER_DURATION = 1000;

export const Networks: Network[] = [
  {
    consensus: 'dpos',
    label: 'Mainnet',
    chainId: 'aergo.io',
    nodeUrl: 'https://mainnet-api-http.aergo.io',
    scanExplorerUrl: 'https://mainnet.aergoscan.io',
    scanApiUrl: 'https://api2-mainnet.aergoscan.io/v2'
  },
  {
    consensus: 'dpos',
    label: 'Testnet',
    chainId: 'testnet.aergo.io',
    nodeUrl: 'https://testnet-api-http.aergo.io',
    scanExplorerUrl: 'https://testnet.aergoscan.io',
    scanApiUrl: 'https://api2-testnet.aergoscan.io/v2'
  },
  {
    consensus: 'raft',
    label: 'Alpha',
    chainId: 'alpha.aergo.io',
    nodeUrl: 'https://alpha-api-http.aergo.io',
    scanExplorerUrl: 'https://alpha.aergoscan.io',
    scanApiUrl: 'https://api2-alpha.aergoscan.io/v2',
    web3Url: 'https://alpha-api-web.aergo.io'
  },
  {
    consensus: 'dpos',
    label: 'Snaps',
    chainId: 'snap.aergo.io',
    nodeUrl: 'https://nodeconnect.blocko.io',
    scanExplorerUrl: 'https://scanconnect.blocko.io',
    scanApiUrl: 'https://apiconnect.blocko.io/v2',
    web3Url: 'https://webconnect.blocko.io'
  }
];

export const defaultSnapOrigin =
  process.env.SNAP_ORIGIN ?? `local:http://localhost:8080`;
