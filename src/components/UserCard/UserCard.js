import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles.scss";

const UserCard = ({user, isTeacher}) => {
  //console.log(isTeacher)
  return (
    <div>
      <div className="usercard">
        <div className="usercard__Cnt">
          <div className="usercard__content">
            <div className="usercard__top">
              <Avatar src={user.avatar} />
              <span>{user.name}</span>
            </div>
            { !isTeacher ? (
              <div>
                MSSV:
                <span style={{ color: "#1967d2" }}>
                  {user.student_code}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
