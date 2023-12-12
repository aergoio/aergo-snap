import { useAppSelector } from 'hooks/redux';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { Home } from 'pages/Home';
import { Button } from 'ui/atom/Button';

const Index = () => {
  const {
    setNode,
    getNode,
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
    sendTransaction,
  } = useAergoSnap();
  const { address } = useAppSelector((state) => state.wallet);

  return [
    <Home />,
    <Button
      onClick={async () => {
        await setNode('http://localhost');
      }}
    >
      SetNode
    </Button>,
    <Button
      onClick={async () => {
        await getNode();
      }}
    >
      getNode
    </Button>,
    <Button
      onClick={async () => {
        await getState(address);
      }}
    >
      getState
    </Button>,
    <Button
      onClick={async () => {
        await getProof(address);
      }}
    >
      getProof
    </Button>,
    <Button
      onClick={async () => {
        await getNameInfo('Test', 1);
      }}
    >
      getNameInfo
    </Button>,
    <Button
      onClick={async () => {
        await getBalance(address);
      }}
    >
      getBalance
    </Button>,
    <Button
      onClick={async () => {
        // await getBlock(2);
        await getBlock('84EcgDhwvvVE8S16neT2GgS5HbucHXSDRbf9596gEt9T');
      }}
    >
      getBlock
    </Button>,
    <Button
      onClick={async () => {
        await getBlockNumber();
      }}
    >
      getBlockNumber
    </Button>,
    <Button
      onClick={async () => {
        await getBlockBody(2);
      }}
    >
      getBlockBody
    </Button>,
    <Button
      onClick={async () => {
        await listBlockHeaders(2);
      }}
    >
      listBlockHeaders
    </Button>,

    <Button
      onClick={async () => {
        await getBlockMetadata(2);
      }}
    >
      getBlockMetadata
    </Button>,

    <Button
      onClick={async () => {
        await getTransaction('4Gwycs7PxnJC6xG8HkuaT1Xd4bfk1fEV7Rer6mc28Ypx');
      }}
    >
      getTransaction
    </Button>,
    <Button
      onClick={async () => {
        await getTransactionReceipt(
          '4Gwycs7PxnJC6xG8HkuaT1Xd4bfk1fEV7Rer6mc28Ypx',
        );
      }}
    >
      getTransactionReceipt
    </Button>,
    <Button
      onClick={async () => {
        await getBlockTransactionReceipts(13371);
      }}
    >
      getBlockTransactionReceipts
    </Button>,
    <Button
      onClick={async () => {
        await getBlockTX('4Gwycs7PxnJC6xG8HkuaT1Xd4bfk1fEV7Rer6mc28Ypx');
      }}
    >
      getBlockTX
    </Button>,
    <Button
      onClick={async () => {
        await call(
          'AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC',
          'get_value',
          ['name'],
        );
      }}
    >
      call
    </Button>,
    <Button
      onClick={async () => {
        await getPastEvents(
          'AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC',
          'save',
          '',
          5000,
        );

        // await getPastEvents(
        //   'AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC',
        //   'save',
        //   '',
        //   { blockfrom: 100, blockto: 200 },
        // );
      }}
    >
      getPastEvents
    </Button>,
    <Button
      onClick={async () => {
        await getABI('AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC');
      }}
    >
      getABI
    </Button>,
    <Button
      onClick={async () => {
        await queryContractState(
          'AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC',
        );
      }}
    >
      queryContractState
    </Button>,
    <Button
      onClick={async () => {
        // await getBlockTransactionCount(108);
        await getBlockTransactionCount(
          '9KF1hV3wpqwNdQJiijY6fuV1heQwUwD9JxqhTn9PjCAg',
        );
      }}
    >
      getBlockTransactionCount
    </Button>,
    <Button
      onClick={async () => {
        await getChainInfo();
      }}
    >
      getChainInfo
    </Button>,
    <Button
      onClick={async () => {
        await getConsensusInfo();
      }}
    >
      getConsensusInfo
    </Button>,
    <Button
      onClick={async () => {
        await getAccountVotes(address);
      }}
    >
      getAccountVotes
    </Button>,
    <Button
      onClick={async () => {
        await getNodeInfo();
      }}
    >
      getNodeInfo
    </Button>,
    <Button
      onClick={async () => {
        await getChainId();
      }}
    >
      getChainId
    </Button>,
    <Button
      onClick={async () => {
        await getServerInfo();
      }}
    >
      getServerInfo
    </Button>,
    <Button
      onClick={async () => {
        await getStaking(address);
      }}
    >
      getStaking
    </Button>,
    <Button
      onClick={async () => {
        await getVotes(1);
      }}
    >
      getVotes
    </Button>,
    <Button
      onClick={async () => {
        await metric('P2P_NETWORK');
      }}
    >
      metric
    </Button>,
    <Button
      onClick={async () => {
        await getEnterpriseConfig('abc');
      }}
    >
      getEnterpriseConfig
    </Button>,
    <Button
      onClick={async () => {
        await getConfChangeProgress(
          'AmgrETRB2CBX6m1hLbLZtgfQaS4ADWvFjP7LGcs7su9kUXVpjmVC',
        );
      }}
    >
      getConfChangeProgress
    </Button>,
    <Button
      onClick={async () => {
        await chainStat();
      }}
    >
      chainStat
    </Button>,
    <Button onClick={sendTransaction}>sendTransaction</Button>,
  ];
};

export default Index;
