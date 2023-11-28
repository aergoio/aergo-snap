import { Wrapper } from './Line.style';

type Props = {
  width?: string;
};

export const LineView = ({ width }: Props) => {
  return <Wrapper style={{ width }}></Wrapper>;
};
