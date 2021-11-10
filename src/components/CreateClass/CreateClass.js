import React, {useState} from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, DialogContent, } from "@material-ui/core";
import './style.css'
import Form from "./Form";

const CreateClass = (props) => {
  const {createClassDiglog, setCreateClassDiglog } = props;
  const [check, setChecked] = useState(false);
  const [showForm, setShowForm] = useState(false)

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      maxWidth={showForm ? "ls" : "xs"}
      className="form__dialog"
      open={createClassDiglog}
    >
      
      {showForm ? (
        <Form />
      ) : (
        <>
          <DialogTitle className="class__title">
            Using Classroom at a school with students?
          </DialogTitle>
          <DialogContent className="class__content">
            <p className="class__text">
              <p>If so, your school must sign up for a free</p>
              <a href="/help" className="class__link">
                G Suite for Education
              </a>
              account before you can use Classroom
              <a href="/learn" className="class__link2">
                Learn More.
              </a>
            </p>
            <p>
              G Suite for Education lets schools decide which Google services
              their students can use, and provides additional
              <a href="/privacy" className="class__link2 class__link">
                privacy and security
              </a>
              protections that are important in a school setting. Students
              cannot use Google Classroom at a school with personal accounts.
            </p>

            <div className="class__checkboxWrapper">
              <Checkbox color="primary" onChange={() => setChecked(!check)}/>
              <p>
                I've read and understand the above notice, and I'm not using
                Classroom at a school with students
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setCreateClassDiglog(false)}>
              Close
            </Button>

            <Button autoFocus color="primary" disabled={!check}
              onClick={() => setShowForm(true)}
            >
              Continue
            </Button>
          </DialogActions>
        </>
      )}
      
    </Dialog>
  )
}

export default CreateClass