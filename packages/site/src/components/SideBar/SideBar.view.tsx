import { Line } from 'ui/atom/Line';
import { Dispatch, SetStateAction } from 'react';
import {
  Container,
  Wrapper,
  StyledButton,
  StyledButtonText,
} from './SideBar.style';

interface Props {
  sidebar: number;
  setSidebar: Dispatch<SetStateAction<number>>;
}

export const SideBarView = ({ sidebar, setSidebar }: Props) => {
  return (
    <Container>
      <Wrapper>
        <StyledButton
          iconLeft="user"
          backgroundTransparent
          upperCaseOnly={false}
          onClick={() => setSidebar(0)}
          textStyle={sidebar === 0 ? { fontWeight: 'bold' } : {}}
        >
          <StyledButtonText>Account Balance</StyledButtonText>
        </StyledButton>
        <StyledButton
          iconLeft="coins"
          backgroundTransparent
          upperCaseOnly={false}
          onClick={() => setSidebar(1)}
          textStyle={sidebar === 1 ? { fontWeight: 'bold' } : {}}
        >
          <StyledButtonText>Staked Balance</StyledButtonText>
        </StyledButton>
      </Wrapper>
      <Line vertical />
    </Container>
  );
};
