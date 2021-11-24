import {
  Button,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import axios from "axios";
import { API_URL } from "../../../utils/config";

const initialState = {
  username: "",
  fullname: "",
  gender: "",
  avatar: "",
  err: "",
  success: "",
};

function EditUserInfor() {
  const auth = useSelector((status) => status.auth);
  const token = useSelector((status) => status.token);

  const [user, setUser] = useState(auth.user);
  console.log("Test thogn tin user");
  console.log(user);
  // const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/infor`, {
        headers: { Authorization: token },
      })
      .then((result) => {

        console.log("lay tu req");
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${API_URL}/user/update`, user, {
        headers: { Authorization: token },
      });

      setUser({ ...user, err: "", success: res.data.msg });

      alert("update success");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value, err: "", success: "" });
    console.log(value);
  };

  return (
    <div className="user-info-wrapper">
      <h2>MY ACCOUNT</h2>

      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Username"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
            name="name"
            value={user.name}
            onChange={handleChangeInput}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Fullname"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
            name="fullname"
            value={user.fullname}
            onChange={handleChangeInput}
          />
           {/* <TextField
            id="outlined-multiline-flexible"
            label="Student ID"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
            name="fullname"
            value={user.fullname}
            onChange={handleChangeInput}
          /> */}
         
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset" className="formcontrol">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              onChange={handleChangeInput}
              defaultChecked={user.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                checked={user.gender === "female"}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                checked={user.gender === "male"}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                checked={user.gender === "other"}
                // {user.gender==value &&checked}
              />
            </RadioGroup>
          </FormControl>

          <div>
            <Button
              type="primary"
              shape="round"
              variant="contained"
              onClick={handleSubmit}
            >
              UPDATE
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditUserInfor;
