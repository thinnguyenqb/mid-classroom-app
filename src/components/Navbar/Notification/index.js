import React, { useState, useEffect } from "react";
import { Menu } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Badge from "@mui/material/Badge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Link } from "react-router-dom";
import './styles.scss'
import { Typography } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import { API_URL } from "../../../utils/config";
import axios from 'axios'
import { useSelector } from 'react-redux';
import moment from "moment";

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dataNotify, setDataNotify] = useState([])
  const token = localStorage.getItem("access_token")
  const auth = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token) {
      const getNotify = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/notify/${auth.user._id}`,
            {
              headers: { Authorization: token },
            }
          );
          setDataNotify(res.data.dataNotify);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      getNotify();
    }
  }, [token, auth]);

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
          <Badge badgeContent={dataNotify.length} color="error">
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
            {dataNotify.map((item, index) => (
                <div className="notify-body" key={index}>
                    <Avatar src={item.senderAvatar} sx={{ width: 32, height: 32, marginRight: '10px' }}/>
                    <div>
                      <div>
                        <span style={{marginRight: '5px', fontWeight: '500'}}>{item.senderFullname}</span>
                        <Link to={`/${item.url}`} style={{textDecoration: 'none', color: '#343a40'}} >
                          <span>{item.text} </span>
                        </Link>
                      </div>
                    <div className="notify-items-time">
                      {moment(item.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </Menu>
    </React.Fragment>
  );
}
