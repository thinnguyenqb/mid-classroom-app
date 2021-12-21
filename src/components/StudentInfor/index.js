import React, { useState, useEffect} from "react";
import {
  Button,
  Box,
} from "@material-ui/core";
import "./styles.scss";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { API_URL } from "../../utils/config";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const Profile = () => {
  const [inforStudent, setInforStudent] = useState({});
  const { id, studentid } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      const getData = async () => {
        try {
          const { data: student} = await axios
          .get(`${API_URL}/user/infor_student/${studentid}`, {
            headers: { Authorization: token }
          })
          setInforStudent(student);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
         }
        }
      }
      getData();
      }
  }, [studentid])
  return (
    <>
      <Box sx={{ display: "flex",width: "100%", justifyContent: 'center'}}>
          <Link to={`/class/${id}/gradeClass`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Link>
        </Box>
      <div className="profile-wrapper">
        <div className="profile-header">
          <h2>Student Information</h2>
        </div>
        <div className="profile-info">
          <div className="user-info">
            <div className="name">{inforStudent.name}</div>

            <div className="email">Fullname: {inforStudent.fullname}</div>
            <div className="email">
              <span>
                <AlternateEmailRoundedIcon />
              </span>
              {inforStudent.email}
            </div>
            <div className="teacher">Giới tính: {inforStudent.gender}</div>
            <div className="teacher">StudentID: {inforStudent.studentID}</div>
          </div>
          <div className="profile-avatar">
            <Avatar
              alt="img-avatar"
              src={inforStudent.avatar}
              sx={{ width: 200, height: 200 }}
            />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;