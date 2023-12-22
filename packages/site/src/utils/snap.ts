import { MetaMaskInpageProvider } from '@metamask/providers';
import { defaultSnapOrigin } from './constants';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps'
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {}
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params
    }
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
        snap.id === defaultSnapOrigin && (!version || snap.version === version)
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */
export const sendHello = async () => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'hello' } }
  });

  if (response) {
    console.log(response, 'response');
  }
  return response;
};

export const getAddress = async () => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'getAddress' } }
  });
  return response;
};

export const getBlockNumber = async () => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'getBlockNumber' } }
  });

  if (response && typeof response === 'string') {
    return JSON.parse(response);
  }
  return;
};

export const getAccount = async (address: string) => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'getAccount', params: { address } }
    }
  });

  if (response && typeof response === 'string') {
    return JSON.parse(response);
  }
  return;
};

export const sendAergo = async (tx: any) => {
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'sendTransaction', params: { tx } }
    }
  });

  if (response && typeof response === 'string') {
    try {
      return JSON.parse(response);
    } catch (error) {
      return response;
    }
  }
  return;
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
