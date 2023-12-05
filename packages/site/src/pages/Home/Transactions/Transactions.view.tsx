import { useState } from 'react';
import { PopIn } from 'ui/molecule';
import { SendSvg, ReceiveSvg } from 'assets/images';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { Wrapper, ButtonWrapper, StyledButton } from './Transactions.style';

export const TransactionsView = () => {
  const [receiveModal, setReceiveModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const { connectToSnap } = useAergoSnap();

  return (
    <Wrapper>
      <PopIn isOpen={receiveModal} setIsOpen={setReceiveModal}>
        <div>receiveModal</div>
      </PopIn>
      <PopIn isOpen={sendModal} setIsOpen={setSendModal}>
        <div>sendModal</div>
      </PopIn>
      <ButtonWrapper>
        <StyledButton
          customIconLeft={<ReceiveSvg />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setReceiveModal(true)}
        >
          Receive
        </StyledButton>
        <StyledButton
          customIconLeft={<SendSvg />}
          variant="font-gradation"
          spacing="xlarge"
          onClick={() => setSendModal(true)}
        >
          Send
        </StyledButton>
        <StyledButton
          variant="gradation"
          spacing="xlarge"
          onClick={connectToSnap}
        >
          Reconnect
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
};
