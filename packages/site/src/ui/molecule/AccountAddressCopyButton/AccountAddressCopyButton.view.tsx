import { Placement } from 'theme/types';
import { shortenAddress } from 'utils/utils';
import { useEffect, useState } from 'react';
import { POPOVER_DURATION } from 'utils/constants';
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
  placement
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleAddressClick = (address: string) => {
    console.log(address, 'copied address');
    navigator.clipboard.writeText(address);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, POPOVER_DURATION);
    }
  }, [isCopied]);

  return (
    <>
      <PopperTooltip
        content="Copied!"
        closeTrigger="timeout"
        offSet={[0, 0]}
        placement={placement}
      >
        <PopperTooltip
          content={address}
          closeTrigger="hover"
          contentStyle={isCopied ? { display: 'none' } : {}}
          offSet={[0, 0]}
          placement={placement}
        >
          <Wrapper
            onClick={() => handleAddressClick(address)}
            iconRight="clone"
          >
            {full ? address : shortenAddress(address, 10)}
          </Wrapper>
        </PopperTooltip>
      </PopperTooltip>
    </>
  );
};
