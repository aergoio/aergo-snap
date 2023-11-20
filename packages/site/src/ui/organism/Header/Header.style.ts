import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderWrapper = styled.header`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  place-items: center;
  padding: 2.4rem;
  margin-right: ${({ theme }) => theme.spacing.large3};
  /* box-shadow: ${({ theme }) => theme.shadows.default}; */
`;

export const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  white-space: nowrap;
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  cursor: default;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AccountWrapper = styled.div`
  width: 80%;
  text-align: center;
`;

export const AccountName = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
`;

export const NetworkWrapper = styled.div`
  /* margin-left: 1.5rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NetworkName = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
`;

export const StyledFaChevronDown = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
  path {
    fill: ${(props) => props.theme.colors.icon.default};
  }
`;

export const StyledFaEllipsisV = styled(FontAwesomeIcon)`
  cursor: pointer;
  padding: 1rem;
  width: 2rem;
  border-radius: 50%;
  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
  path {
    fill: ${(props) => props.theme.colors.icon.default};
  }
`;
