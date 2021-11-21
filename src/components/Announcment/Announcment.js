import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./styles.scss";
const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);

  return (
    <div>
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>Huy Khanh</div>
            </div>
            <p className="amt__txt">Chieu nay nghi nha may em</p>
          <img className="amt__img" src="https://res.cloudinary.com/ericnguyen-cop/image/upload/v1632478750/social-img/d4sn5va8zqrgcj22bscn.jpg"
            alt="dfasdfad" />
          </div>
        </div>
    </div>
  );
};

export default Announcment;