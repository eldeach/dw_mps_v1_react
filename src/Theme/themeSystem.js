import { createTheme } from '@mui/material/styles';

const systemThemes = createTheme({
  typography: {
    fontFamily : 'sans-serif',
    button : {
      textTransform : 'none'
    },
  },  
  status : {
    danger : '#e53e3e',
  },
  palette : {
    primary : {
        light : '#33ab9f',
        main : '#009688',
        darker : '#00695f',
        contrastText : '#fff',
    },
    // status로 옮길 수 있는거 옮겨야함
    white :{
      main : '#fff',
    },
    start : {
      main : '#00e5ff',
      contrastText : '#fff',
    },
    accepted : {
      main : '#76ff03',
      contrastText : '#fff',
    },
    inProgress : {
      main : '#00bcd4',
      contrastText : '#fff',
    },
    prepared : {
      main : '#1e88e5',
      contrastText : '#fff',
    },
    withdrawn : {
      main : '#3e2723',
      contrastText : '#fff',
    },
    denied : {
      main : '#e53e3e',
      contrastText : '#fff',
    },
    recording : {
      main : '#ff0048',
      contrastText : '#fff',
    },
    submitted : {
      main : '#00e242',
      contrastText : '#fff',
    }
  },
});

export default systemThemes;