import * as React from 'react';
import { Box, Drawer, List, ListSubheader, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ClassIcon from '@mui/icons-material/Class';
import Navbar from '../Navbar/Navbar'
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useState, useEffect } from 'react'
import axios from 'axios'
import {API_URL} from '../../utils/config'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {

  ///
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);

  const token = localStorage.getItem('access_token')

  useEffect(()=>{
  if (token) {
    const getData = async () => {
      try {
        const { data: teachers} = await axios
        .get(`${API_URL}/classroom/list-teacher`, {
          headers: { Authorization: token }
        })
        setClassTeacher(teachers);

        const {data: students} = await axios
        .get(`${API_URL}/classroom/list-student`, {
          headers: { Authorization: token }
        })
        setClassStudent(students);

      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    }
    getData();
    }
  },[token])

  ///
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Lớp học', 'Lịch'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Giảng dạy
          </ListSubheader>
        }
      >
        {classTeacher.map((item) => (
          <ListItem button key={item.id} component={Link} to={`/class/${item.id}`}>
            <ListItemIcon>
             <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Đã đăng kí
          </ListSubheader>
        }
      >
        {classStudent.map((item) => (
           <ListItem button key={item.id} component={Link} to={`/class/${item.id}`}>
           <ListItemIcon>
             <ClassIcon />
           </ListItemIcon>
              <ListItemText primary={item.name} />
         </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{}}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Navbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
              >
              <Menu/>
            </IconButton>
          </Navbar>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}