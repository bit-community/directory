/**
 * Instead of spitting out string variables all over the codebase, 
 * we will keep most recurring string constants here to maintain a consistent look and feel
 * across the entire project
 */

import { theme as chakraTheme, DefaultTheme } from '@chakra-ui/core';

// interface IFonts extends CustomTheme
interface ICustom {
	buttonHeight: string;
	inputMinHeight: string;
	inputFontSize: string;
	inputPlaceHolder: string;
	blue: string;
	green: string;
	tabNavHeight: string;
	defaultBox: string;
	paddingWrapper: string;
	fixedMarginTop: string;
	defaultWrapper: string;
	fixedpadding: string;
	lightShadow: string;
	background: string;
	defaultRadius: string;
	defaultShadow: string;
	defaultBorder: string;
	[key: string]: string;
}

// interface IColor extends

interface IThemeProps extends DefaultTheme {
	fonts: {
		mono: string;
		heading: string;
		body: string;
	};
	custom: ICustom;
}
type TBreakPoint = Array<string>;

const fonts = {
	...chakraTheme.fonts,
	mono: `'Menlo', Monaco, Fira Code, Ubuntu Mono, monospace`,
	heading: `"Karla", Cantarell, Oxygen, Ubuntu, sans-serif`,
	body: `"Karla", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;`
};
// const fontSizes = {
// 	xs: '0.65rem',
// 	sm: '0.875rem',
// 	md: '1rem',
// 	lg: '1.125rem',
// 	xl: '1.25rem',
// 	'2xl': '1.5rem',
// 	'3xl': '1.875rem',
// 	'4xl': '2.25rem',
// 	'5xl': '3rem',
// 	'6xl': '4rem'
// };
const custom = {
	buttonHeight: '42px',
	inputMinHeight: '42px',
	inputFontSize: '16px',
	inputPlaceHolder: '14px',
	paddingWrapper: '.5rem 2rem',
	fixedMarginTop: '3rem',
	fixedpadding: '2rem',
	blue: '#0476D0',
	green: '#028248',
	tabNavHeight: '54px',
	defaultBox: '1rem',
	defaultWrapper: '.5rem 1.1rem',
	defaultRadius: '4px',
	defaultShadow: '10px 7px 50px rgba(0,50,30,0.05)',
	lightShadow: '6px 5px 10px rgba(0,50,30,0.03)',
	defaultBorder: '1px solid #38a169',
	background: '#fcfcff'
};
const colors: any = {
	...chakraTheme.colors,
	black: '#40474e',
	default: '#e06594',
	tomato: '#e06594',
	heading: '#293f58',
	text: '#293F58',
	background: '#fcfcff'
};
const breakpoints: TBreakPoint = [ '40em', '52em', '64em' ];

const theme: IThemeProps = {
	...chakraTheme,
	colors,
	fonts,
	breakpoints,
	custom,
	icons: {
		...chakraTheme.icons
	}
};

export default theme;
