export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type GetKeysResponse = {
  address: string;
};

export type Token = {
  name: string;
  hash: string;
  contractAddress: string;
  amount: string | number;
};

export interface Network {
  label: string;
  chainId: string;
  nodeUrl: string;
  scanExplorerUrl?: string;
  scanApiUrl?: string;
}
