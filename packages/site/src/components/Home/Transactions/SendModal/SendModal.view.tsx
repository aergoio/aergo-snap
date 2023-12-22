import { InputWithLabel } from 'ui/molecule/InputWithLabel';
import { Wrapper, TokenType, Usd, StyledMax } from './SendModal.style';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAergoSnap } from 'apis/useAergoSnap';
import { useAppSelector } from 'hooks/redux';
import { Button } from 'ui/atom/Button';
import { DefaultAergo } from 'assets/images';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { amountWithDecimals, formatTokenAmount } from 'utils/utils';

interface Props {
  setSendModal: Dispatch<SetStateAction<boolean>>;
  setHash: Dispatch<SetStateAction<string>>;
}

export const SendModalView = ({ setSendModal, setHash }: Props) => {
  const { address, accountBalance } = useAppSelector((state) => state.wallet);
  const { selectedToken, tokenType } = useAppSelector((state) => state.UI);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const { sendTransaction } = useAergoSnap();

  const leftIcon = () => {
    if (selectedToken === 'AERGO') {
      return (
        <div style={{ marginLeft: '1rem' }}>
          <AergoSnapLogo size={30} color={''} />
        </div>
      );
    } else {
      if (selectedToken.meta.image_url) {
        return (
          <img
            src={selectedToken.meta.image_url}
            alt="토큰 아이콘"
            width={30}
          />
        );
      } else {
        return <DefaultAergo width={36} />;
      }
    }
  };

  const handleClickSendTx = async () => {
    if (selectedToken === 'AERGO') {
      const results = await sendTransaction({
        from: address,
        to,
        amount: `${amount}000000000000000000`,
        type: 4
      });
      console.log(results, 'results');
      if (results.length > 0) {
        const hash = results[0].hash;
        setSendModal(false);
        setHash(hash);
      }
    } else {
      const results = await sendTransaction({
        from: address,
        to: selectedToken.hash,
        amount: `0`,
        type: 5,
        payloadJson: {
          name: 'transfer',
          args: [
            `${to}`,
            `${amountWithDecimals(amount, selectedToken.meta.decimals)}`,
            ``
          ]
        }
      });

      if (results.length > 0) {
        console.log(results, results);
      }
    }
  };

  const asset: string =
    selectedToken !== 'AERGO' ? selectedToken.meta.name : 'AERGO';
  const balance: string =
    selectedToken === 'AERGO'
      ? formatTokenAmount(accountBalance, '', 18)
      : formatTokenAmount(
          selectedToken.tokenBalance.meta.balance,
          '',
          selectedToken.meta.decimals
        );

  const tokenTypeFormat = () => {
    if (selectedToken === 'AERGO') {
      return '';
    }

    if (tokenType === 'ARC1' || tokenType === 'ARC2') {
      return tokenType;
    }

    return '';
  };

  const handleClickMax = () => {
    setAmount(balance);
  };

  return (
    <Wrapper>
      <div style={{ height: '350px' }}>
        <InputWithLabel
          label="Asset"
          disabled
          leftIcon={leftIcon()}
          value={asset}
        >
          <TokenType>{tokenTypeFormat()}</TokenType>
        </InputWithLabel>
        <InputWithLabel label="Send To" value={to} setValue={setTo} />
        <InputWithLabel
          label="Amount"
          labelButton={<StyledMax onClick={handleClickMax}>MAX</StyledMax>}
          value={amount}
          setValue={setAmount}
        >
          <div style={{ display: 'flex', marginRight: '1rem' }}>
            <Usd>≈ {amount} USD</Usd>
          </div>
        </InputWithLabel>
        <InputWithLabel disabled value={+balance - +amount} />
      </div>
      <Button onClick={handleClickSendTx}>Send</Button>
    </Wrapper>
  );
};
