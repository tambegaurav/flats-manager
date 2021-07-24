import {
  FLATS_GET_FAILURE,
  FLATS_GET_REQ,
  FLATS_GET_SUCCESS,
  ADD_FLAT_SUCCESS,
  ADD_FLAT_FAILURE,
  ADD_FLAT_REQ,
} from "./actionTypes";

const init = {
  flats: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
  flat: null,
};

export const flatReducer = (state = init, { type, payload }) => {
  switch (type) {
    case FLATS_GET_REQ: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    }

    case FLATS_GET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        flats: payload,
      };
    }

    case FLATS_GET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Something went wrong. Try Refreshing the page",
      };
    }

    case ADD_FLAT_REQ: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case ADD_FLAT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        flat: payload,
      };
    }

    case ADD_FLAT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        flat: null,
        errorMessage: "Something went wrong. Please try again",
      };
    }

    default: {
      return state;
    }
  }
};
