import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { Tooltip } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useStyles } from "./style";
import CreateClass from "../CreateClass/CreateClass";
import JoinClass from "../JoinClass/JoinClass";
import Logo from "../../assets/images/logo_fit.png";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const Navbar = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [createClassDiglog, setCreateClassDiglog] = useState(false);
  const [joinClassDiglog, setJoinClassDiglog] = useState(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const handleCreate = () => {
    handleClose();
    setCreateClassDiglog(true);
  };
  const handleJoin = () => {
    handleClose();
    setJoinClassDiglog(true);
  };

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
            <Link to="/" style={{marginRight: "10px"}}>
              <Button variant="outlined">
                <HomeRoundedIcon className={classes.icon} />
              </Button>
            </Link>
            <Tooltip title="Create & Join" style={{marginRight: "10px"}}>
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant="outlined"
                >
                  <AddIcon className={classes.icon} />
                </Button>
              
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              {isLogged ? (
                userLink()
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
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
