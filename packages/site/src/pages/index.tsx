import styled from 'styled-components';
import { useEffect } from 'react';
import { RequestButton, Card } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useAergoSnap } from '../hooks/useAergoSnap';
import { setError } from '../slices/UISlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

// const Heading = styled.h1`
//   margin-top: 0;
//   margin-bottom: 2.4rem;
//   text-align: center;
// `;

// const Span = styled.span`
//   color: ${(props) => props.theme.colors.primary.default};
// `;

// const Subtitle = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.large};
//   font-weight: 500;
//   margin-top: 0;
//   margin-bottom: 0;
//   ${({ theme }) => theme.mediaQueries.small} {
//     font-size: ${({ theme }) => theme.fontSizes.text};
//   }
// `;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

// const Notice = styled.div`
//   background-color: ${({ theme }) => theme.colors.background.alternative};
//   border: 1px solid ${({ theme }) => theme.colors.border.default};
//   color: ${({ theme }) => theme.colors.text.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;
//   width: 100%;

//   & > * {
//     margin: 0;
//   }
//   ${({ theme }) => theme.mediaQueries.small} {
//     margin-top: 1.2rem;
//     padding: 1.6rem;
//   }
// `;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useAppSelector((state) => state.UI);
  const { sendTransaction } = useAergoSnap();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error.message) {
      setTimeout(() => {
        dispatch(setError({}));
      }, 3000);
    }
  }, [error.message]);

  return (
    <Container>
      <CardContainer>
        {error.message && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        <Card
          content={{
            title: 'Send Transaction',
            description: 'Get TxHash',
            button: (
              <RequestButton
                onClick={sendTransaction}
                buttonMessage="Send Transaction"
              />
            ),
          }}
        />
      </CardContainer>
    </Container>
  );
};

export default Index;
