import { Wrapper } from './Line.style';

type Props = {
  vertical?: boolean;
};

export const LineView = ({ vertical }: Props) => {
  return <Wrapper vertical={vertical}></Wrapper>;
};
