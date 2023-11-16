import { Button } from 'ui/atom/Button';
import { useState } from 'react';
import { PopIn } from 'ui/molecule';
import { Wrapper, ButtonWrapper } from './Transactions.style';

export const TransactionsView = () => {
  const [receiveModal, setReceiveModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);

  return (
    <Wrapper>
      <PopIn isOpen={receiveModal} setIsOpen={setReceiveModal}>
        <div>receiveModal</div>
      </PopIn>
      <PopIn isOpen={sendModal} setIsOpen={setSendModal}>
        <div>sendModal</div>
      </PopIn>
      <ButtonWrapper>
        <Button
          variant="primary-outline"
          spacing="xlarge"
          onClick={() => setReceiveModal(true)}
        >
          Receive
        </Button>
        <Button
          variant="primary"
          spacing="xlarge"
          onClick={() => setSendModal(true)}
        >
          Send
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
