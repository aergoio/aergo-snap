import styled from 'styled-components';

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
  margin-top: 6px;
  width: 20rem;
`;

export const Column = styled.div`
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
  margin-right: 3rem;
  :hover {
    opacity: 0.75;
  }
  :active {
    opacity: 0.5;
  }
`;

export const StakedBalance = styled.span`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
`;
