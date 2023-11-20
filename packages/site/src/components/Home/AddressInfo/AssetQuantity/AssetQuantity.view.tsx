import { Asset, Dollor, Wrapper } from './AssetQuantity.style';

type Props = {
  currencyValue: string;
  usdValue: string;
};

export const AssetQuantityView = ({ currencyValue, usdValue }: Props) => {
  return (
    <Wrapper>
      <Asset>{`${currencyValue} AERGO`}</Asset>
      <Dollor>{`$${usdValue} USD`}</Dollor>
    </Wrapper>
  );
};