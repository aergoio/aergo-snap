import { useEffect, useRef } from 'react';
import { toSvg } from 'jdenticon';
import { Wrapper } from './AccountImage.style';

type Props = {
  address: string;
  size?: number;
  connected?: boolean;
};

export const AccountImageView = ({
  address,
  size = 40,
  connected,
  ...otherProps
}: Props) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const svg = toSvg(address, size);
      ref.current.innerHTML = svg || '';
    }
  }, [address, size]);

  return (
    <Wrapper
      connected={connected}
      size={size}
      {...otherProps}
      ref={ref as any}
    />
  );
};
