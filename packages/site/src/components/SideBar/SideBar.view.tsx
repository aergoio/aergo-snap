import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setSidebar } from 'slices/UISlice';
import { Wrapper, StyledButton, StyledButtonText } from './SideBar.style';

export const SideBarView = () => {
  const { sidebar } = useAppSelector((state) => state.UI);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <StyledButton
        iconLeft="user"
        backgroundTransparent
        upperCaseOnly={false}
        onClick={() => dispatch(setSidebar(0))}
        textStyle={sidebar === 0 ? { fontWeight: 'bold' } : {}}
      >
        <StyledButtonText>Account Balance</StyledButtonText>
      </StyledButton>
      <StyledButton
        iconLeft="coins"
        backgroundTransparent
        upperCaseOnly={false}
        onClick={() => dispatch(setSidebar(1))}
        textStyle={sidebar === 1 ? { fontWeight: 'bold' } : {}}
      >
        <StyledButtonText>Staked Balance</StyledButtonText>
      </StyledButton>
      <StyledButton
        iconLeft="money-bill-trend-up"
        backgroundTransparent
        upperCaseOnly={false}
        onClick={() => dispatch(setSidebar(2))}
        textStyle={sidebar === 2 ? { fontWeight: 'bold' } : {}}
      >
        <StyledButtonText>Voting Power</StyledButtonText>
      </StyledButton>
    </Wrapper>
  );
};
