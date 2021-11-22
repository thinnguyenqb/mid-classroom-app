import { Avatar } from "@material-ui/core";
//import { FolderOpen, PermContactCalendar } from "@material-ui/icons"
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Tooltip, IconButton } from '@mui/material';
import React from "react";
import { Link } from 'react-router-dom';
import "./styles.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/config";


const ClassCard = ({ id, name, desc, teacherName, teacherAvatar }) => {
  const token = useSelector((state) => state.token);
  const removeClass = () => {
    const data = {
      id: id,
    };
    axios
      .put(`${API_URL}/classroom/delete`, data, {
        headers: { Authorization: token },
      })
      .then((result) => {
        alert(result.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
    });
  };

  return (
    <li className="card__list">
      <div className="card__wrapper">
        <div className="card__container">
          <div className="card__imgWrapper" />
          <div className="card__image" />
          <div className="card__content">
            <Link className="card__title" to={`/class/${id}`}>
              <h2>{name}</h2>
            </Link>
            <p className="card__owner">{teacherName}</p>
          </div>
        </div>
        <Avatar
          className="card__avatar"
          src={teacherAvatar}
        />
      </div>
      <div className="card__bottom">
        {/* <Tooltip title="Exercise">
          <IconButton color="primary">
            <PermContactCalendar />
          </IconButton>
        </Tooltip>
        <Tooltip title="Drive Google">
          <IconButton color="primary">
            <FolderOpen />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Delete Or Left" onClick={removeClass}>
          <IconButton color="primary">
            <ExitToAppRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </li>
  );
};

export default ClassCard;