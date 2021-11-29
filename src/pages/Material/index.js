import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./styles.scss";
import Announcment from "../../components/Announcment/Announcment";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from '../../utils/config'
import { useParams } from "react-router-dom";
import PaginationMenu from "../../components/PaginationMenu/PaginationMenu";

const Material = () => {
  const { id } = useParams()

  const [ classes, setClasses ] = useState([]);
  const token = useSelector((state) => state.token);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [teacherName, setTeacherName] = useState("");
  //const [image, setImage] = useState(null);
  
  useEffect(() => {
    axios
      .get(`${API_URL}/classroom/detail/${id}`, {
        headers: { Authorization: token }
      })
      .then(result => {
        setClasses(result.data)
        setTeacherName(result.data.teacher.name)
      })
      .catch(err=>{
        console.log(err)
      })
    }, [token, id]);
    
    const handleChange = (e) => {
      // if (e.target.files[0]) {
      //   setImage(e.target.files[0]);
      // }
    };
    
  return (
    <>
      <div className="material">
        <div className="material__wrapper">
          <div className="material__content">
            <div className="material__wrapper1">
              <div className="material__bgImage">
                <div className="material__emptyStyles" />
              </div>
              <div className="material__text">
                <h1 className="material__heading material__overflow">{classes.name}</h1>
                <div className="material__section material__overflow">{classes.desc}</div>
                <div className="material__wrapper2">
                  <em className="material__code">Topic :</em>
                  <div className="material__id">{classes.topic}</div>
                  <em className="material__code" style={{marginLeft: "20px"}}>- Room :</em>
                  <div className="material__id">{classes.room}</div>
                </div>
                <div className="material__wrapper2">
                  
                  <em className="material__code">Teacher :</em>
                  <div className="material__id">{teacherName}</div>
                </div>
                <div className="material__wrapper2">
                  <em className="material__code">Class Code :</em>
                  <div className="material__id">{classes.id}</div>
                </div>
                
              </div>
              <div className="material__button">
                <PaginationMenu id={id}/>
              </div>
            </div>
          </div>
          
          <div className="material__announce">
            <div className="material__status">
              <p>Upcoming</p>
              <p className="material__subText">No work due</p>
            </div>
            <div className="material__announcements">
              <div className="material__announcementsWrapper">
                <div className="material__ancContent">
                  {showInput ? (
                    <div className="material__form">
                      <TextField
                        id="filled-multiline-flexible"
                        multiline
                        label="Announce Something to class"
                        variant="filled"
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="material__buttons">
                        <input
                          onChange={handleChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                        />

                        <div>
                          <Button onClick={() => setShowInput(false)}>
                            Cancel
                          </Button>

                          <Button color="primary" variant="contained">
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="material__wrapper100"
                      onClick={() => setShowInput(true)}
                    >
                      <Avatar />
                      <div>Announce Something to class</div>
                    </div>
                  )}
                </div>
              </div>
              <Announcment  />
              <Announcment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Material;
