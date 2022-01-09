import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: '100',
    marginBottom: '80px'
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "500",
    color: "#3f51b5",
    marginLeft: "5px",
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  header__wrapper__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    padding: "3px",
    color: "#5f6368",
    cursor: "pointer",
  },
  menu: {
    marginTop: "50px",
    marginLeft: "-50px",
  },
  hover: {
    fontSize: 17,
    textTransform: "none",
    fontFamily: '"Google Sans",Roboto,Arial,sans-serif,',
    "&:hover": {
      color: "#fc2c03",
    },
  },
}));