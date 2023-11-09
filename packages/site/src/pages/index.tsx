import { Home } from 'components/Home';

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

// const ErrorMessage = styled.div`
//   background-color: ${({ theme }) => theme.colors.error.muted};
//   border: 1px solid ${({ theme }) => theme.colors.error.default};
//   color: ${({ theme }) => theme.colors.error.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-bottom: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;
//   width: 100%;
//   ${({ theme }) => theme.mediaQueries.small} {
//     padding: 1.6rem;
//     margin-bottom: 1.2rem;
//     margin-top: 1.2rem;
//     max-width: 100%;
//   }
// `;

const Index = () => {
  // const { error } = useAppSelector((state) => state.UI);
  // const { sendTransaction } = useAergoSnap();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (error.message) {
  //     setTimeout(() => {
  //       dispatch(setError({}));
  //     }, 3000);
  //   }
  // }, [error.message]);

  return <Home />;
};

export default Index;
