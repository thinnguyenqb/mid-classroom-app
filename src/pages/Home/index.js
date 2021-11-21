import React, { useState, useEffect } from "react";
import Drawer from "../../components/Drawer/Drawer";
import ClassCard from "../../components/ClassCard/ClassCard";
import { Divider } from "@material-ui/core";

import "./styles.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/config";

function Home() {
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios
      .get(`${API_URL}/classroom/list-teacher`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setClassTeacher(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${API_URL}/classroom/list-student`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setClassStudent(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      <Drawer />
      <div className="home">
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
      </div>
    </>
  );
}

export default Home;
