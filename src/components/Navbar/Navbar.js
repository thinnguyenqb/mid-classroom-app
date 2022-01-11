import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import { useStyles } from "./style";
import CreateClass from "../CreateClass/CreateClass";
import JoinClass from "../JoinClass/JoinClass";
import Logo from "../../assets/images/logo_fit.png";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import CreateAndJoin from "./CreateAndJoin";
import Notification from "./Notification";

const Navbar = ({ children }) => {
  const classes = useStyles();
  const [createClassDiglog, setCreateClassDiglog] = useState(false);
  const [joinClassDiglog, setJoinClassDiglog] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;


  const userLink = () => {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccountMenu avatar={user.avatar} />
          {user.fullname}
        </div>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <Link to="/" style={{textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.title}>
                Grade Management System - 
              </Typography>
            </Link>
              <img src={Logo} alt="Classroom" style={{ width: "70px" }} />
          </div>
          <div className={classes.header__wrapper__right}>
          </div>
          <div className={classes.header__wrapper__right}>
            <Link to="/" style={{marginRight: "5px"}}>
              <IconButton variant="outlined" size="large" style={{ color: '#3f51b5' }}>
                <HomeOutlinedIcon fontSize="inherit"/>
              </IconButton>
            </Link>
            <CreateAndJoin
              setJoinClassDiglog={setJoinClassDiglog}
              setCreateClassDiglog={setCreateClassDiglog}
            />
            <Notification />
            <div>
              {isLogged ? (
                userLink()
              ) : (
                <Link to="/login" style={{ textDecoration: "none", marginLeft: '13px' }}>
                  <Button variant="outlined">
                    <LoginOutlinedIcon className={classes.icon} />
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass
        createClassDiglog={createClassDiglog}
        setCreateClassDiglog={setCreateClassDiglog}
      />
      <JoinClass
        joinClassDiglog={joinClassDiglog}
        setJoinClassDiglog={setJoinClassDiglog}
      />
    </div>
  );
};

export default Navbar;
