// validation form
const valid = ({ fullname, name, email, password, cf_password }) => {
  var err = '';

  if (!fullname) {
    err = "Please add your full name."; return {errMsg: err}
  } else if (fullname.length > 25) {
    err = "Full name is up to 25 characters long."; return {errMsg: err}
  }

  if (!name) {
    err = "Please add your user name."; return {errMsg: err}
  } else if (!validateUserName(name)) {
    err = "Username must contain 3 to 30 characters. Only letter and number are allowed."; return {errMsg: err}
  }

  if (!email) {
    err = "Please add your email."; return {errMsg: err}
  } else if (!validateEmail(email)) {
    err = "Email format is incorrect."; return {errMsg: err}
  }

  if (!password) { 
    err = "Please add your password."; return {errMsg: err}
  } else if (password.length < 6) {
    err = "Password must be at least 6 characters."; return {errMsg: err}
  }

  if (password !== cf_password) {
    err = "Confirm password did not match."; return {errMsg: err}
  }
  return {errMsg: err};
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateUserName(username){
  var usernameRegex = /^[a-z0-9]{3,30}$/;
  return usernameRegex.test(username);
}

export default valid;
