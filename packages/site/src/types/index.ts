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

export interface Network {
  label: string;
  chainId: string;
  nodeUrl: string;
  scanExplorerUrl?: string;
  scanApiUrl?: string;
  web3Url?: string;
}

export type Transaction = {
  token: any;
  hash: string;
  meta: {
    decimals: number;
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
  receipt?: {
    hash: string;
    meta: {
      blockno: number;
      block_id: string;
      ts: string;
      tx_idx: number;
      payload: string;
      from: string;
      to: string;
      amount: string;
      amount_float: number;
      type: number;
      category: string;
      method: string;
      status: string;
      result: string;
      contract: string;
      nonce: number;
      fee_delegation: boolean;
      gas_price: string;
      gas_limit: number;
      gas_used: number;
      fee_used: string;
    };
  };
};

export type Token = {
  hash: string;
  meta: {
    blockno: number;
    comment: string;
    creator: string;
    decimals: number;
    email: string;
    homepage_url: string;
    image_url: string;
    name: string;
    name_lower: string;
    owner: string;
    regdate: string;
    supply: string;
    supply_float: number;
    symbol: string;
    symbol_lower: string;
    token_address: string;
    total_transfer: number;
    tx_id: string;
    type: string;
    verified_status: string;
    image?: string;
    url?: string;
  };
  tokenBalance?: TokenBalance;
};

export type TokenBalance = {
  hash: string;
  meta: {
    account: string;
    address: string;
    balance: string;
    balance_float: string;
    ts: string;
    type: string;
  };
  token: Token;
};

export type NodeResponse = {
  node: string;
};
