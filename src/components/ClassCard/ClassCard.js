import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const ClassCard = ({ classData }) => {
  return (
    <li className="card__list">
      <div className="card__wrapper">
        <div className="card__container">
          <div className="card__imgWrapper" />
          <div className="card__image" />
          <div className="card__content">
            <Link className="card__title" to="/">
              <h2>PTUDW</h2>
            </Link>
            <p className="card__owner">HUY KHANH</p>
          </div>
        </div>
        <Avatar
          className="card__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
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