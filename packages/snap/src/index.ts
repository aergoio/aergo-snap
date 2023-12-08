import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text, copyable, divider, heading } from '@metamask/snaps-ui';
import { getKeys } from './getKeys';
import funcAergo from './aergo';

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
  request
}) => {
  if (request.method === 'ping') {
    const connectToWeb3 = await funcAergo.setNode(request.params);
    return connectToWeb3;
  }

  switch (request.method) {
    case 'getAddress': {
      const { address } = await getKeys();
      return address;
    }

    case 'sendTransaction': {
      const tx: any = request.params;

      const pn = [
        heading(`From`),
        copyable(`${tx.from}`),
        heading(`To`),
        copyable(`${tx.to}`)
      ];
      if (tx.amount) {
        pn.push(heading(`Amount`));
        pn.push(text(tx.amount));
      }

      if (tx.payloadJson) {
        pn.push(heading(`Function`));
        pn.push(text(tx.payloadJson.name));

        if (tx.payloadJson.args) {
          pn.push(heading(`Arguments`));
          pn.push(text(`${tx.payloadJson.args.toString()}`));
        }
      }

      const result = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel(pn)
        }
      });
      if (result) {
        const { key } = await getKeys();
        try {
          await funcAergo.sendSignedTransaction(request.params, key);
          return true;
        } catch (err) {
          console.error(err);
        }
      } else {
        return { result: 'cancel' };
      }
    }
    default:
      const func = funcAergo[request.method];
      if (func) {
        try {
          return JSON.parse(await func(request.params));
        } catch (err) {
          return { err: err ? JSON.stringify(err) : 'Error: Network Error' };
        }
      } else {
        return { err: `Error: Method not found (${request.method})` };
      }
  }
};
