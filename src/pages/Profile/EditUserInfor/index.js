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
import React from "react";
//import { useSelector } from "react-redux";
import "./styles.scss";

// const initialState = {
//   username: "",
//   password: "",
//   cf_password: "",
//   err: "",
//   success: "",
// };

function EditUserInfor() {
  // const auth = useSelector((status) => status.auth);
  // const token = useSelector((status) => status.token);

  // const { user } = auth;
  // const [data, setData] = useState(initialState);
  // const { name, password, cf_password, err, success } = data;

  // const [avatar, setAvatar] = useState(false);
  // const [loading, setLoading] = useState(false);

  return (
    <div className="user-info-wrapper">
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="email"
            multiline
            fullWidth
            disabled
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Username"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Fullname"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Password"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Confirm Password"
            multiline
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
              htmlType="submit"
              shape="round"
              variant="contained"
            >
              Cập nhật thông tin
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditUserInfor;
