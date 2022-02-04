import React, {useState} from "react";
import { Grid, Button, Box } from "@mui/material";
import axios from "axios";
import ControlledEditor from "./ControlledEditor";

const CreatePost = ({ classId, setPost, setAddPost }) => {
  const [content, setContent] = useState("");
  const token = localStorage.getItem("access_token");

  const handleCreatePost = () => {
    axios
      .post(
      process.env.REACT_APP_USER_BASE_URL + 
        `/post/create`,
        {
          content: content,
          classId: classId
        },
        {
        headers: { Authorization: token },
        }
      )
      .then((res) => {
        setAddPost(false)
        setPost(oldPost => [res.data,...oldPost] );
      })
      .catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
      <Box>
        <ControlledEditor value={content} setValue={setContent} />
        <Grid container justifyContent="end" sx={{ marginTop: 2 }}>
          <Button
            sx={{ marginRight: 1 }}
            color="primary"
            aria-label="add"
            onClick={() =>
              setAddPost(false)
            }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            aria-label="add"
            sx={{ backgroundColor: "#3f51b5" }}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default CreatePost;