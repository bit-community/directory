import theme from 'imports/lib/theme';

type ThemeInterface = typeof theme;

declare module 'styled' {
  interface DefaultTheme extends ThemeInterface {}
}

declare module 'react-file-input-previews-base64';
