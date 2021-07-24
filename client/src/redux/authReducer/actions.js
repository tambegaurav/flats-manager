import axios from "axios";
import {
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQ,
  SIGNOUT,
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import { setData } from "../../utils/localStorage";

export const signinReq = () => {
  return {
    type: SIGNIN_REQ,
  };
};

export const signinSuccess = (payload) => {
  return {
    type: SIGNIN_SUCCESS,
    payload,
  };
};

export const signinFailure = (message) => {
  return {
    type: SIGNIN_FAILURE,
    payload: message,
  };
};

export const signout = () => {
  return {
    type: SIGNOUT,
  };
};

export const signupReq = () => {
  return {
    type: SIGNUP_REQ,
  };
};

export const signupSuccess = (payload) => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};

export const signupFailure = (message) => {
  return {
    type: SIGNUP_FAILURE,
    payload: message,
  };
};

//signin logic
export const signin = (data) => (dispatch) => {
  dispatch(signinReq());
  return axios
    .post(`http://localhost:5000/users/signin`, data)
    .then((res) => {
      // console.log(res);
      setData("flatsUser", res.data);
      setData("flatsUserIsAuth", true);
      dispatch(signinSuccess(res.data));
    })
    .catch((err) => {
      //   console.log(err.response);
      dispatch(signinFailure(err.response.data.message));
    });
};

//signup
export const signup = (data) => (dispatch) => {
  dispatch(signupReq());
  return axios
    .post(`http://localhost:5000/users/signup`, data)
    .then((res) => {
      // console.log(res);
      // setData("yourStoryUser", res.data);
      // setData("yourStoryUserIsAuth", true);
      dispatch(signupSuccess(res.data));
    })
    .catch((err) => {
      //   console.log(err.response);
      dispatch(signupFailure(err.response.data.message));
    });
};
