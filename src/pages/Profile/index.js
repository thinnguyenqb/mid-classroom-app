import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "./styles.scss";
import Drawer from "../../components/Drawer/Drawer";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { isLength, isMatch } from "../../components/Validation/Validation";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../components/Notification/Notification";

const initialState = {
  name: "",
  fullname: "",
  gender: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const auth = useSelector((status) => status.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const { name, fullname, gender, password, cf_password, err, success } = data;

  
  
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(data);
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_URL}/api/upload_avatar`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setAvatar(res.data.url);
    } catch (err) {
      // setData({...data, err: err.response.data.msg , success: ''})
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        `${API_URL}/user/update`,
        {
          name: name ? name : user.name,
          fullname: fullname ? fullname : user.fullname,
          gender: gender ? gender : user.gender,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({
        ...data,
        err: "",
        success: "Updated Information Successfully!",
      });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Password Successfully!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const handleUpdateInfo = () => {
    console.log({ name, fullname, gender, avatar });
    if (name || fullname || gender || avatar) updateInfor();
  };
  const handleUpdatePassword = () => {
    if (password) updatePassword();
  };

  return (
    <>
      <Drawer />
      <div className="profile-wrapper">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
        <div className="profile-header">
          <h2>Personal Information</h2>
        </div>
        <div className="profile-info">
          <div className="user-info">
            <div className="name">{user.name}</div>

            <div className="email">Fullname: {user.fullname}</div>
            <div className="email">
              <span>
                <AlternateEmailRoundedIcon />
              </span>
              {user.email}
            </div>
            <div className="teacher">Giới tính: {user.gender}</div>
            <div className="teacher">Số lượng lớp giảng dạy: 1</div>
            <div className="student">Số lượng lớp tham gia học: 1</div>
          </div>
          <div className="profile-avatar">
            <Avatar
              alt="img-avatar"
              src={user.avatar}
              sx={{ width: 200, height: 200 }}
            />
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                type="file"
                name="file"
                onChange={changeAvatar}
              />
              <Button variant="contained" component="span">
                Update Photo
              </Button>
            </label>
          </div>
        </div>
        <Divider />
        <div className="right">
          <div className="edit-user-info">
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  Update Information
                </Typography>
                <TextField
                  required
                  id="outlined-multiline-flexible"
                  label="Email"
                  defaultValue="Hello World"
                  disabled
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={user.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Username"
                  name="name"
                  defaultValue={user.name}
                  onChange={handleChangeInput}
                />
                <TextField
                  id="outlined"
                  label="Fullname"
                  name="fullname"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  defaultValue={user.fullname}
                  onChange={handleChangeInput}
                />

                <FormControl component="fieldset" style={{ marginTop: "10px" }}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row aria-label="gender">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      name="gender"
                      onChange={handleChangeInput}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      name="gender"
                      onChange={handleChangeInput}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      name="gender"
                      onChange={handleChangeInput}
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={handleUpdateInfo}
                >
                  Save Changes
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" component="h5">
                  Change Password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  name="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  onChange={handleChangeInput}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Confirm Password"
                  name="cf_password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  onChange={handleChangeInput}
                />
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    variant="contained"
                    style={{ marginTop: "20px" }}
                    onClick={handleUpdatePassword}
                  >
                    Save Changes
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
