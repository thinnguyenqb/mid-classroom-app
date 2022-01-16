import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    borderRadius: '15px'
  },
  avatar: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    height: "50px",
    width: "280px",
    margin: theme.spacing(1),
  }
}));