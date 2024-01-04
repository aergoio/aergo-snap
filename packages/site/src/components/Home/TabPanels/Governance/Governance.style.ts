import styled from 'styled-components';

interface VotedProps {
  percentage: number | string;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  /* width: 20rem; */
`;

export const Column = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Max = styled.span`
  margin-top: 0.6rem;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.grey.grey4};
  color: ${(props) => props.theme.colors.grey.grey4};
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  /* margin-right: 3rem; */
  :hover {
    opacity: 0.75;
  }
  :active {
    opacity: 0.5;
  }
`;

export const TextWrapper = styled.span`
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
  width: 100%;
  /* text-align: center; */
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
`;

export const PieWrapper = styled.div`
  width: 36rem;
`;

export const VoteWrapper = styled.div`
  width: 50%;

  position: absolute;
  display: flex;
  height: 1rem;
`;
export const Voted = styled.span<VotedProps>`
  display: ${(props) => (props.percentage === 0 ? 'none' : 'inline-block')};
  width: ${(props) => `${props.percentage}%`};
  border: solid 1px ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.primary.main};
  border-radius: ${(props) =>
    props.percentage === 100 ? '8px' : '8px 0 0 8px'};
`;

export const UnVoted = styled.span<VotedProps>`
  display: ${(props) => (props.percentage === 100 ? 'none' : 'inline-block')};
  width: ${(props) => `${100 - props.percentage}%`};
  border: solid 1px ${(props) => props.theme.colors.grey.grey2};
  background: ${(props) => props.theme.colors.grey.grey2};
  border-radius: ${(props) => (props.percentage === 0 ? '8px' : '0 8px 8px 0')};
`;

export const Percentage = styled.span`
  color: ${(props) => props.theme.colors.grey.grey8};
  font-size: ${(props) => props.theme.fontSizes.xxsmall};
`;

export const VotingTitle = styled.span`
  font-weight: bold;
`;

export const VotingInfo = styled.span`
  color: ${(props) => props.theme.colors.grey.grey4};
`;

export const RewardTitle = styled.span`
  color: ${(props) => props.theme.colors.primary.main};
`;

export const RewardValue = styled.span`
  color: ${(props) => props.theme.colors.grey.grey8};
  margin-left: ${(props) => props.theme.spacing.tiny2};
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  font-weight: 600;
`;

export const FlexEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const VotingPowerValue = styled.span`
  color: ${(props) => props.theme.colors.grey.grey6};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 600;
`;

export const TableTitle = styled.span`
  color: ${(props) => props.theme.colors.grey.grey7};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export const TableWrapper = styled.div`
  width: 90%;
  margin: 2rem;
`;

export const Table = styled.table`
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  text-indent: initial;
  border-spacing: 2px;
`;

export const TableBody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  white-space: nowrap;
  padding: 1rem;
  text-transform: uppercase;
  box-shadow: inset 0 -1px 0 0 ${(props) => props.theme.colors.grey.grey2};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey.grey6};
  letter-spacing: 0.01em;
  text-align: left;
`;

export const Td = styled.td`
  white-space: nowrap;
  text-align: left;
  color: ${(props) => props.theme.colors.grey.grey4};
  padding: 1rem;
  box-shadow: inset 0 -1px 0 0 ${(props) => props.theme.colors.grey.grey2};
  line-height: 1.5;
`;

export const IsStake = styled.div`
  > * {
    cursor: pointer;
  }
`;
