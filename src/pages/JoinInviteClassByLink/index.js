import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector } from "react-redux";

function JoinInviteClassByLink() {
  const { id, join_token } = useParams();
  console.log({ id, join_token });
  const [data, setData] = useState({});
  const [teacher, setTeacher] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("access_token");
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const { data: classInfo } = await axios.get(
            `${API_URL}/classroom/detail/${id}`,
            {
              headers: { Authorization: token },
            }
          );
          setData(classInfo);
          setTeacher(classInfo.teacher[0])
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
  }, [history, token, id]);

  const handleJoin = () => {
    const data = {
      token: join_token,
      email: user.email,
    };
    axios
      .post(`${API_URL}/classroom/create-student`, data, {
        headers: { Authorization: token },
      })
      .then((result) => {
        console.log(result);
        alert(result.data.msg);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <div className="home">
        <div className="home__class">
          <div className="home__class--title">Tham gia lớp theo lời mời</div>
          <div className="home__class--item">
            <li className="card__list">
              <div className="card__wrapper">
                <div className="card__container">
                  <div className="card__imgWrapper" />
                  <div className="card__image" />
                  <div className="card__content">
                    <h5 style={{ color: "white" }}>{data.name}</h5> 
                    <p className="card__owner">{teacher.name} </p>
                  </div>
                </div>
                <Avatar className="card__avatar" src={teacher.avatar} />
              </div>
              <div className="card__bot">
                <Link to="/">
                  <Button>Don't Join</Button>
                </Link>
                <Button onClick={handleJoin}>Join</Button>
              </div>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinInviteClassByLink;
