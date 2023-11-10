import { createGlobalStyle, DefaultTheme } from 'styled-components';

const breakpoints = ['600px', '768px', '992px'];

/**
 * Common theme properties.
 */
const theme = {
  fonts: {
    default: 'Outfit-Regular',
    code: 'ui-monospace,Menlo,Monaco,"Cascadia Mono","Segoe UI Mono","Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Fira Mono","Droid Sans Mono","Courier New", monospace',
  },
  fontSizes: {
    heading: '5.2rem',
    mobileHeading: '3.6rem',
    h1: '3.2rem',
    title: '2.4rem',
    large: '2rem',
    text: '1.8rem',
    small: '1.6rem',
    xsmall: '1.4rem',
    xxsmall: '1.2rem',
  },
  lineHeights: {
    h1: '5.6rem',
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
  },

  spacing: {
    large: '1.6rem',
    tiny1: '1rem',
    tiny2: '0.8rem',
    small: '0.6rem',
  },
  radii: {
    // default: '24px',
    default: '8px',
    button: '8px',
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
  shadows: {
    // default: '0px 7px 42px rgba(0, 0, 0, 0.1)',
    default: '0px 5px 12px rgba(0, 0, 0, 0.1)',
    button: '0px 0px 16.1786px rgba(0, 0, 0, 0.15);',
  },
};

/**
 * Light theme color properties.
 */
export const light: DefaultTheme = {
  colors: {
    background: {
      default: '#FFFFFF',
      alternative: '#F2F4F6',
      inverse: '#141618',
      transparent: '#F2F4F6',
    },
    icon: {
      default: '#141618',
      alternative: '#BBC0C5',
    },
    text: {
      default: '#24272A',
      muted: '#6A737D',
      alternative: '#535A61',
      inverse: '#FFFFFF',
    },
    border: {
      // default: '#BBC0C5',
      default: '#f6f6f6',
    },
    primary: {
      default: '#6F4CFF',
      inverse: '#FFFFFF',
      // Blue
      1: '#279ECC',
      2: '#84CEEB',
      3: '#ECF8FD',
    },
    secondary: {
      // Pink
      1: '#E4097D',
      2: '#F894C9',
      3: '#FFF1F9',
    },
    card: {
      default: '#FFFFFF',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
    grey: {
      white: '#FFFFFF',
      grey1: '#F0F0F0',
      grey2: '#D8D8D8',
      grey3: '#BABABA',
      grey4: '#9C9A9A',
      grey6: '#686767',
      grey7: '#454344',
      grey8: '#231F20',
    },
    gradation: {
      gradation1:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #e4097d)',
      gradation2:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #f894c8)',
      gradation3:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #fff1f9)',
      gradation4:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #a13e99)',
      gradation5:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #9a449c, #e30a7d)',
    },
  },
  ...theme,
};

/**
 * Dark theme color properties
 */
export const dark: DefaultTheme = {
  colors: {
    background: {
      default: '#24272A',
      alternative: '#141618',
      inverse: '#FFFFFF',
      transparent: 'rgba(88,86,102,.2)',
    },
    icon: {
      default: '#FFFFFF',
      alternative: '#BBC0C5',
    },
    text: {
      default: '#FFFFFF',
      muted: '#FFFFFF',
      alternative: '#D6D9DC',
      inverse: '#24272A',
    },
    border: {
      default: '#24272A',
    },
    primary: {
      default: '#6F4CFF',
      inverse: '#FFFFFF',
      // Blue
      1: '#279ECC',
      2: '#0F749B',
      3: '#093140',
    },
    secondary: {
      // Pink
      1: '#F54A92',
      2: '#972D5A',
      3: '#3F1D2F',
    },
    card: {
      default: '#141618',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
    grey: {
      white: '#FFFFFF',
      grey1: '#F0F0F0',
      grey2: '#D8D8D8',
      grey3: '#BABABA',
      grey4: '#9C9A9A',
      grey6: '#686767',
      grey7: '#454344',
      grey8: '#231F20',
    },
    gradation: {
      gradation1:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #e4097d)',
      gradation2:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #f894c8)',
      gradation3:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #fff1f9)',
      gradation4:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #a13e99)',
      gradation5:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #9a449c, #e30a7d)',
    },
  },
  ...theme,
};

/**
 * Default style applied to the app.
 *
 * @param props - Styled Components props.
 * @returns Global style React component.
 */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Outfit-Regular';
    src: url(../assets/fonts/Outfit-Regular.ttf);
    font-weight: normal;
    font-style: normal;
  }

  html {
    /* 62.5% of the base size of 16px = 10px.*/
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.text.default};
    font-family: ${(props) => props.theme.fonts.default};
    font-size: ${(props) => props.theme.fontSizes.text};
    margin: 0;
  }

  * {
    transition: background-color .1s linear;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: ${(props) => props.theme.fontSizes.heading};
    ${(props) => props.theme.mediaQueries.small} {
      font-size: ${(props) => props.theme.fontSizes.mobileHeading};
    }
  }

  code {
    background-color: ${(props) => props.theme.colors.background.alternative};
    font-family: ${(props) => props.theme.fonts.code};
    padding: 1.2rem;
    font-weight: normal;
    font-size: ${(props) => props.theme.fontSizes.text};
  }

  button {
    font-size: ${(props) => props.theme.fontSizes.small};
    border-radius: ${(props) => props.theme.radii.button};
    background-color: ${(props) => props.theme.colors.background.inverse};
    color: ${(props) => props.theme.colors.text.inverse};
    border: 1px solid ${(props) => props.theme.colors.background.inverse};
    font-weight: bold;
    padding: 1rem;
    min-height: 4.2rem;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.colors.background.inverse};
      color: ${(props) => props.theme.colors.text.default};
    }

    &:disabled,
    &[disabled] {
      border: 1px solid ${(props) => props.theme.colors.background.inverse};
      cursor: not-allowed;
    }

    &:disabled:hover,
    &[disabled]:hover {
      background-color: ${(props) => props.theme.colors.background.inverse};
      color: ${(props) => props.theme.colors.text.inverse};
      border: 1px solid ${(props) => props.theme.colors.background.inverse};
    }
  }
`;
