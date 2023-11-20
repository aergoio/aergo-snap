import { Button } from 'ui/atom/Button';
import styled from 'styled-components';

export const Wrapper = styled(Button).attrs((props) => ({
  fontSize: props.theme.fontSizes.small,
  upperCaseOnly: false,
  iconStyle: {
    fontSize: props.theme.fontSizes.xxsmall,
    color: props.theme.colors.primary.light,
  },
}))`
  padding: 0px ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.primary.dark};
  color: ${(props) => props.theme.colors.primary.main};
  border-radius: 24px;
`;
