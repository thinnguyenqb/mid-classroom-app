import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


export default function CreateAndJoin({ setCreateClassDiglog,  setJoinClassDiglog}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCreate = () => {
    handleClose();
    setCreateClassDiglog(true);
  };
  const handleJoin = () => {
    handleClose();
    setJoinClassDiglog(true);
  };

  return (
    <React.Fragment>
      <Tooltip title="Create & Join" style={{marginRight: "5px"}}>
                <IconButton
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant="outlined"
                  size="large"
                  style={{ color: '#3f51b5' }}
                >
                  <AddCircleOutlineRoundedIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.1,
                  ml: -5,
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
    </React.Fragment>
  );
}