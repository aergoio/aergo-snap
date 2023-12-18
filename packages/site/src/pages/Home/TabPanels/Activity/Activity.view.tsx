import { useAppSelector } from 'hooks/redux';
import { ListWrapper, Wrapper, NoActivity } from './Activity.style';
import { ActivityItem } from './ActivityItem';

export const ActivityView = () => {
  const { loader } = useAppSelector((state) => state.UI);
  const { transactions } = useAppSelector((state) => state.wallet);

  return (
    <Wrapper>
      {!loader.isLoading &&
        (transactions.length > 0 ? (
          <ListWrapper
            data={transactions}
            render={(transaction: any) => (
              <ActivityItem transaction={transaction} />
            )}
            keyExtractor={(transaction: any) => transaction.hash.toString()}
          />
        ) : (
          <NoActivity>No Transactions</NoActivity>
        ))}
    </Wrapper>
  );
};
