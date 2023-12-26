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
    case 'getAddress':
      return await getAddress();
    case 'sendTransaction':
      return await sendTransaction(request.params);
    case 'sendVote':
      return await sendVote(request.params);
    case 'sendStake':
      return await sendStake(request.params);
    case 'sendUnStake':
      return await sendUnStake(request.params);
    case 'sendToken':
      return await sendToken(request.params);
    case 'sendNft':
      return await sendNft(request.params);
    default:
      const func = funcAergo[request.method];
      if (func) {
        let result: string;
        try {
          result = await func(request.params);
        } catch (err) {
          result = err ? err.toString() : 'Error: Network Error';
        }

        try {
          return JSON.parse(result);
        } catch {
          return { err: result };
        }
      } else {
        return { err: `Method not found (${request.method})` };
      }
  }
};

const getAddress = async () => {
  const { address } = await getKeys();
  return { address };
};

const sendTransaction = async (tx: any) => {
  const pn: any[] = [
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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};

const sendVote = async (params: any) => {
  const info = JSON.parse(await funcAergo.blockchain(params));
  const account = JSON.parse(
    await funcAergo.getState({ account: params.from })
  );

  const tx = {
    from: params.from,
    to: 'aergo.system',
    amount: '0',
    nonce: account.nonce + 1,
    type: 1,
    limit: 0,
    payloadJson: params.payloadJson,
    chainIdHash: info.chainIdHash
  };

  const pn: any[] = [heading(`From`), copyable(`${tx.from}`)];

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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};

const sendStake = async (params: any) => {
  const info = JSON.parse(await funcAergo.blockchain(params));
  const account = JSON.parse(
    await funcAergo.getState({ account: params.from })
  );

  const tx = {
    from: params.from,
    to: 'aergo.system',
    amount: params.amount,
    nonce: account.nonce + 1,
    type: 1,
    limit: 0,
    payloadJson: { name: 'v1stake' },
    chainIdHash: info.chainIdHash
  };

  const pn: any[] = [heading(`From`), copyable(`${tx.from}`)];

  if (tx.amount) {
    pn.push(heading(`Amount`));
    pn.push(text(tx.amount));
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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};

const sendUnStake = async (params: any) => {
  const info = JSON.parse(await funcAergo.blockchain(params));
  const account = JSON.parse(
    await funcAergo.getState({ account: params.from })
  );

  const tx = {
    from: params.from,
    to: 'aergo.system',
    amount: params.amount,
    nonce: account.nonce + 1,
    type: 1,
    limit: 0,
    payloadJson: { name: 'v1unstake' },
    chainIdHash: info.chainIdHash
  };

  const pn: any[] = [heading(`From`), copyable(`${tx.from}`)];

  if (tx.amount) {
    pn.push(heading(`Amount`));
    pn.push(text(tx.amount));
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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};

const sendToken = async (params: any) => {
  const info = JSON.parse(await funcAergo.blockchain(params));
  const account = JSON.parse(
    await funcAergo.getState({ account: params.from })
  );

  const tx = {
    from: params.from,
    to: params.contract,
    amount: '0',
    nonce: account.nonce + 1,
    type: 5,
    limit: 0,
    payloadJson: {
      name: 'transfer',
      args: [params.to, params.amount, '']
    },
    chainIdHash: info.chainIdHash
  };

  const pn: any[] = [
    heading(`Contract`),
    copyable(`${params.contract}`),
    heading(`From`),
    copyable(`${tx.from}`),
    heading(`To`),
    copyable(`${tx.to}`)
  ];
  if (tx.amount) {
    pn.push(heading(`Amount`));
    pn.push(text(tx.amount));
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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};

const sendNft = async (params: any) => {
  const info = JSON.parse(await funcAergo.blockchain(params));
  const account = JSON.parse(
    await funcAergo.getState({ account: params.from })
  );

  const tx = {
    from: params.from,
    to: params.nftHash,
    amount: '0',
    nonce: account.nonce + 1,
    type: 5,
    limit: 0,
    payloadJson: {
      name: 'transfer',
      args: [params.to, params.amount, '']
    },
    chainIdHash: info.chainIdHash
  };

  const pn: any[] = [
    heading(`NFT`),
    copyable(`${params.nftHash}`),
    heading(`From`),
    copyable(`${tx.from}`),
    heading(`To`),
    copyable(`${tx.to}`)
  ];
  if (tx.amount) {
    pn.push(heading(`Amount`));
    pn.push(text(tx.amount));
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
    const result = await funcAergo.sendSignedTransaction(tx, key);

    try {
      return JSON.parse(result);
    } catch {
      return { err: result };
    }
  }
  return { result: 'cancel' };
};
