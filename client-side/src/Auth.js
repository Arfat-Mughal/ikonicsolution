import {TOKEN} from "./config/constants";

let token = localStorage.getItem(TOKEN)
let auth = false;

if (token) {
  auth = true;
}

export default class Auth {
  isAuthenticated = () => {
    return auth;
  };
}