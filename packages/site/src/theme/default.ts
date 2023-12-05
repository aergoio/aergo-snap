import { createGlobalStyle, DefaultTheme } from 'styled-components';

const breakpoints = ['845px', '900px', '992px'];

/**
 * Common theme properties.
 */
export const theme = {
  fonts: {
    default: 'Outfit-Regular',
    buttons: 'Outfit-Medium',
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
    c1: '2rem',
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
  },

  spacing: {
    xlarge: '3.8rem',
    large3: '3rem',
    large2: '2.4rem',
    large: '1.6rem',
    tiny1: '1rem',
    tiny2: '0.8rem',
    small: '0.6rem',
    xsmall: '0.4rem',
  },
  radii: {
    rounded: '24px',
    rect: '8px',
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
  shadows: {
    // default: '0px 7px 42px rgba(0, 0, 0, 0.1)',
    // default: '0px 5px 12px rgba(0, 0, 0, 0.1)',
    default: '0 40px 20px -30px rgba(102,111,128,.1)',
    button: '0px 0px 16.1786px rgba(0, 0, 0, 0.15)',
  },
};

/**
 * Light theme color properties.
 */
export const light: DefaultTheme = {
  colors: {
    background: {
      default: '#FFFFFF',
      alternative: '#f2f4f6',
      inverse: '#141618',
      transparent: '#F2F4F6',
      primary: '#eff5f7',
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
      main: '#279ECC',
      light: '#84CEEB',
      dark: '#ECF8FD',
    },
    'primary-outline': {
      main: '#279ECC',
    },
    secondary: {
      inverse: '#FFFFFF',
      // Pink
      main: '#E4097D',
      light: '#F894C9',
      dark: '#FFF1F9',
    },
    'secondary-outline': {
      main: '#E4097D',
    },
    card: {
      default: '#fdfdfd',
    },
    error: {
      inverse: '#FFFFFF',
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
      main: '#d73a49',
    },
    warning: {
      inverse: '#FFFFFF',
      main: '#f66a0a',
    },
    info: {
      inverse: '#FFFFFF',
      main: '#037DD6',
    },
    success: {
      inverse: '#FFFFFF',
      main: '#11d899',
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
      inverse: '#FFFFFF',
      border:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #a13e99)',
      main: 'linear-gradient(to right, #279ecc, #a13e99)',
      gradation1: 'linear-gradient(to right, #279ecc, #e4097d)',
      gradation2: 'linear-gradient(to right, #279ecc, #f894c8)',
      gradation3: 'linear-gradient(to right, #279ecc, #fff1f9)',
      gradation4: 'linear-gradient(to right, #9a449c, #e30a7d)',
    },
    'font-gradation': {
      main: 'linear-gradient(to right, #279ecc, #a13e99)',
      hover: 'linear-gradient(to right, #279ecc, #a13e99)',
      shadow: '0px 0px 16.1786px rgba(0, 0, 0, 0.15)',
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
      primary: '#24272A',
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
      main: '#279ECC',
      light: '#0F749B',
      dark: '#093140',
    },
    'primary-outline': {
      main: '#279ECC',
    },
    secondary: {
      inverse: '#FFFFFF',
      // Pink
      main: '#F54A92',
      light: '#972D5A',
      dark: '#3F1D2F',
    },
    'secondary-outline': {
      main: '#E4097D',
    },
    card: {
      default: '#222831',
    },
    error: {
      inverse: '#FFFFFF',
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
      main: '#d73a49',
    },
    warning: {
      inverse: '#FFFFFF',
      main: '#f66a0a',
    },
    info: {
      inverse: '#FFFFFF',
      main: '#037DD6',
    },
    success: {
      inverse: '#FFFFFF',
      main: '#11d899',
    },
    grey: {
      white: '#FFFFFF',
      grey8: '#F0F0F0',
      grey6: '#D8D8D8',
      grey4: '#BABABA',
      grey3: '#9C9A9A',
      grey2: '#686767',
      grey1: '#454344',
      black: '#231F20',
    },
    gradation: {
      inverse: '#FFFFFF',
      border:
        'linear-gradient(#fff, #fff), linear-gradient(to right, #279ecc, #a13e99)',
      main: 'linear-gradient(to right, #279ecc, #a13e99)',
      gradation1: 'linear-gradient(to right, #279ecc, #fff1f9)',
      gradation2: 'linear-gradient(to right, #279ecc, #f894c8)',
      gradation3: 'linear-gradient(to right, #279ecc, #e4097d)',
      gradation4: 'linear-gradient(to right, #9a449c, #e30a7d)',
    },
    'font-gradation': {
      main: 'linear-gradient(to right, #279ecc, #fff1f9)',
      hover: 'linear-gradient(to right, #279ecc, #a13e99)',
      shadow: '0 -2px 20px rgba(0, 0, 0, 0.75)',
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
  html {
    /* 62.5% of the base size of 16px = 10px.*/
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme.colors.background.alternative};
    color: ${(props) => props.theme.colors.text.default};
    font-family: ${(props) => props.theme.fonts.default};
    font-size: ${(props) => props.theme.fontSizes.small};
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
    font-family: ${(props) => props.theme.fonts.buttons};
    font-size: ${(props) => props.theme.fontSizes.small};
    border-radius: ${(props) => props.theme.radii.rect};
    background-color: ${(props) => props.theme.colors.background.inverse};
    color: ${(props) => props.theme.colors.text.inverse};
    border: 1px solid ${(props) => props.theme.colors.background.inverse};
    font-weight: bold;
    padding: 1rem;
    min-height: 4.2rem;
    cursor: pointer;
    transition: all .2s ease-in-out;

    /* &:hover { */
      /* background-color: transparent; */
      /* border: 1px solid ${(props) =>
        props.theme.colors.background.inverse}; */
      /* color: ${(props) => props.theme.colors.text.default}; */
    /* } */

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
