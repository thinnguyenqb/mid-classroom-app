import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  },
  facebookBtn: {
    height: "50px",
    width: "280px",
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    boxShadow:
      " rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
    padding: "0px",
    borderRadius: "2px",
    border: "1px solid transparent",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: " Roboto, sans-serif",
    backgroundColor: "rgb(255, 255, 255)",

    "&:hover": {
      cursor: "pointer",
      opacity: 0.9,
    },
  },
  fbIcon: {
    marginRight: "16px",
    marginLeft: "10px",
    fontSize: "20px",
    color: "#4267B2",
  },
  separator: {
    marginTop: theme.spacing(1),
  },
}));