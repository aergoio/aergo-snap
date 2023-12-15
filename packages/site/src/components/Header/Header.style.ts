import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderWrapper = styled.header`
  background: ${(props) => props.theme.colors.background.default};
  position: relative;
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin: 0 2rem; */
  margin-left: 3rem;
  ${({ theme }) => theme.mediaQueries.small} {
    margin-left: 2rem;
  }
  /* @media (max-width: 400px) {
    display: none;
  } */
`;

export const AccountWrapper = styled.div`
  /* margin-right: ${(props) => props.theme.spacing.large}; */
  width: 100%;
  text-align: center;
`;

export const AccountNameWrapper = styled.div`
  width: 100%;
  transition: background 0.3s;
  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
  cursor: pointer;
  padding: 1rem 0rem;
  border-radius: 0.5rem;
`;

export const AccountName = styled.span`
  white-space: nowrap;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.text};
  background: ${(props) => props.theme.colors.gradation.gradation1};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const MenuSection = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
`;

export const Right = styled.div`
  justify-content: flex-end;
  margin-right: 3rem;
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
  path {
    fill: ${(props) => props.theme.colors.grey.grey4};
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
