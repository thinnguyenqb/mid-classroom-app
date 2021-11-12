
import Avatar from '@mui/material/Avatar';
import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

const UserInfor = () => {
	const auth = useSelector(status => status.auth)

  const {user} = auth

	return (
		<div className="user-info-wrapper">
			<Avatar
        alt="img-avatar"
        src={user.avatar}
        sx={{ width: 200, height: 200 }}
      />
			<div className="name">{user.name}</div>
			<div className="email">
			  {user.email}
			</div>
			<div className="teacher">
				Số lượng lớp giảng dạy: 10
				
			</div>
			<div className="student">
        Số lượng lớp tham gia học: 3
			</div>
		</div>
	);
};
export default UserInfor;
