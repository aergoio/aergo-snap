import { Button } from 'ui/atom/Button';
import { useState } from 'react';
import { PopIn } from 'ui/molecule';
import { SendSvg, ReceiveSvg } from 'assets/images';
import { Wrapper, ButtonWrapper } from './Transactions.style';
import { ReconnectButton } from 'components/Buttons';
import { useAergoSnap } from 'hooks/useAergoSnap';

export const TransactionsView = () => {
  const [receiveModal, setReceiveModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const { connectToSnap } = useAergoSnap()

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
          customIconLeft={<ReceiveSvg />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setReceiveModal(true)}
        >
          Receive
        </Button>
        <Button
          customIconLeft={<SendSvg />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setSendModal(true)}
        >
          Send
        </Button>
        <ReconnectButton onClick={connectToSnap}/>
      </ButtonWrapper>
    </Wrapper>
  );
};
