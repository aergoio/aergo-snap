import { useAppSelector } from 'hooks/redux';
import { ListWrapper, Wrapper } from './TransactionHistory.style';
import { TransactionHistoryItem } from './TransactionHistoryItem';

export const TransactionHistoryView = () => {
  const { loader } = useAppSelector((state) => state.UI);
  const { transactions } = useAppSelector((state) => state.wallet);

  return (
    <Wrapper>
      {!loader.isLoading &&
        (transactions.length > 0 ? (
          <ListWrapper
            data={transactions}
            render={(transaction: any) => (
              <TransactionHistoryItem transaction={transaction} />
            )}
            keyExtractor={(transaction: any) => transaction.hash.toString()}
          />
        ) : (
          <span>No Transactions</span>
        ))}
    </Wrapper>
  );
};
