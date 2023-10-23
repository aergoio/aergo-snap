import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { getKeys } from './getKeys';

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

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'get-keys': {
      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('Connect To Aergo Node and Get Wallet Address'),
          ]),
        },
      });
      if (result) {
        return await getKeys();
      }
      break;
    }

    case 'send-tx': {
      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            // text(
            //   `Send Transaction from:${request.args.from} to:${request.args.to} amount:${request.args.amount}`,
            // ),
          ]),
        },
      });
      if (result) {
        return request;
      }
      break;
    }

    default:
      throw new Error('Method not found.');
  }
};
