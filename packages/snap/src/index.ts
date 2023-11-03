import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { getKeys } from './getKeys';
import { signTx } from './utils/tx';
import { getBlockNumber, getAccount, sendTransaction } from './aergo';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
    const params: any = request.params;

    switch (request.method) {
        case 'getAddress': {
            const { address } = await getKeys();
            return address;
        }
        case 'getBlockNumber': {
            return await getBlockNumber();
        }
        case 'getAccount': {
            return await getAccount(params?.address);
        }
        case 'sendTransaction': {
            const { key } = await getKeys();
            return await sendTransaction(await signTx(params.tx, key));
        }

        default:
            throw new Error('Method not found.');
    }
};
