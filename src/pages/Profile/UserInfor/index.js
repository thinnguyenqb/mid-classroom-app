import Avatar from "@mui/material/Avatar";
import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

const UserInfor = () => {
  const auth = useSelector((status) => status.auth);

  const { user } = auth;
  //const [user, setUser] = useState(auth.user);
  console.log(user)
  const numberTeacher = user.teacher.length
  const numberClasses = user.classes.length


  return (
    <div className="user-info-wrapper">
      <Avatar
        alt="img-avatar"
        src={user.avatar}
        sx={{ width: 200, height: 200 }}
      />
      <div className="name">{user.name}</div>
      <div className="email">{user.email}</div>
      <div className="teacher">Số lượng lớp giảng dạy: {numberTeacher}</div>
      <div className="student">Số lượng lớp tham gia học: {numberClasses}</div>
    </div>
  );
};
export default UserInfor;
