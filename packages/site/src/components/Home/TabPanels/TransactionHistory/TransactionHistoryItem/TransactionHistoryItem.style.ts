import styled from 'styled-components';
import { Line } from 'ui/atom/Line';
import { Card } from 'ui/molecule';

interface StatusProps {
  status: string;
}
interface FromToProps {
  fromToStatus: string;
}
interface AmountProps {
  status: string;
}

export const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  cursor: pointer;
  transition: transform 0.3s;
  :hover {
    transform: scale(1.01);
  }
`;

export const StyledCard = styled(Card)``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 72vw;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.grey.grey4};
  font-weight: 400;
  font-size: 14px;
`;

export const Status = styled.span<StatusProps>`
  cursor: pointer;
  font-weight: 600;
  padding: 0.3rem 1.3rem;
  color: #fff;
  background-color: ${(props) =>
    props.status === 'SUCCESS'
      ? props.theme.colors.success.main
      : props.theme.colors.error.main};
  border-radius: 24px;
  :hover {
    opacity: 0.75;
  }
  :active {
    opacity: 0.5;
  }
`;

export const FromToStatus = styled.span<FromToProps>`
  font-size: large;
  font-weight: 600;
  color: ${(props) =>
    props.fromToStatus === 'RECEIVED'
      ? props.theme.colors.primary.main
      : props.theme.colors.secondary.main};
`;

export const Amount = styled.span<AmountProps>`
  font-size: large;
  font-weight: 600;
  color: ${(props) =>
    props.status === '+'
      ? props.theme.colors.primary.main
      : props.theme.colors.grey.grey6};
`;

export const Symbol = styled.span`
  font-weight: 500;
`;

export const StyledLine = styled(Line)`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Txid = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.grey.grey6};
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
  :active {
    opacity: 0.5;
  }
`;

export const Type = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.grey.grey6};
`;
