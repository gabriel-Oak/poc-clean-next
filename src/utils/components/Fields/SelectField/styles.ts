import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  selectLabel: {
    paddingLeft: 14,
    top: -4,
    '&.Mui-focused, &.MuiFormLabel-filled': {
      paddingTop: 10,
    },
  },
  helperText: {
    marginLeft: 14,
  },
}));

export default useStyles;
