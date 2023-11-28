import styled from 'styled-components';
import { List } from 'ui/molecule';

export const Wrapper = styled.div`
  min-height: 44vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const ListWrapper = styled(List)`
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  width: 100%;
`;
