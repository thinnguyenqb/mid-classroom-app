import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { activationEmail } from "../../redux/actions/authAction";
import { Paper, Grid, Box } from "@mui/material";
import "./styles.scss";

function ActivationEmail() {
  const { activation_token } = useParams();
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activation_token) {
      dispatch(activationEmail(activation_token));
    }
  }, [activation_token, dispatch]);

  return (
    <div className="layout-active">
      {alert.success ? (
        <Paper>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Box
              component="img"
              sx={{
                width: "70%",
              }}
              alt="The house from the offer."
              src="https://binaryoptionswiki.com/photos/iq-option/how-to-sign-up-and-login-account-in-iq-option-3.jpg"
            />
          </Grid>
        </Paper>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ActivationEmail;
