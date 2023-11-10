import { Button } from 'components/ui/atom/Button';
import styled from 'styled-components';

export const Wrapper = styled(Button).attrs((props) => ({
  fontSize: props.theme.fontSizes.small,
  upperCaseOnly: false,
  textStyle: {
    fontWeight: props.theme.fontWeights[300],
  },
  iconStyle: {
    fontSize: props.theme.fontSizes.xxsmall,
    color: props.theme.colors.primary[2],
  },
}))`
  padding: 0px 1rem;
  background-color: ${(props) => props.theme.colors.primary[3]};
  color: ${(props) => props.theme.colors.primary[1]};
  border-radius: 24px;

  :hover {
    background-color: ${(props) => props.theme.colors.primary[1]};
    color: ${(props) => props.theme.colors.grey.white};
    border: none;
  }
`;
