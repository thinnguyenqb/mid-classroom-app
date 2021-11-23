import React, {useState, useEffect} from "react";
import "./styles.scss";
import Drawer from "../../components/Drawer/Drawer";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
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
  import axios from "axios"
  import { API_URL } from "../../utils/config";

function UserProfile() {
  const auth = useSelector((status) => status.auth);

  const { user } = auth;
  const handleSubmit = () =>{

  }
  return (
    <Drawer>
      <div className="profile-wrapper">
        <div>
          <Avatar
            alt="img-avatar"
            src={user.avatar}
            sx={{ width: 200, height: 200 }}
          />
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
          <div className="teacher">Số lượng lớp giảng dạy: 10</div>
          <div className="student">Số lượng lớp tham gia học: 3</div>
        </div>
        <div className="right">
          <div>
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
                  value={user.name}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Fullname"
                  multiline
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />

              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <div>
                  <Button
                    type="primary"
                    // htmlType="submit"
                    shape="round"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Cập nhật thông tin
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default UserProfile;
