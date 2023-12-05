import { useEffect, useRef } from 'react';
import { toSvg } from 'jdenticon';
import { CSSProperties } from 'styled-components';
import { Wrapper } from './AccountImage.style';

type Props = {
  address: string;
  size?: number;
  connected?: boolean;
  style?: CSSProperties;
};

export const AccountImageView = ({
  address,
  size = 40,
  connected,
  style,
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
      style={style}
      {...otherProps}
      ref={ref as any}
    />
  );
};
