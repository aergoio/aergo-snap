import { Dispatch, SetStateAction, useState } from 'react';
import { AccountImage } from '../AccountImage';
import { Wrapper, Label, InputWrapper, Input } from './InputWithLabel.style';

interface Props {
  disabled?: boolean;
  type?: string;
  label?: string;
  address?: string;
  placeholder?: string;
  value: string | number;
  setValue?: Dispatch<SetStateAction<string>>;
}

export const InputWithLabelView = ({
  disabled = false,
  type = 'text',
  label,
  address,
  placeholder,
  value,
  setValue,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputWrapper isFocused={isFocused} disabled={disabled}>
        {address ? (
          <AccountImage
            size={36}
            address={address}
            style={{ marginLeft: '8px' }}
          />
        ) : null}
        <Input
          disabled={disabled}
          address={address || ''}
          type={type}
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
        />
      </InputWrapper>
    </Wrapper>
  );
};
