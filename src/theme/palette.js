import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    //main: colors.indigo[500],
    //main: colors.purple[900],
    main: 'rgb(41,30,56)',
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    //main: colors.blue['A400'],
    main: colors.purple[700],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    //primary: colors.blueGrey[900],
    primary: 'rgb(81,81,81)',
    //secondary: colors.blueGrey[600],
    secondary: 'rgb(178,178,178)',
    link: colors.blue[600]
  },
  background: {
    //default: '#F4F6F8',
    default: 'rgb(243,243,243)',
    paper: white
    //paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
