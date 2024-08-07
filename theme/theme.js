// theme.js
import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Colors } from '../constants/Colors';

const fontConfig = {
  web: {
    bold: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'normal'
    },
    regular: {
      fontFamily: 'open-sans',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'open-sans-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'open-sans-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'open-sans-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    bold: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'normal'
    },
    regular: {
      fontFamily: 'open-sans',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'open-sans-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'open-sans-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'open-sans-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    bold: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'normal'
    },
    regular: {
      fontFamily: 'open-sans',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'open-sans-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'open-sans-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'open-sans-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    accent: Colors.SECONDARY,
    background: Colors.PRIMARY_BACKGROUND,
    surface: '#ffffff',
    text: '#000000',
    disabled: '#f6f6f6',
    placeholder: '#f6f6f6',
    backdrop: Colors.PRIMARY,
  },
  fonts: configureFonts(fontConfig),
};
export default theme;
