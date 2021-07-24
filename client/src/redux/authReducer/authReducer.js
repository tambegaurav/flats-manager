import {
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQ,
  SIGNOUT,
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionTypes";
import { loadData } from "../../utils/localStorage";

let user = loadData("flatsUser");
let isAuth = loadData("flatsUserIsAuth");

const init = {
  user: user || null,
  isAuth: isAuth || false,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const authReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SIGNIN_REQ: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        user: null,
        isAuth: false,
      };
    }

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload,
      };
    }

    case SIGNIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        user: null,
        errorMessage: payload,
      };
    }

    case SIGNUP_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: null,
        isAuth: false,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        user: null,
        isAuth: false,
        errorMessage: payload,
      };
    }

    case SIGNOUT: {
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};
