import { MetaMaskInpageProvider } from '@metamask/providers';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import { GetKeysResponse } from '../types/response';

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
  const response = (await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'get-keys' } },
  })) as GetKeysResponse;

  if (response) {
    // TODO: 이후 메타마스크 Keyring을 통해, Key, Account 관리를 해야한다 (ex:ChainId, 잔고 등...)
    //! 임시로 사용되는 개인키 저장소
    window.sessionStorage.setItem('pk', JSON.stringify(response));
  }
  return response;
};

export const sendTx = async () => {
  try {
    const pk = await window.sessionStorage.getItem('pk');
    if (pk) {
      const { walletAddress: from } = JSON.parse(pk);
      const to = 'AmQ1kMNzQVnA49MYMrGCbpy2157dFpe4bRLXWStu3Q41CKbpyDF8';
      const amount = '10000000000';

      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'send-tx',
            params: { from, to, amount },
          },
        },
      });
      if (response) {
        console.log(response, 'response');
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
