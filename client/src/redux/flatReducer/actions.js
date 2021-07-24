import axios from "axios";
import {
  FLATS_GET_FAILURE,
  FLATS_GET_REQ,
  FLATS_GET_SUCCESS,
  ADD_FLAT_SUCCESS,
  ADD_FLAT_FAILURE,
  ADD_FLAT_REQ,
} from "./actionTypes";

export const flatsGetReq = () => {
  return {
    type: FLATS_GET_REQ,
  };
};

export const flatsGetSuccess = (payload) => {
  return {
    type: FLATS_GET_SUCCESS,
    payload,
  };
};

export const flatsGetFailure = () => {
  return {
    type: FLATS_GET_FAILURE,
  };
};

export const flatAddReq = () => {
  return {
    type: ADD_FLAT_REQ,
  };
};

export const flatAddSuccess = (payload) => {
  return {
    type: ADD_FLAT_SUCCESS,
    payload,
  };
};

export const flatAddFailure = () => {
  return {
    type: ADD_FLAT_FAILURE,
  };
};

export const getFlats = (data) => (dispatch) => {
  dispatch(flatsGetReq());
  const manager_id = data;
  return axios
    .get(`http://localhost:5000/flats/${manager_id}`)
    .then((res) => {
      dispatch(flatsGetSuccess(res.data.data));
    })
    .catch((err) => {
      //   console.log(err.response);
      dispatch(flatsGetFailure());
    });
};

export const addFlat =
  ({ flatData, token }) =>
  (dispatch) => {
    dispatch(flatAddReq());
    return axios
      .post(`http://localhost:5000/flats/add`, flatData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(flatAddSuccess(res.data.data));
      })
      .catch((err) => {
        //   console.log(err.response);
        dispatch(flatAddFailure());
      });
  };
