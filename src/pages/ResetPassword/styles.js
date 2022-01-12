import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '80%',
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(2, 0, 2),
  },
}));