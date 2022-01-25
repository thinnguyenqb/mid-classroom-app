import React from "react"
import { IconButton } from "@material-ui/core"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function CopyClipboard({classCode}) {
  const [alertOpen, setAlertOpen] = React.useState(false)

  return (
    <>
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(classCode);
          setAlertOpen(true);
        }}
      >
        <ContentCopyIcon />
      </IconButton>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
        >
          Invite code copied to clipboard
        </Alert>
      </Snackbar>
    </>
  )
}