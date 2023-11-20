import { BIP44AddressKeyDeriver } from '@metamask/key-tree';

export type ApiParams = {
  keyDeriver?: BIP44AddressKeyDeriver;
};

export type ApiRequestParams =
  | ExtractPrivateKeyRequestParams
  | ExtractPublicKeyRequestParams;

export type BaseRequestParams = {
  chainId?: string;
  isDev?: boolean;
  debugLevel?: string;
};

export type ExtractPrivateKeyRequestParams = {
  userAddress: string;
} & BaseRequestParams;

export type ExtractPublicKeyRequestParams = {
  userAddress: string;
} & BaseRequestParams;
