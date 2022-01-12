import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Typography,
  Grid,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import CreateAssignment from "./CreateAssignment";
import { useSelector } from "react-redux";

function Exercise() {
  const [teacher, setTeacher] = useState({});
  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [curMenu, setCurMenu] = useState(null);
  const [curAssignment, setCurAssignment] = useState(null);
  const token = localStorage.getItem("access_token");
  const auth = useSelector((state) => state.auth);
  const classId = useParams();

  //handle the menu item]
  const handleClickMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurMenu(event.currentTarget.getAttribute("data-id").toString());
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setCurAssignment(assignment.find((ass) => ass.id === curMenu));
    setOpen(true);
    setAnchorEl(null);
  };
  
  const checkTeacher = (user_cur, teacher) => {
    for (let i = 0; i < teacher.length; i++) {
      if (teacher[i].teacherId === user_cur)
        return true
    }
    return false
  }

  const handleRemove = () => {
    axios
      .put(
        `${API_URL}/exercise/delete`,
        { id: curMenu },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status === 200) {
          setAssignment(assignment.filter((ass) => ass.id !== curMenu));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token) {
      const getTeacher = async () => {
        try {
          const result = await axios.get(
            `${API_URL}/classroom/detail/${classId.id}`,
            {
              headers: { Authorization: token },
            }
          );
          setTeacher(result.data.teacher);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };

      const getData = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/exercise/list-exercise/${classId.id}`,
            {
              headers: { Authorization: token },
            }
          );
          setAssignment(res.data);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      getTeacher();
      getData();
    }
  }, [classId.id, token]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(assignment);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAssignment(items);

    const newArrange = items.map(({ id }, index) => ({ id: id, order: index }));
    if (newArrange && newArrange.length > 0) {
      axios
        .put(
          `${API_URL}/exercise/arrange`,
          {
            classId: classId.id,
            newArrange: newArrange,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{mt: 2}}>
        <Link to={`/class/${classId.id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
      </Box>

      {!assignment.length ? <Typography>Hiện tại không có bài tập</Typography> : <></>}
      <Container sx={{ maxWidth: "850px !important", mt: 2 }}>
        {checkTeacher(auth.user._id, teacher) ? (
          <CreateAssignment
            openState={[open, setOpen]}
            classId={classId.id}
            assignmentState={[assignment, setAssignment]}
            curAssignmentState={[curAssignment, setCurAssignment]}
          />
        ) : (
          <></>
        )}

        <Grid container direction="column" sx={{ mt: 2 }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="assigns">
              {(provided) => (
                <Grid
                  className="characters"
                  item
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {assignment.map(({ id, name, desc, point }, index) => {
                    return (
                      <Draggable
                        key={id}
                        draggableId={id}
                        index={index}
                        styled
                      >
                        {(provided) => (
                          <div>
                            <Accordion
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              // disableGutters={true}
                              sx={{
                                mb: 0.5,
                                border: "1px solid #ddd",
                                boxShadow:
                                  "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                                borderRadius: "0.5rem",
                                "&:not(:hover)": { boxShadow: "none" },
                              }}
                              className="assignment"
                            >
                              <AccordionSummary>
                                <Grid container alignItems="center">
                                  <Avatar sx={{ backgroundColor: "#3f51b5" }}>
                                    <AssignmentOutlinedIcon />
                                  </Avatar>
                                  <Typography
                                    sx={{
                                      ml: 2,
                                      color: "#3c404a",
                                      fontSize: "0.875rem",
                                      letterSpacing: ".01785714em",
                                    }}
                                  >
                                    {name}
                                  </Typography>
                                  {checkTeacher(auth.user._id, teacher) ? (
                                    <IconButton
                                      sx={{
                                        ml: "auto",
                                        height: 40,
                                        width: 40,
                                      }}
                                      className="menu-button"
                                      data-id={id}
                                      onClick={handleClickMenu}
                                    >
                                      <MoreVertOutlinedIcon />
                                    </IconButton>
                                  ) : (
                                    <></>
                                  )}
                                </Grid>
                              </AccordionSummary>
                              <AccordionDetails
                                sx={{ borderTop: "1px solid #ccc", padding: 0 }}
                              >
                                <Grid container direction="row">
                                  <Grid
                                    item
                                    xs={8}
                                    sx={{
                                      p: 2,
                                      pl: 4,
                                      fontSize: "13px",
                                      lineHeight: "20px",
                                      letterSpacing: "normal",
                                      borderRight: "1px dashed #ccc",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                  ></Grid>
                                  <Grid
                                    item
                                    xs={4}
                                    sx={{
                                      p: 2,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      flexDirection: 'column'
                                    }}
                                  >
                                    <Typography variant="h4" gutterBottom component="div">
                                      Điểm
                                    </Typography>
                                    <Typography variant="h5" gutterBottom component="div">
                                      {point}
                                    </Typography>
                                    
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ right: 20 }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleRemove}>Remove</MenuItem>
        </Menu>
      </Container>
    </Grid>
  );
}

export default Exercise;
