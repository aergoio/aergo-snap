import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Wrapper, StyledButton } from './SideBar.style';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  type: string;
  buttons: { text: string; icon: IconName }[];
  sidebar: { text: string; icon: IconName };
  setSidebar: Dispatch<SetStateAction<{ text: string; icon: IconName }>>;
}

export const SideBarView = ({ type, buttons, sidebar, setSidebar }: Props) => {
  return (
    <Wrapper type={type}>
      {buttons?.map((button: any) => (
        <StyledButton
          iconLeft={button.icon}
          backgroundTransparent
          upperCaseOnly={false}
          onClick={() => setSidebar(button)}
          textStyle={sidebar.text === button.text ? { fontWeight: 'bold' } : {}}
        >
          <span>{button.text}</span>
        </StyledButton>
      ))}
    </Wrapper>
  );
};
