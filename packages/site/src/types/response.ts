import { BIP44Node } from '@metamask/key-tree';

export type GetKeysResponse = {
  aergoBip44Node: BIP44Node;
  walletAddress: string;
};
