import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { encodeAddress } from './utils/encode';
import { ec } from 'elliptic';

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
    // const { publicKey } = await aergoBip44Node(0);
    // const hexToArray = hexToUint8Array(publicKey);
    // const compressedPublicKey = secp256k1.compressPublicKey(hexToArray);
    // const walletAddress = encodeAddress(compressedPublicKey);

    const node: any = await aergoBip44Node(0);
    const secp256k1 = new ec('secp256k1');
    const key = secp256k1.keyFromPrivate(node.privateKey);
    const address = addressFromPublicKey(key.getPublic());

    return {
        address,
        key,
    };
};

const addressFromPublicKey = (publicKey: any) => {
    const len = publicKey.curve.p.byteLength();
    const x = publicKey.getX().toArray('be', len);
    const address = Uint8Array.from([publicKey.getY().isEven() ? 0x02 : 0x03].concat(x));
    return encodeAddress(address);
};
