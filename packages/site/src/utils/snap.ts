// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AergoClient, { GrpcWebProvider } from '@herajs/client';
import { Address } from '@herajs/common';
import { Wallet } from '@herajs/wallet';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { v4 as uuidv4 } from 'uuid';
import { hashTransaction, signTransaction } from '@herajs/crypto';
import { ec } from 'elliptic';
import axios from 'axios';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import { GetKeysResponse } from '../types/response';

const wallet = new Wallet();

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
    window.sessionStorage.setItem(
      'pk',
      JSON.stringify(response.aergoBip44Node),
    );
    const address = new Address(response.walletAddress);
    // const aergo = new AergoClient(
    //   {},
    //   new GrpcWebProvider({ url: 'http://temp.aergonode.io' }),
    // );
    // const walletConfig = {
    //   appName: 'aergo-snap',
    //   instanceId: uuidv4(),
    // };
    // console.log(walletConfig, 'walletConfig');

    wallet.useChain({
      chainId: 'sto.aergo.io',
      nodeUrl: 'http://temp.aergonode.io',
    });

    // TODO: metamask snaps 의 private Key로 가져온 account -> 상태 관리 추가
    const account = await wallet.accountManager.getOrAddAccount({
      chainId: 'localhost',
      address,
    });
    console.log(account, 'account');
    // console.log(wallet.keyManager, 'keyManager');
    // console.log(wallet.accountManager, 'accountManager');
  }
  return response;
};

export const sendTx = async () => {
  const account = await wallet.accountManager.loadAccount({
    chainId: 'sto.aergo.io',
    address: 'AmPpwgBgDFE6PxfrUQeCXxXMyXGdBNxwbHXhc5vpy6RK9V4aWzPs',
  });

  const getAccountState = await axios.get(
    'http://temp.aergonode.io:7847/v1/getState?account=AmPpwgBgDFE6PxfrUQeCXxXMyXGdBNxwbHXhc5vpy6RK9V4aWzPs',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  try {
    const { nonce } = getAccountState.data;
    const txBody = {
      nonce: nonce + 1,
      from: 'AmPpwgBgDFE6PxfrUQeCXxXMyXGdBNxwbHXhc5vpy6RK9V4aWzPs',
      to: 'AmQ1kMNzQVnA49MYMrGCbpy2157dFpe4bRLXWStu3Q41CKbpyDF8',
      amount: '0 aer',
    };
    const preparedTxData = await wallet.accountManager.prepareTransaction(
      account,
      txBody,
    );
    console.log(preparedTxData, 'preparedTxData');
    const pk = await window.sessionStorage.getItem('pk');
    if (pk) {
      // eslint-disable-next-line new-cap
      const secp256k1 = new ec('secp256k1');
      const { privateKey } = JSON.parse(pk);
      const key = secp256k1.keyFromPrivate(privateKey);
      const sign = await signTransaction(preparedTxData.txBody, key);
      const tx = { ...preparedTxData.txBody, sign };
      const hash = await hashTransaction(tx);
      console.log(hash, 'hash');
      // axios.post('http://localapi.aergoscan.io', {});
      console.log(sign, 'sign');
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'send-tx',
            params: { ...tx, hash },
          },
        },
      });
      if (response) {
        console.log(response, 'response');
        // TODO: 연결 된 account로 metamask crypto signing -> web3 api를 통한 send 로직 추가.
        // const sign = await wallet.keyManager.signTransaction(
        //   account,
        //   preparedTxData,
        // );
        // tx.txBody.hash = await hashTransaction(txBody, 'base58');
        // txTracker.getReceipt().then((receipt) => {
        //   if (receipt.status === 'SUCCESS') {
        //     console.log(txTracker.transaction);
        //   }
        // });
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
