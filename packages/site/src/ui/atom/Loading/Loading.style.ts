import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background.default};
  color: ${(props) => props.theme.colors.text.default};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.tiny};
`;

export const LoadingSpinner = styled(FontAwesomeIcon)``;
