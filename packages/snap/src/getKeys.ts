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
    const aergoBip44Node = await getBIP44AddressKeyDeriver(aergoBip44Entropy);

    // uncompressed publicKey -> compressed publicKey -> base58Check to public
    const node = await aergoBip44Node(0);
    const hexToArray = hexToUint8Array(node.publicKey!);
    const compressedPublicKey = secp256k1.compressPublicKey(hexToArray);
    const address = encodeAddress(compressedPublicKey);

    return {
        address,
        key: node.privateKeyBytes,
    };
};

const addressFromPublicKey = (publicKey: any) => {
    const len = publicKey.curve.p.byteLength();
    const x = publicKey.getX().toArray('be', len);
    const address = Uint8Array.from([publicKey.getY().isEven() ? 0x02 : 0x03].concat(x));
    return encodeAddress(address);
};
