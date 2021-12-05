import React, { useState, useEffect } from "react";
import { Divider, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector, useDispatch } from "react-redux";
import {
  dispatchGetUser,
  dispatchLogin,
  fetchUser,
} from "../../redux/actions/authAction";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function JoinInviteClass() {
  const [data, setData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { id, email, join_token } = useParams();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  console.log(user.email);
  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
      dispatch({ type: "GET_TOKEN", payload: token });
    }
  }, [token, dispatch]);

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
          console.log(classInfo);
          setData(classInfo);
          setLoading(true);
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
        {!token ? (
          <Typography variant="h5" gutterBottom>
            Nếu bạn chưa có tài khoản thì hãy đăng ký với email đã mời rồi đăng
            nhập lại. Sau đó bạn hãy quay lại link mời trong mail để tham gia
            lớp học này nhé !
          </Typography>
        ) : (
          <>
            <Divider />
            <div className="home__class">
              <div className="home__class--title">
                Tham gia lớp theo lời mời
              </div>
              {!loading ? (
                <CircularProgress disableShrink />
              ) : (
                <>
                  {user.email !== email ? (
                    <Typography variant="h5" gutterBottom>
                      Vui lòng đăng nhập đúng email được mời!
                    </Typography>
                  ) : (
                    <>
                      <div className="home__class--item">
                        <li className="card__list">
                          <div className="card__wrapper">
                            <div className="card__container">
                              <div className="card__imgWrapper" />
                              <div className="card__image" />
                              <div className="card__content">
                                <h2>{data.name}</h2>
                                <p className="card__owner">
                                  {data.teacher.name}
                                </p>
                              </div>
                            </div>
                            <Avatar
                              className="card__avatar"
                              src={data.teacher.avatar}
                            />
                          </div>
                          <div className="card__bot">
                            <Link to="/">
                              <Button style={{ fontSize: "12px" }}>
                                Don't Join
                              </Button>
                            </Link>
                            <Button onClick={handleJoin}>Join</Button>
                          </div>
                        </li>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default JoinInviteClass;
