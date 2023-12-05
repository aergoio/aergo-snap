import { Tabs } from 'ui/molecule';
import { Wrapper } from './ImportAssetModal.style';
import { Custom } from './Custom';
import { Search } from './Search';

export const ImportAssetModalView = () => {
  return (
    <Wrapper>
      <Tabs
        style={{ width: '30rem' }}
        tabs={['Search', 'Custom']}
        panels={[<Search />, <Custom />]}
      />
    </Wrapper>
  );
};
