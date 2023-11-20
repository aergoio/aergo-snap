import { getBIP44AddressKeyDeriver, secp256k1 } from '@metamask/key-tree';
import {
  encodeAddress,
  hexToUint8Array,
  uint8ArrayToHex,
} from './utils/encode';

export const getKeys = async () => {
  // Get the Aergo node, corresponding to the path m/44'/441'.
  const aergoNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 441,
    },
  });

  /**
   * Create a function that takes an index and returns an extended private key for m/44'/441'/0'/0/address_index.
   * The second parameter to getBIP44AddressKeyDeriver isn't passed. This sets account and changes to 0.
   */
  const aergoNodeAddress = await getBIP44AddressKeyDeriver(aergoNode);

  // uncompressed publicKey -> compressed publicKey
  const { publicKey } = await aergoNodeAddress(0);
  const hexToArray = hexToUint8Array(publicKey);
  const compressedPublicKey = secp256k1.compressPublicKey(hexToArray);
  const address = encodeAddress(compressedPublicKey);

  return {
    aergoNodeAddress: await aergoNodeAddress(0),
    address,
  };
};
