import { InputWithLabel } from 'ui/molecule/InputWithLabel';
import { Wrapper, TokenType, Usd, StyledMax } from './SendModal.style';
import { useState } from 'react';
import { useAergoSnap } from 'hooks/useAergoSnap';
import { useAppSelector } from 'hooks/redux';
import { Button } from 'ui/atom/Button';
import { DefaultAergo } from 'assets/images';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { formatTokenAmount } from 'utils/utils';

export const SendModalView = () => {
  const { address, accountBalance } = useAppSelector((state) => state.wallet);
  const { selectedToken, tokenType } = useAppSelector((state) => state.UI);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const { sendTransaction } = useAergoSnap();

  const amountWithDecimals = (amount:string,decimals:number) => {
    return +amount * Math.pow(10,decimals);
  }

  const payload = {
    name: 'transfer',
    // args: [`${to}`, `${amountWithDecimals(amount, selectedToken.)}`, ``]
  };
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
  console.log(balance, 'balance');
  const tokenTypeFormat = () => {
    if (tokenType === 'ARC1') {
      if (selectedToken === 'AERGO') {
        return '';
      } else {
        return 'ARC1';
      }
    } else if (tokenType === 'ARC2') {
      return 'ARC2';
    } else {
      return '';
    }
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
            <Usd> {amount} ≈ USD</Usd>
          </div>
        </InputWithLabel>
        <InputWithLabel disabled value={+balance - +amount} />
      </div>
      <Button
        onClick={() =>
          selectedToken === 'AERGO'
            ? sendTransaction(address, to, `${amount}000000000000000000`, 4)
            : sendTransaction(address, selectedToken.hash, `0`, 5, payload)
        }
      >
        Send
      </Button>
    </Wrapper>
  );
};
