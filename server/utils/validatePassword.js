 function validatePassword(password) {
  const minLength = 6; // Minimum password length
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/; // Regex for requiring at least one lowercase letter, one uppercase letter, one digit, and one special character

  // Check if password meets complexity requirements
  return password.length >= minLength && regex.test(password);
}

module.exports = validatePassword;