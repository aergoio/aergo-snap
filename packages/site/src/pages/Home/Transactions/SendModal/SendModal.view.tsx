import { InputWithLabel } from 'ui/atom/InputWithLabel';
import { Wrapper } from './SendModal.style';
import { useState } from 'react';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { useAppSelector } from 'hooks/redux';

export const SendModalView = () => {
  const { address } = useAppSelector((state) => state.wallet);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const { sendTransaction } = useAergoSnap();

  return (
    <Wrapper>
      <InputWithLabel label="Amount" value={amount} setValue={setAmount} />
      <InputWithLabel label="Send To" value={to} setValue={setTo} />
      <span
        onClick={() =>
          sendTransaction(address, `${amount}000000000000000000`, to)
        }
      >
        button
      </span>
    </Wrapper>
  );
};
