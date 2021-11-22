import React, { useState, useEffect } from "react";
import { Dialog, Slide } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import UserCard from "../UserCard/UserCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PeopleClass = (props) => {
  const { peopleDiglog, setPeopleDiglog, id } = props;
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios
      .get(`${API_URL}/classroom/detail/${id.id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        //console.log(result)
        setTeacher(result.data.teacher)
        setStudents(result.data.students)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id.id]);


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
            <div className="peopleClass__table-header">Teacher</div>
            <div className="">
              <Divider />
              <UserCard teacher={teacher}/>
            </div>
          </div>
          <div className="peopleClass__table">
            <div className="peopleClass__table-header">
              <span>Students</span>
              <span style={{fontSize: "18px", color: "#1967d2"}}>{students.length} Member</span>
            </div>
            <div className="">
              <Divider />
              {
                students.map((item) => {
                  return (
                    <UserCard key={item.id} id={item.id} teacher={item} />
                  );
                })
              }
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default PeopleClass;
