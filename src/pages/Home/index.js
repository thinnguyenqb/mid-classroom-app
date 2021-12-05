import React, { useState, useEffect } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useDispatch } from "react-redux";
import { dispatchGetUser, dispatchLogin, fetchUser } from "../../redux/actions/authAction";
import { Typography } from "@mui/material";

function Home() {
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
      dispatch({type: 'GET_TOKEN', payload: token})
    }
  }, [token, dispatch]);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      const getData = async () => {
        try {
          const { data: teachers} = await axios
          .get(`${API_URL}/classroom/list-teacher`, {
            headers: { Authorization: token }
          })
    
          setClassTeacher(teachers);
          const {data: students} = await axios
          .get(`${API_URL}/classroom/list-student`, {
            headers: { Authorization: token }
          })
          
          setClassStudent(students);
        } catch (error) {
          if (error) {
            if (error.response.status === 401) {
              history.push('/login')
            }
            console.log(error.response.data.msg);
         }
        }
      }
      getData();
      }
  }, [history]);

  return (
    <>
      <div className="home">
        {!token ?
          <>
          <Typography variant="h4" gutterBottom>Chào mừng bạn đến với Classroom Hcmus 😍💻📒🔎🎓😇</Typography>
          <Typography variant="h5" gutterBottom>Hãy đăng nhập để trải nghiệm mô hình giảng dạy và học tập này thôi nào!!!</Typography>
        </> :
          <>
            <Divider />
      <div className="home__class">
        <div className="home__class--title">Lớp giảng dạy</div>

        <div className="home__class--item">
          {classTeacher.map((item) => {
            return (
              <ClassCard
                key={item.id}
                id={item.id}
                name={item.name}
                desc={item.desc}
                teacherName={item.teacher.name}
                teacherAvatar={item.teacher.avatar}
              />
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="home__class">
        <div className="home__class--title">Lớp đã đăng ký học</div>
        <div className="home__class--item">
          {classStudent.map((item) => {
            return (
              <ClassCard
                key={item.id}
                id={item.id}
                name={item.name}
                desc={item.desc}
                teacherName={item.teacher.name}
                teacherAvatar={item.teacher.avatar}
              />
            );
          })}
        </div>
      </div>
          </>
        }
      
      </div>
    </>
  );
}

export default Home;
