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
  amount: string | number;
  hash: string;
  contractAddress?: string;
  usd?: string;
};

export interface Network {
  label: string;
  chainId: string;
  nodeUrl: string;
  scanExplorerUrl?: string;
  scanApiUrl?: string;
}

export type Account = {
  hash: string;
  meta: {
    balance: string;
    balance_float: number;
    blockno: number;
    staking: string;
    staking_float: number;
    ts: string;
  };
};

export type Transaction = {
  hash: string;
  meta: {
    amount: string;
    amount_float: number;
    block_id: string;
    blockno: number;
    category: string;
    contract: string;
    fee_delegation: boolean;
    fee_used: string;
    from: string;
    gas_limit: number;
    gas_price: string;
    gas_used: number;
    method: string;
    nonce: number;
    payload: string;
    result: string;
    status: string;
    to: string;
    ts: string;
    tx_idx: number;
    type: number;
  };
};
