import { ec } from 'elliptic';
import { signTx } from './utils/tx';

const setNode = async (params: any) => {
    let url = `${params.node}`;
    if (url.endsWith('/')) {
        url = params.node.slice(0, -1);
    }

    await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: { aergoNodeUrl: url } },
    });

    return url;
};

const getNode = async () => {
    const persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    });

    if (persistedData && !!persistedData.aergoNodeUrl) {
        return persistedData.aergoNodeUrl.toString();
    }
    return 'http://localhost';
};

const getApiUrl = async () => {
    return (await getNode()) + '/v1';
};

const createQueryString = (params: any) => {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

const buildUrl = (url: string, params: any) => {
    const queryString = createQueryString(params);
    return `${url}?${queryString}`;
};

const getAccounts = async () => {
    const response = await fetch(`${await getApiUrl()}/getAccounts`);
    return response.text();
};

const getState = async (params: any) => {
    const data: { account: string } = {
        account: params.account,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getState`, data));
    return response.text();
};

const getProof = async (params: any) => {
    const data: { account: string; compressed?: boolean } = {
        account: params.account,
        compressed: false,
    };
    if (params.compressed) data.compressed = params.compressed;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getProof`, data));
    return response.text();
};

const getNameInfo = async (params: any) => {
    const data: { name: string; number: number } = {
        name: params.name,
        number: params.number,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getNameInfo`, data));
    return response.text();
};

const getBalance = async (params: any) => {
    const data: { account: string } = {
        account: params.account,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBalance`, data));
    return response.text();
};

const getBlock = async (params: any) => {
    const data: { hash?: string; number?: number } = {};
    if (params.hash) data.hash = params.hash;
    if (params.number) data.hash = params.number;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlock`, data));
    return response.text();
};

const getBlockNumber = async () => {
    const response = await fetch(`${await getApiUrl()}/getBlockNumber`);
    return response.text();
};

const getBlockBody = async (params: any) => {
    const data: { hash?: string; number?: number; offset: number; size: number } = {
        offset: 0,
        size: 10,
    };
    if (params.hash) data.hash = params.hash;
    if (params.number) data.hash = params.number;
    if (params.offset) data.offset = params.offset;
    if (params.size) data.size = params.size;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlockBody`, data));
    return response.text();
};

const listBlockHeaders = async (params: any) => {
    const data: { height: number; offset: number; size: number; asc: boolean } = {
        height: params.height,
        offset: 0,
        size: 10,
        asc: true,
    };

    if (params.offset) data.offset = params.offset;
    if (params.size) data.size = params.size;
    if (params.asc) data.asc = params.asc;

    const response = await fetch(buildUrl(`${await getApiUrl()}/listBlockHeaders`, data));
    return response.text();
};

const getBlockMetadata = async (params: any) => {
    const data: { hash?: string; number?: number } = {};
    if (params.hash) data.hash = params.hash;
    if (params.number) data.hash = params.number;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlockMetadata`, data));
    return response.text();
};

const getTransaction = async (params: any) => {
    const data: { hash: string } = {
        hash: params.hash,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getTransaction`, data));
    return response.text();
};

const getTransactionReceipt = async (params: any) => {
    const data: { hash: string } = {
        hash: params.hash,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getTransactionReceipt`, data));
    return response.text();
};

const getBlockTransactionReceipts = async (params: any) => {
    const data: { hash?: string; number?: number } = {};
    if (params.hash) data.hash = params.hash;
    if (params.number) data.hash = params.number;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlockTransactionReceipts`, data));
    return response.text();
};

const getBlockTX = async (params: any) => {
    const data: { hash: string } = {
        hash: params.hash,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlockTX`, data));
    return response.text();
};

const call = async (params: any) => {
    const data: { address: string; name: string; query?: [string] } = {
        address: params.address,
        name: params.name,
    };
    if (params.query) data.query = params.query;

    const response = await fetch(buildUrl(`${await getApiUrl()}/call`, data));
    return response.text();
};

const getPastEvents = async (params: any) => {
    const data: { address: string; eventName: string; blockfrom?: number; blockto?: number; desc: boolean; argFilter?: string; recentBlockCnt?: number } = {
        address: params.address,
        eventName: params.eventName,
        desc: true,
    };
    if (params.blockfrom) data.blockfrom = params.blockfrom;
    if (params.blockto) data.blockto = params.blockto;
    if (params.desc) data.desc = params.desc;
    if (params.argFilter) data.argFilter = params.argFilter;
    if (params.recentBlockCnt) data.recentBlockCnt = params.recentBlockCnt;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getPastEvents`, data));
    return response.text();
};

const getABI = async (params: any) => {
    const data: { address: string } = {
        address: params.address,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getABI`, data));
    return response.text();
};

const queryContractState = async (params: any) => {
    const data: { address: string; varname1?: string; varname2?: string; compressed: boolean } = {
        address: params.address,
        compressed: false,
    };
    if (params.varname1) data.varname1 = params.varname1;
    if (params.varname2) data.varname2 = params.varname2;
    if (params.compressed) data.compressed = params.compressed;

    const response = await fetch(buildUrl(`${await getApiUrl()}/queryContractState`, data));
    return response.text();
};

const getBlockTransactionCount = async (params: any) => {
    const data: { hash?: string; number?: number } = {};
    if (params.hash) data.hash = params.hash;
    if (params.number) data.hash = params.number;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getBlockTransactionCount`, data));
    return response.text();
};

const getChainInfo = async () => {
    const response = await fetch(`${await getApiUrl()}/getChainInfo`);
    return response.text();
};

const getConsensusInfo = async () => {
    const response = await fetch(buildUrl(`${await getApiUrl()}/getConsensusInfo`, data));
    return response.text();
};

const getAccountVotes = async (params: any) => {
    const data: { account: string } = {
        account: params.account,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getAccountVotes`, data));
    return response.text();
};

const getNodeInfo = async (params: any) => {
    const data: { timeout: number; component?: string } = {
        timeout: 3,
    };
    if (params.component) data.component = params.component;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getNodeInfo`, data));
    return response.text();
};

const getChainId = async (params: any) => {
    const data: { noHidden: boolean; showSelf: boolean } = {
        noHidden: false,
        showSelf: true,
    };
    if (params.noHidden) data.noHidden = params.noHidden;
    if (params.showSelf) data.showSelf = params.showSelf;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getChainId`, data));
    return response.text();
};

const getServerInfo = async (params: any) => {
    const data: { key?: [string] } = {};
    if (params.key) data.key = params.key;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getServerInfo`, data));
    return response.text();
};

const getStaking = async (params: any) => {
    const data: { account: string } = {
        account: params.account,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getStaking`, data));
    return response.text();
};

const getVotes = async (params: any) => {
    const data: { count: number } = {
        count: params.count,
    };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getVotes`, data));
    return response.text();
};

const metric = async (params: any) => {
    const data: { type: string } = {
        type: 'P2P_NETWORK',
    };
    if (params.type) data.type = params.type;

    const response = await fetch(buildUrl(`${await getApiUrl()}/metric`, data));
    return response.text();
};

const getEnterpriseConfig = async (params: any) => {
    const data: { key: string } = { key: '' };
    if (params.key) data.key = params.key;

    const response = await fetch(buildUrl(`${await getApiUrl()}/getEnterpriseConfig`, data));
    return response.text();
};

const getConfChangeProgress = async (params: any) => {
    const data: { hash: string } = { hash: params.hash };

    const response = await fetch(buildUrl(`${await getApiUrl()}/getConfChangeProgress`, data));
    return response.text();
};

const chainStat = async () => {
    const response = await fetch(`${await getApiUrl()}/chainStat`);
    return response.text();
};

const sendSignedTransaction = async (params: any, key: any) => {
    const tx: {
        from: string;
        to: string;
        amount: string;
        type: number;
        nonce: number;
        chainIdHash: string;
        payloadJson?: {
            name: string;
            args?: [any];
        };
    } = {
        from: params.from,
        to: params.to,
        amount: params.amount,
        type: params.type ? params.type : 4,
        nonce: params.nonce,
        chainIdHash: params.chainIdHash,
    };

    if (params.payloadJson) {
        tx.payloadJson = { name: params.payloadJson.name };
        if (params.payloadJson.args) tx.payloadJson.args = params.payloadJson.args;
    }

    const data = await signTx(tx, key);

    const response = await fetch(`${await getApiUrl()}/sendSignedTransaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.text();
};

interface MyModule {
    [key: string]: (params: any, key?: ec.KeyPair) => Promise<string>;
}

const myModule: MyModule = {
    setNode,
    getNode,
    getAccounts,
    getState,
    getProof,
    getNameInfo,
    getBalance,
    getBlock,
    getBlockNumber,
    getBlockBody,
    listBlockHeaders,
    getBlockMetadata,
    getTransaction,
    getTransactionReceipt,
    getBlockTransactionReceipts,
    getBlockTX,
    call,
    getPastEvents,
    getABI,
    queryContractState,
    getBlockTransactionCount,
    getChainInfo,
    getConsensusInfo,
    getAccountVotes,
    getNodeInfo,
    getChainId,
    getServerInfo,
    getStaking,
    getVotes,
    metric,
    getEnterpriseConfig,
    getConfChangeProgress,
    chainStat,
    sendSignedTransaction,
};

export default myModule;
