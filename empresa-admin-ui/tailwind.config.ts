import withMT from '@material-tailwind/react/utils/withMT';

const config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      'sm': '0.8rem',
      'base': '16px',
      'xl': '20px',
      '2xl': '25px',
      '3xl': '31px',
      '4xl': '36px',
      '5xl': '48px',
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '600',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    extend: {
      colors: {
        'primary': '#0258FF',
        'primary-b': '#FC6F05',
        'bgbase': '#F3F7FC',
        'white': '#FFFFFF',
        'ghostwhite': '#F8FAFD',
        'shade': {
          '100': '#02497E',
          '200': '#02497E',
          '300': '#02497E',
          '400': '#012B4B',
          '500': '#163959',
        },
        'tint': {
          '100': '#E9EFFD',
          '200': '#CDE9FE',
          '300': '#9BD3FD',
          '400': '#69BDFD',
          '500': '#36A7FC',
          '600': '#3C9BF2',
          '700': '#0E65E5'
        },
        'info': '#2F80ED',
        'sucess': '#00966D',
        'warning': '#E2B93B',
        'error': '#C30000',
        'danger': '#df421b',
        'black': {
          '100': '#0C0C0C',
          '200': '#1D1D1D',
          '300': '#282828',
        },
        'gray': {
          '100': '#4F4F4F',
          '200': '#404040',
          '300': '#BDBDBD',
          '400': '#DFDFDF',
          '500': '#E0E0E0'
        }
      },
    }

  },
  plugins: [],
});
export default config
