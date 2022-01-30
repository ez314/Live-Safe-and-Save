export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function getUser() {
  let user = localStorage.getItem("user")
  if (user) return JSON.parse(user) as UserData
  return undefined
}

export function signOut() {
  localStorage.removeItem("user")
  window.location.reload()
}