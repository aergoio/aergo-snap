import { sign } from '@noble/secp256k1';
import { secp256k1 } from '@noble/curves/secp256k1';

import { decodeAddress, encodeAddress, fromNumber, fromBigInt, fromHexString, bufferOrB58, decodeToBytes, encodeBuffer, ByteEncoding } from './encode';

const signTx = async (tx: any, key: Uint8Array) => {
    tx.sign = await signTransaction(tx, key, 'base58');
    const hash = await hashTransaction(tx, 'base58');

    return {
        Hash: hash,
        Body: {
            Nonce: tx.nonce,
            Account: tx.from,
            Recipient: tx.to,
            Amount: tx.amount,
            ChainIdHash: tx.chainIdHash,
            Sign: tx.sign,
            Type: tx.type,
        },
    };
};

const signTransaction = async (tx: any, key: Uint8Array, enc: ByteEncoding = 'base58') => {
    const msgHash = (await hashTransaction(tx, 'bytes', false)) as Buffer;
    return signMessage(msgHash, key, enc);
};

const signMessage = async (msgHash: Buffer, key: Uint8Array, enc: ByteEncoding = 'base58') => {
    const sig = await sign(msgHash, key);
    return encodeSignature(sig, enc);
};

const encodeSignature = (sig: Uint8Array, enc: ByteEncoding = 'base58') => {
    return encodeBuffer(sig, enc);
};

const hashTransaction = async (tx: any, encoding: ByteEncoding | 'bytes' = 'base58', includeSign = true) => {
    // Amount defaults to zero if tx.amount is falsy
    let amount = '0';
    if (tx.amount) {
        const amountStr = tx.amount.toString().trim();
        if (amountStr !== '') {
            // Throw error if unit is given other than aer
            const amountUnit = amountStr.match(/\s*([^0-9]+)\s*/);
            if (amountUnit && amountUnit[1] !== 'aer') {
                throw Error(`Can only hash amounts provided in the base unit (aer), not '${tx.amount}'. Convert to aer or remove unit.`);
            }
            // Strip unit
            amount = amountStr.replace(/[^0-9]/g, '');
            // Throw error if amount is an empty string at this point (amount with unit but without value)
            if (amount === '') {
                throw Error(`Could not parse numeric value from amount '${tx.amount}'.`);
            }
        }
    }
    const type = typeof tx.type !== 'undefined' ? tx.type : inferType(tx);

    const items = [
        fromNumber(tx.nonce, 64 / 8),
        decodeAddress(tx.from.toString()),
        tx.to ? decodeAddress(tx.to.toString()) : Buffer.from([]),
        fromBigInt(amount != '' ? amount : 0),
        tx.payload ? Buffer.from(tx.payload as any) : Buffer.from([]),
        fromNumber(tx.limit || 0, 64 / 8),
        tx.price ? fromBigInt(tx.price.toString()) : Buffer.from([]),
        fromNumber(type, 32 / 8),
        bufferOrB58(tx.chainIdHash),
    ].map(item => Buffer.from(item));

    let data = Buffer.concat(items);

    if (includeSign && typeof tx.sign !== 'undefined') {
        data = Buffer.concat([data, decodeToBytes(tx.sign, 'base58')]);
    }

    const result = hash(data);

    if (encoding === 'bytes') {
        return result;
    }
    return encodeBuffer(result, encoding);
};

const inferType = (tx: any) => {
    if (!tx.to) {
        return 6;
    }

    if (`${tx.to}` === 'aergo.system' || `${tx.to}` === 'aergo.enterprise') {
        return 1;
    }
    return 0;
};

const hash = (data: Buffer) => {
    const h = secp256k1.CURVE.hash.create();
    h.update(data);
    return Buffer.from(h.digest());
};

export { signTx, signTransaction, hashTransaction };
