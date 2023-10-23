import { MetaMaskInpageProvider } from '@metamask/providers';
import { Address } from '@herajs/common';
import { Wallet } from '@herajs/wallet';
import { v4 as uuidv4 } from 'uuid';
import { AergoClient } from '@herajs/client';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider,
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */
export const getKeys = async () => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'get-keys' } },
  });

  if (response) {
    const address = new Address(response.walletAddress);
    console.log(address, 'address');
    const aergo = new AergoClient();
    console.log(aergo, 'AergoClient');
    const walletConfig = {
      appName: 'aergo-snap',
      instanceId: uuidv4(),
    };
    console.log(walletConfig, 'walletConfig');
    const wallet = new Wallet();
    wallet.useChain({
      chainId: 'localhost',
      nodeUrl: 'http://3.38.108.120:7845',
    });
    const account = await wallet.accountManager.getOrAddAccount({
      chainId: 'localhost',
      address,
    });
    console.log(wallet.keyManager, 'keyManager');
    console.log(wallet.accountManager, 'accountManager');
    console.log(account, 'account');
  }
  return response;
};

export const sendTx = async () => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'send-tx',
        params: {
          from: 'AmPpwgBgDFE6PxfrUQeCXxXMyXGdBNxwbHXhc5vpy6RK9V4aWzPs',
          to: 'AmQ1kMNzQVnA49MYMrGCbpy2157dFpe4bRLXWStu3Q41CKbpyDF8',
          amount: '0 aergo',
        },
      },
    },
  });
  if (response) {
    console.log(response, 'response');
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
