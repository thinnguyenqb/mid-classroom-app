import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import Snackbar from '../Snackbar/Snackbar'

const Alert = () => {
  const { alert } = useSelector(state => state)
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    const checkAlert = () => {
      if (alert.error || alert.success)
      setSnackbar(true)
    }
    checkAlert()
    
  }, [alert])


  return (
    <div>
      {/* {alert.loading && <Loading/>}  */}
      
      {
        alert.error && 
        <Snackbar
          open={snackbar}
          setOpen={setSnackbar}
          bgColor="error"
          msg={alert.error}
        />
      }
      {
        alert.success && 
        <Snackbar
          open={snackbar}
          setOpen={setSnackbar}
          bgColor="success"
          msg={alert.success}
        />
      }
    </div>
  )
}

export default Alert
