import React from "react"
import Button from "@material-ui/core/Button"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function CopyLink({linkInvite}) {
  const [alertOpen, setAlertOpen] = React.useState(false)

  return (
    <>
      <CopyToClipboard text={linkInvite}>
        <Button
          size="large"
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={() => {
            setAlertOpen(true)
          }}
        />
      </CopyToClipboard>

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
          Link copied
        </Alert>
      </Snackbar>
    </>
  )
}