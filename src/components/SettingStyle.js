/*eslint-disable*/
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    padding: '4px',
  },
  topGrid: {
    marginBottom: '10px',
  },
  topHeading: {
    fontSize: '18px',
    fontWeight: 600,
  },
  addButton: {
    textTransform: 'none',
    color: 'white',
    backgroundColor: '#4C98D3',
  },
  exportButton: {
    textTransform: 'none',
    width: '128px',
    marginLeft: '5px',
    position: 'relative',
  },
  Typo: {
    fontSize: 12,
    fontWeight: 400,
  },
  storeSelectFiled: {
    width: '234px',
    height: '40px',
    backgroundColor: 'white',
    border: '1px solid #D2E2EA',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none',
    justifyContent: 'space-between',
  },
editButton:{
  margin: '2px 9px',
  padding: 5,
  backgroundColor: '#009ACA',
  '&:hover, &.Mui-focusVisible': { backgroundColor: '#009ACA' },
},
deleteButton: {
  margin: '2px 9px',
  padding: 5,
  backgroundColor: '#DE3333',
  '&:hover, &.Mui-focusVisible': { backgroundColor: '#DE3333' },
},
  navButtons: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    backgroundColor: 'white',
    border: '1px solid #D2E2EA',
    borderRadius: '4px',
    padding: '10px',
    margin: '10px',
    cursor: 'pointer',
  },
  centerGridAligner: {
    display: 'inline-flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  },
  arrowButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  darkTypo: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#13273C',
  },
  endGridAligner: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewFilterSelectFiled: {
    width: '171px',
    height: '40px',
    backgroundColor: 'white',
    border: '1px solid #D2E2EA',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none',
    justifyContent: 'space-between',
    position: 'relative',
  },
  viewBox: {
    width: '327px',
    height: '192px',
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '2px 3px #0551A31A',
    marginTop: '5px',
  },
  boxEleStyle: {
    padding: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ececec',
      color: '#004995',
    },
  },
  filterBox: {
    width: '171px',
    // height: '285px',
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '2px 3px #0551A31A',
    marginTop: '5px',
  },
  exportBox: {
    width: '127px',
    height: '80px',
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '2px 3px #0551A31A',
    marginTop: '5px',
    zIndex: 1,
  },
  timeCardModal: {
    position: 'absolute',
    borderRadius: '20px',
    padding: '20px',
    width: '426px',
    height: '614px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  day: {
    color: '#0551A3',
  },
}));

export default useStyles;
