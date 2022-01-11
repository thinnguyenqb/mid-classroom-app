import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Badge from "@mui/material/Badge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Link } from "react-router-dom";
import './styles.scss'
import { Typography } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Notifications" style={{ marginRight: "5px" }}>
        <IconButton
          id="basic-button"
          size="large"
          aria-label="show 17 new notifications"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="outlined"
          style={{ color: "#3f51b5", marginLeft: "5px" }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneRoundedIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          dropShadow: '0px 2px 8px rgba(0,0,0,0.32)',
          marginTop:'10px',
          marginLeft:'-100px',
        }}
      >
        <div style={{ width: "350px" }}>
          <div className="notify-header">
            <Typography variant="h6">Thông báo</Typography>
            <IconButton>
              <DeleteOutlineRoundedIcon fontSize="2rem" />
            </IconButton>
          </div>
          <div>
            <div className="notify-filter px-3 pb-3">
              <span>Tất cả</span>
              <span>Hoàn thiện điểm</span>
              <span>Nhận xét điểm</span>
              <span>Quyết định cuối cùng</span>
            </div>
          </div>
          <div
            style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
          >
           
              <div>
                <Link to='/' className="notify-body">
                  <Avatar src='https://res.cloudinary.com/ericnguyen-cop/image/up…/v1625668136/avatar/avatar-1577909_640_nrt1sc.png' sx={{ width: 32, height: 32, marginRight: '10px' }}/>
                  <div>
                    <strong style={{marginRight: '5px'}}>huykhanh99</strong>
                    <span>has commented on your review grade </span>
                  </div>
                </Link>
              </div>
           
          </div>
        </div>
      </Menu>
    </React.Fragment>
  );
}
