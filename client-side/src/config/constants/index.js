export const TOKEN = "TOKEN";
export const AUTH_USER_DATA = "MEGA_USER_DATA";


export const WEB_URL            = process.env.REACT_APP_WEB_URL  || "http://localhost:3000/";
export const SERVER_URL         = process.env.REACT_APP_SERVER_URL || "http://127.0.0.1:8000/";
export const SERVER_API_URL     = process.env.REACT_APP_SERVER_API_URL || "http://127.0.0.1:8000/api/";

export const LOGIN_URL          = SERVER_API_URL+"login";
export const REGISTER_URL       = SERVER_API_URL+"register";
export const GET_AUTH_URL       = SERVER_API_URL+"me";
export const LOGOUT_URL         = SERVER_API_URL+"logout";
export const CONTACTUS_URL      = SERVER_API_URL+"contact-us";
export const PROFILE_UPDATE_URL  = SERVER_API_URL+"update-user-information";
export const FORGET_PASSWORD_URL = SERVER_API_URL+"forget-password";
export const RESET_PASSWORD_URL  = SERVER_API_URL+"reset-password";
export const PROFILE_IMAGE_UPLOAD_URL  = SERVER_API_URL+"upload-user-Image";
