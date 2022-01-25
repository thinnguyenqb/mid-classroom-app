import React, {useState, useEffect} from "react";
import { Grid, Typography, Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";

const GradeStructure = ({ class_id }) => {
  const [assignment, setAssignment] = useState([]);
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token && class_id) {
      setLoading(true)
      axios
        .get(
        process.env.REACT_APP_USER_BASE_URL + 
        `/exercise/list-exercise/${class_id}`,{
          headers: { Authorization: token },
        })
        .then((res) => {
          setAssignment(res.data);
          setLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [token, class_id]);

  return (
    <div>
      {loading ? 
        <Box sx={{ width: '100%' }}>
          <Skeleton animation="wave" height={40}/>
        </Box>
      :
        <>
          {assignment.length > 0 ? (
            <Grid container direction="column" sx={{ mt: 1 }}>
              {assignment.map((grade, index) => (
                <Grid
                  item
                  sx={{
                    padding: 0.75,
                    "&:first-of-type": {
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                    },
                    "&:last-of-type": {
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px",
                    },
                    "&:nth-of-type(odd)": {
                      background: "#ededed",
                    },
                  }}
                  key={index}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={6} sx={{ pb: '0px'}}>
                      <Typography>{grade.name}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right", color: '#3f51b5'}}>
                      <Typography>{grade.point}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ paddingTop: 2 }}>
              <p style={{ fontSize: "0.875rem" }}>Chưa có bài tập</p>
            </Box>
          )}
        </>  
      }
    </div>
  );
};

export default React.memo(GradeStructure);