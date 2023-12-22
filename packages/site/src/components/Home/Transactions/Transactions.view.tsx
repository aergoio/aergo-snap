import { useEffect, useState } from 'react';
import { PopIn } from 'ui/molecule';
import { SendSvg, ReceiveSvg } from 'assets/images';
import { Wrapper, ButtonWrapper, StyledButton } from './Transactions.style';
import { SendModal } from './SendModal';

export const TransactionsView = () => {
  const [receiveModal, setReceiveModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        setHash('');
      }, 3000);
    }
  }, [hash]);

  return (
    <Wrapper>
      <PopIn isOpen={receiveModal} setIsOpen={setReceiveModal}>
        <div>receiveModal</div>
      </PopIn>
      <PopIn isOpen={sendModal} setIsOpen={setSendModal}>
        <SendModal setSendModal={setSendModal} setHash={setHash} />
      </PopIn>
      {hash}
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
      </ButtonWrapper>
    </Wrapper>
  );
};
