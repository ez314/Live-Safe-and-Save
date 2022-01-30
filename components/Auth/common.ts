export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return email.match(regex);
}
export function validatePassword(password: string) {
  return password.length >= 6;
}
