import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderWrapper = styled.header`
  background: ${(props) => props.theme.colors.background.default};
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  padding: 2.4rem 0;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100vw;
  }
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
  margin-right: ${(props) => props.theme.spacing.large};
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

export const MenuSection = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
`;

export const Right = styled.div`
  margin-right: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.small} {
    margin-right: 1rem;
  }
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

export const StyledFaChevron = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
  width: 1.2rem;
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
