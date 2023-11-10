import { Placement } from 'theme/types';
import { shortenAddress } from 'utils/utils';
import { PopperTooltip } from '../PopperTooltip';
import { Wrapper } from './AccountAddressCopyButton.style';

type Props = {
  address: string;
  full?: boolean;
  placement?: Placement;
};

export const AccountAddressCopyButtonView = ({
  address,
  full,
  placement,
}: Props) => {
  const handleAddressClick = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <>
      <PopperTooltip
        content="Copied!"
        closeTrigger="timeout"
        placement={placement}
      >
        <Wrapper onClick={handleAddressClick} iconRight="clone">
          {full ? address : shortenAddress(address, 10)}
        </Wrapper>
      </PopperTooltip>
    </>
  );
};
