import { scanApi } from 'apis/scanApi';
import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { Transaction } from 'types';

export const ActivitiesView = () => {
  const [transactions, setTransactions] = useState([]);
  const { address } = useAppSelector((state) => state.wallet);
  const network = useAppSelector((state) => state.networks);
  useEffect(() => {
    const getTransactions = async () => {
      const scanApiInstance = await scanApi(
        network.items[network.activeNetwork],
      );
      if (scanApiInstance && address) {
        try {
          const transactionsData = (
            await scanApiInstance.get(
              `transactions/?q=(from:${address} OR to:${address})&size=10000&sort=ts:desc`,
            )
          ).data.hits;
          setTransactions(transactionsData);
          console.log(transactions, 'transactions');
        } catch (err) {
          console.error(err);
        }
      }
    };
    getTransactions();
  }, []);
  return (
    <>
      {transactions.map((transaction: Transaction) => (
        <ul>
          <li>{`amount_float: ${transaction.meta.amount_float}`}</li>
          <li>{`category: ${transaction.meta.category}`}</li>
          <li>{`hash: ${transaction.hash}`}</li>
          <li>{`status: ${transaction.meta.status}`}</li>
          <li>{`from: ${transaction.meta.from}`}</li>
          <li>{`to: ${transaction.meta.to}`}</li>
          <li>{`ts: ${transaction.meta.ts}`}</li>
        </ul>
      ))}
    </>
  );
};
