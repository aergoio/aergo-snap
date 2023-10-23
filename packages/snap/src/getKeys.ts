import { getBIP44AddressKeyDeriver, secp256k1 } from '@metamask/key-tree';
import { encodeAddress, hexToUint8Array } from './utils/encode';

export const getKeys = async () => {
  // Get the Aergo node, corresponding to the path m/44'/441'.
  const aergoBip44Entropy = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 441,
    },
  });

  /**
   * Create a function that takes an index and returns an extended private key for m/44'/441'/0'/0/address_index.
   * The second parameter to getBIP44AddressKeyDeriver isn't passed. This sets account and changes to 0.
   */
  const aergoBip44 = await getBIP44AddressKeyDeriver(aergoBip44Entropy);

  // uncompressed publicKey -> compressed publicKey -> base58Check to public
  const { publicKey } = await aergoBip44(0);
  const hexToArray = hexToUint8Array(publicKey);
  const compressedPublicKey = secp256k1.compressPublicKey(hexToArray);
  const walletAddress = encodeAddress(compressedPublicKey);

  return {
    nodeAddress: await aergoBip44(0),
    walletAddress,
  };
};
