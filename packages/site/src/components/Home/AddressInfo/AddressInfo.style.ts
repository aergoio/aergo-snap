import styled from 'styled-components';
import { AccountImage } from 'ui/atom/AccountImage';
import { Button } from 'ui/atom/Button';
import { Card } from 'ui/molecule';

export const Container = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.large2};

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAccountImage = styled(AccountImage)`
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const AssetWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  width: 40rem;
`;

export const StyledButton = styled(Button)`
  display: none;
  @media screen and (max-width: 650px) {
    border: none;
    display: inline-block;
    color: ${(props) => props.theme.colors.grey.grey6};
  }
`;
