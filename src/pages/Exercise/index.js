import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.scss";
function Exercise() {
  return (
    <div className="container">
      <div className="btn-exit">
        <IconButton aria-label="Exit Edit Grade Structure">
          <HighlightOffIcon color="error" />
        </IconButton>
      </div>

      <div className="content">
        <h2>Grade Structure</h2>
        <p>Edit your classroom grade structure</p>
      </div>
      <div className="form-grade">
        <div className="grid grid-left">
          <div className="form-creator-content">
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Title"
                variant="filled"
                fullWidth
              />
            </div>
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Detail"
                variant="filled"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className=" grid grid-right">
          <div>
            <button className="btn btn-edit">
              <EditIcon />
            </button>
          </div>
          <div>
            <button className="btn btn-delete">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="form-grade">
        <div className="grid grid-left">
          <div className="form-creator-content">
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Title"
                variant="filled"
                fullWidth
              />
            </div>
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Detail"
                variant="filled"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className=" grid grid-right">
          <div>
            <button className="btn btn-save">
              <SaveIcon />
            </button>
          </div>
          <div>
            <button className="btn btn-delete">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="form-creator">
        <div className="grid grid-left">
          <div className="form-creator-content">
            <h2>Form Creator</h2>
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Title"
                variant="filled"
                fullWidth
              />
            </div>
            <div className="input">
              <TextField
                required
                id="filled-required"
                label="Grade Detail"
                variant="filled"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="grid grid-right">
          <div>
            {/* <Button color="white" aria-label="AddCircleOutlineIcon">
              <AddCircleOutlineIcon />
            </Button> */}
            <button className="bth btn-add">
              <AddCircleOutlineIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
