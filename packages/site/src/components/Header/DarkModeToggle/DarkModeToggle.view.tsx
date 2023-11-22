import { useState } from 'react';
import {
  CheckedContainer,
  ToggleContainer,
  Wrapper,
  UncheckedContainer,
  ToggleCircle,
  ToggleInput,
} from './DarkModeToggle.style';

export const DarkModeToggleView = ({
  onToggle,
  defaultChecked = false,
}: {
  onToggle(): void;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    onToggle();
    setChecked(!checked);
  };

  return (
    <Wrapper onClick={handleChange}>
      <ToggleContainer>
        <CheckedContainer checked={checked}>
          <span>🌞</span>
        </CheckedContainer>
        <UncheckedContainer checked={checked}>
          <span>🌜</span>
        </UncheckedContainer>
      </ToggleContainer>
      <ToggleCircle checked={checked} />
      <ToggleInput type="checkbox" aria-label="Toggle Button" />
    </Wrapper>
  );
};
