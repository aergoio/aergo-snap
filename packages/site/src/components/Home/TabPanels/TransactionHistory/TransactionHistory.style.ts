import styled from 'styled-components';
import { List } from 'ui/molecule';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ListWrapper = styled(List)`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  width: 100%;
`;

export const NoTransactions = styled.span`
  color: ${({ theme }) => theme.colors.grey.grey3};
  margin-top: ${({ theme }) => theme.spacing.large};
`;
