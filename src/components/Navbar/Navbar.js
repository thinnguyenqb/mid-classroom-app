import React, { useState } from 'react'
import { AppBar, Avatar, Menu,
  MenuItem, Toolbar, Typography, Button} from "@material-ui/core";
import { Add } from "@material-ui/icons"
import { useStyles } from "./style";
import { CreateClass, JoinClass } from '..'
import Logo from '../../assets/images/logo_fit.png'

const Navbar = ({ children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [ createClassDiglog, setCreateClassDiglog ] = useState(false);
  const [ joinClassDiglog, setJoinClassDiglog ] = useState(false);

  const handleCreate = () => {
    handleClose()
    setCreateClassDiglog(true);
  }
  const handleJoin = () => {
    handleClose()
    setJoinClassDiglog(true);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
          { children }
            <img
              src={Logo}
              alt="Classroom"
              style={{width: "110px"}}
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ marginRight: "30px" }}
              variant="outlined"
            >
              <Add className={classes.icon} />
              Create & Join
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              <MenuItem onClick={handleJoin} >Join Class</MenuItem>
              <MenuItem onClick={handleCreate} >
                Create Class
              </MenuItem>
            </Menu>
            <div>
              <Avatar
                src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass createClassDiglog={createClassDiglog} setCreateClassDiglog={setCreateClassDiglog} />
      <JoinClass joinClassDiglog={joinClassDiglog} setJoinClassDiglog={setJoinClassDiglog} />
    </div>
  )
}

export default Navbar
