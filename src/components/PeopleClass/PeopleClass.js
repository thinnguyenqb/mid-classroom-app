import React, { useState, useEffect } from "react";
import { Dialog, Slide } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import UserCard from "../UserCard/UserCard";
import { Tooltip, IconButton } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import InviteMember from "./../InviteMember/InviteMember";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PeopleClass = (props) => {
  const { peopleDiglog, setPeopleDiglog, id } = props;
  const [showInviteDiglog, setShowInviteDiglog] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const [students, setStudents] = useState([]);
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem('access_token');
  const handleCreate = () => {
    setShowInviteDiglog(true);
  };

  const checkTeacher = (user_cur, teacher) => {
    for (let i = 0; i < teacher.length; i++) {
      if (teacher[i].teacherId === user_cur)
        return true
    }
    return false
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/classroom/detail/${id.id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setTeacher(result.data.teacher);
        setStudents(result.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id.id, auth]);
    
  return (
    <div>
      <Dialog
        fullScreen
        open={peopleDiglog}
        onClose={() => setPeopleDiglog(false)}
        TransitionComponent={Transition}
      >
        <div className="peopleClass">
          <div className="peopleClass__wrapper">
            <div
              className="peopleClass__wraper2"
              onClick={() => setPeopleDiglog(false)}
            >
              <Close className="peopleClass__svg" />
              <div className="peopleClass__topHead">Everyone</div>
            </div>
          </div>
          <div className="peopleClass__table">
            <div className="peopleClass__table-header">
              Teacher
              {checkTeacher(auth.user._id, teacher) ? (
                <Tooltip title="Invite">
                  <IconButton color="primary">
                    <PersonAddAlt1Icon />*
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <Divider />
              {teacher.map((item, index) => (
                <div key={index}>
                  <UserCard user={item} isTeacher={true}/>
                </div>
              ))}
            </div>
          </div>
          <div className="peopleClass__table">
            <div className="peopleClass__table-header">
              <span>Students</span>
              <div>
                <span style={{ fontSize: "18px", color: "#1967d2" }}>
                  {students.length} Member
                </span>
                {checkTeacher(auth.user._id, teacher) ? (
                  <Tooltip title="Invite" onClick={handleCreate}>
                    <IconButton color="primary">
                      <PersonAddAlt1Icon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="">
              <Divider />
              {students.map((item, index) => (
                <div key={index}>
                  <UserCard user={item} isTeacher={false}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
      <InviteMember
        showInviteDiglog={showInviteDiglog}
        setShowInviteDiglog={setShowInviteDiglog}
        id={id}
      />
    </div>
  );
};
export default PeopleClass;
