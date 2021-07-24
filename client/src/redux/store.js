import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { courseReducer } from "./Admin/Course/courseReducer";
// import { adminVideoReducer } from "./Admin/Video/adminVideoReducer";
// import { courseDetailsReducer } from "./courseDetails/courseDetailsReducer";
import { flatReducer } from "./flatReducer/flatReducer";
import { authReducer } from "./authReducer/authReducer";

const rootReducer = combineReducers({
  //   course: courseReducer,
  //   adminVideo: adminVideoReducer,
  //   courseDetails: courseDetailsReducer,
  //   userVideo: userVideoReducer,
  auth: authReducer,
  flat: flatReducer,
});

const customThunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(customThunk),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
