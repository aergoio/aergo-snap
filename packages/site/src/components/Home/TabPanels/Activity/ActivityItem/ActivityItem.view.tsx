import { Transaction } from 'types';
import { useAppSelector } from 'hooks/redux';
import { shortenAddress } from 'utils/utils';
import { Card } from 'ui/molecule';
import {
  Container,
  StyledLine,
  Content,
  Row,
  Time,
  Status,
  Amount,
  FromToStatus,
  Symbol,
  Txid,
  Type
} from './ActivityItem.style';
import { formatTokenAmount } from 'utils/utils';

type Props = {
  transaction: Transaction;
};
export const ActivityItemView = ({ transaction }: Props) => {
  const { address } = useAppSelector((state) => state.wallet);
  const { selectedToken } = useAppSelector((state) => state.UI);
  const time = `${transaction.meta.ts.split('.')[0].replace('T', ' ')}`;
  const status =
    selectedToken === 'AERGO'
      ? transaction.meta.status
      : transaction?.receipt?.meta.status;
  const fromToStatus = transaction.meta.from === address ? 'SENT' : 'RECEIVED';
  const amountStatus = transaction.meta.from !== address ? '+' : '-';
  const decimals =
    selectedToken === 'AERGO' ? 18 : transaction.token.meta.decimals;
  const symbol =
    selectedToken === 'AERGO' ? 'AERGO' : transaction.token.meta.symbol;
  const txId = `TX_ID: ${shortenAddress(transaction.hash)}`;
  const category = transaction.meta.category
    ? `TYPE: ${transaction.meta.category.toUpperCase()}`
    : null;

  return (
    <Container>
      <Card
        style={{ padding: '1.5rem' }}
        content={{
          description: (
            <Content key={transaction.hash}>
              <Row>
                <Time>{time}</Time>
                <Status status={status || 'PENDING'}>{status}</Status>
              </Row>
              <Row>
                <FromToStatus fromToStatus={fromToStatus}>
                  {`${fromToStatus}`}
                </FromToStatus>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <Amount status={amountStatus}>
                    {`${amountStatus} ${formatTokenAmount(
                      transaction.meta.amount,
                      '',
                      decimals
                    )} `}
                  </Amount>
                  <Symbol>{symbol}</Symbol>
                </span>
              </Row>
              <StyledLine />
              <Row style={{ marginTop: '0.6rem' }}>
                <Txid>{txId}</Txid>
                <Type>{category}</Type>
              </Row>
            </Content>
          )
        }}
      />
    </Container>
  );
};
