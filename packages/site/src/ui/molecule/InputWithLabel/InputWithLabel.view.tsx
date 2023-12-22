import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState
} from 'react';
import { AccountImage } from '../../atom/AccountImage';
import { Wrapper, Label, InputWrapper, Input } from './InputWithLabel.style';
import { CSSProperties } from 'styled-components';

interface Props {
  style?: CSSProperties;
  disabled?: boolean;
  type?: string;
  label?: string;
  labelButton?: ReactNode;
  address?: string;
  placeholder?: string;
  value: string | number;
  leftIcon?: ReactNode;
  setValue?: Dispatch<SetStateAction<string>>;
  width?: string;
  align?: string;
  children?: ReactNode;
}

export const InputWithLabelView = ({
  style,
  disabled = false,
  type = 'text',
  label,
  labelButton,
  address,
  placeholder,
  leftIcon,
  value,
  setValue,
  width,
  align = 'flex-start',
  children
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper align={align}>
      <Label>
        {label}
        {labelButton}
      </Label>
      <InputWrapper
        style={style}
        isFocused={isFocused}
        disabled={disabled}
        width={width || ''}
      >
        {address ? (
          <AccountImage
            size={36}
            address={address}
            style={{ marginLeft: '8px' }}
          />
        ) : null}
        {leftIcon}
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
        {children}
      </InputWrapper>
    </Wrapper>
  );
};
