import { Transaction } from 'types';
import { useAppSelector } from 'hooks/redux';
import { shortenAddress } from 'utils/utils';
import {
  Container,
  StyledCard,
  StyledLine,
  Content,
  Row,
  Time,
  Status,
  Amount,
  FromToStatus,
  Symbol,
  Txid,
  Type,
} from './TransactionHistoryItem.style';

type Props = {
  transaction: Transaction;
};
export const TransactionHistoryItemView = ({ transaction }: Props) => {
  const { address } = useAppSelector((state) => state.wallet);
  return (
    <Container>
      <StyledCard
        content={{
          description: (
            <Content key={transaction.hash}>
              <Row>
                <Time>{`${transaction.meta.ts
                  .split('.')[0]
                  .replace('T', ' ')}`}</Time>
                <Status
                  status={transaction.meta.status}
                >{`${transaction.meta.status}`}</Status>
              </Row>
              <Row>
                <FromToStatus
                  fromToStatus={
                    transaction.meta.from === address ? 'SENT' : 'RECEIVED'
                  }
                >
                  {`${transaction.meta.from === address ? 'SENT' : 'RECEIVED'}`}
                </FromToStatus>
                <span>
                  <Amount
                    status={transaction.meta.from !== address ? '+' : '-'}
                  >
                    {`${transaction.meta.from !== address ? '+' : '-'} ${
                      transaction.meta.amount_float
                    } `}
                  </Amount>
                  <Symbol>AERGO</Symbol>
                </span>
              </Row>
              <StyledLine />
              <Row style={{ marginTop: '0.6rem' }}>
                <Txid>{`TX_ID: ${shortenAddress(transaction.hash)}`}</Txid>
                <Type>{`TYPE: ${transaction.meta.category.toUpperCase()}`}</Type>
              </Row>
            </Content>
          ),
        }}
      />
    </Container>
  );
};
