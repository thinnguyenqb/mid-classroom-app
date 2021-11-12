import React from "react";
import "./styles.scss";
import Drawer from "../../components/Drawer/Drawer";
import UserInfor from './UserInfor/index';
import EditUserInfor from "./EditUserInfor";

function Profile() {
  return (
    <>
      <Drawer />
      <div className="profile-wrapper">
        <UserInfor />
        <div className="right">
          <EditUserInfor />
        </div>
        <h1>TotalScore</h1>
      </div>
    </>
  );
}

export default Profile;
