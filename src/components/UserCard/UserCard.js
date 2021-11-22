import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles.scss";

const UserCard = (teacher) => {

  return (
    <div>
        <div className="usercard">
          <div className="usercard__Cnt">
            <div className="usercard__top">
              <Avatar src={teacher.teacher.avatar}/>
              <span>{teacher.teacher.name}</span>
            </div>
         
        </div>
        
        </div>
    </div>
  );
};

export default UserCard;