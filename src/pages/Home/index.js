import React, { useState, useEffect } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../utils/config";
//import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function Home() {
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);
  const history = useHistory();
  //const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  const [loading, setLoading] =useState(false)

  useEffect(() => {
    if (token) {
      const getData = async () => {
        setLoading(true)
        try {
          const { data: teachers } = await axios.get(
            `${API_URL}/classroom/list-teacher`,
            {
              headers: { Authorization: token },
            }
          );

          setClassTeacher(teachers);
          const { data: students } = await axios.get(
            `${API_URL}/classroom/list-student`,
            {
              headers: { Authorization: token },
            }
          );
          setLoading(false)
          setClassStudent(students);
        } catch (error) {
          if (error) {
            if (error.response.status === 401) {
              history.push("/login");
            }
            console.log(error.response.data.msg);
          }
        }
      };
      getData();
    }
  }, [history, token]);

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}><LinearProgress /></Box>
      ) : (
        <div className="home">
          {!token ? (
            <Box sx={{mt: 5, p: 3, borderLeft: '6px solid #3f51b5', backgroundColor: '#b2b9e1', borderRadius: '5px'}}>
              <Typography variant="h4" gutterBottom sx={{ml:2}}>
                Chào mừng bạn đến với Classroom Hcmus 😍💻📒🔎🎓😇
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ml:2}}>
                Hãy đăng nhập để trải nghiệm mô hình giảng dạy và học tập này thôi
                nào!!!
              </Typography>
            </Box>
          ) : (
            <Box sx={{mt: 1}}>
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
            </Box>
          )}
        </div>
      )
      }
    </>
  );
}

export default Home;
