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
}

export type Account = {
  hash: string;
  meta: {
    balance: string;
    balance_float: number;
    blockno: number;
    staking: string;
    staking_float: number;
    staking_formatAmount: string;
    staking_usd: string;
    ts: string;
    unstaked_balance: string;
    unstaked_balance_formatAmount: string;
    unstaked_balance_usd: string;
    usd: string;
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
