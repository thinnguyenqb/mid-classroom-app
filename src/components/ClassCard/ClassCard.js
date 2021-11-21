import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from 'react-router-dom';
import "./styles.scss";

const ClassCard = ({ id, name, desc, teacherName, teacherAvatar}) => {
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
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
  );
};

export default ClassCard;