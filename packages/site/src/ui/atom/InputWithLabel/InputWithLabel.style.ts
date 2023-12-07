import styled from 'styled-components';

interface InputWrapperProps {
  isFocused: boolean;
  disabled: boolean;
}

interface InputProps {
  address: string;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  color: ${(props) => props.theme.colors.grey.grey6};
  font-size: smaller;
  font-weight: 700;
  margin-top: ${(props) => props.theme.spacing.xsmall};
  margin-bottom: ${(props) => props.theme.spacing.xsmall};
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 0.1s, -webkit-box-shadow 0.1s;
  border: 2px solid transparent;
  border-radius: ${(props) => props.theme.radii.rect};

  background-image: ${(props) =>
    props.isFocused
      ? `linear-gradient(${props.theme.colors.background.default}, ${props.theme.colors.background.default}), linear-gradient(to right, #279ecc, #a13e99)`
      : `linear-gradient(${props.theme.colors.background.default}, ${props.theme.colors.background.default}), linear-gradient(to right, #9c9a9a, #9c9a9a)`};

  background-origin: border-box;
  background-clip: content-box, border-box;

  background: ${(props) =>
    props.disabled ? props.theme.colors.background.alternative : ''};
`;

export const Input = styled.input<InputProps>`
  border: 0;
  flex: 1;
  padding: ${(props) => (props.address ? '8px' : '12px')};
  outline: none;
  background-color: transparent;
  width: 100px;
  line-height: 1;
  color: ${(props) => props.theme.colors.grey.grey8};
`;
