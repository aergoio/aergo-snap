import styled from 'styled-components';
import { AccountImage } from '@ui/atom/AccountImage';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

// export const Heading = styled.h1`
//   margin-top: 0;
//   margin-bottom: 2.4rem;
//   text-align: center;
// `;

// export const Span = styled.span`
//   color: ${(props) => props.theme.colors.primary.default};
// `;

// export const Subtitle = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.large};
//   font-weight: 500;
//   margin-top: 0;
//   margin-bottom: 0;
//   min-width: 17rem;
//   ${({ theme }) => theme.mediaQueries.small} {
//     font-size: ${({ theme }) => theme.fontSizes.text};
//     min-width: 14rem;
//   }
// `;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAccountImage = styled(AccountImage)`
  margin-right: ${(props) => props.theme.spacing.tiny2};
`;

export const AssetWrapper = styled.div`
  display: flex;
`;
