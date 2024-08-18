export const checkValidData = (name, email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password
  );

  if (name !== undefined && name.length === 0) return "Name is required";
  if (!isEmailValid) return "Invalid email address";
  if (!isPasswordValid)
    return "Minimum eight characters, at least one letter and one number";

  return null;
};
