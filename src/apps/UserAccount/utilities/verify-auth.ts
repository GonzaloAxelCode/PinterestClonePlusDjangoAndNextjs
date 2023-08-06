export function validarEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === "" ? "" : regex.test(email) ? "" : "Email not found";
}

export function validateUsername(username: string) {
  const maxLength = 15;
  const lengthMessage = `Maximum of ${maxLength} characters`;
  const invalidCharMessage =
    "Invalid characters: spaces, special characters or hyphens are not allowed";
  return username === ""
    ? ""
    : username.length > maxLength
    ? lengthMessage
    : !/^[a-zA-Z0-9]+$/.test(username)
    ? invalidCharMessage
    : "";
}



export function validatePassword(password: string) {
  const lengthMessage = "Minimum of 8 characters";
  const lowercaseMessage = "At least 1 lowercase letter";
  const uppercaseMessage = "At least 1 uppercase letter";
  const numberMessage = "At least 1 number";
  const specialCharMessage = "At least 1 special character";
  return password === ""
    ? ""
    : password.length < 8
    ? lengthMessage
    : !/[a-z]/.test(password)
    ? lowercaseMessage
    : !/[A-Z]/.test(password)
    ? uppercaseMessage
    : !/[0-9]/.test(password)
    ? numberMessage
    : !/[\W_]/.test(password)
    ? specialCharMessage
    : "";
}

export function validateRePassword(password: string, re_password: string) {
  return password.trim() === re_password.trim() ? "" : "No es igual";
}
