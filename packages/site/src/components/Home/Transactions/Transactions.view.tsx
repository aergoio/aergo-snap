import { Button } from 'ui/atom/Button';
import { useState } from 'react';
import { PopIn } from 'ui/molecule';
import { Send, Receive } from 'assets/images';
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
          customIconLeft={<Receive />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setReceiveModal(true)}
        >
          Receive
        </Button>
        <Button
          customIconLeft={<Send />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setSendModal(true)}
        >
          Send
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
