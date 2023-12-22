import { Tabs } from 'ui/molecule';
import { Wrapper } from './ImportAssetModal.style';
import { Custom } from './Custom';
import { Search } from './Search';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ImportAssetModalView = ({ setIsOpen }: Props) => {
  return (
    <Wrapper>
      <Tabs
        style={{ width: '30rem' }}
        tabs={['Search', 'Custom']}
        panels={[
          <Search setIsOpen={setIsOpen} />,
          <Custom setIsOpen={setIsOpen} />
        ]}
      />
    </Wrapper>
  );
};
