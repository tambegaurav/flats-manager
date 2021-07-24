import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, path }) => {
  //Check user in redux
  //if user in undefined && isAuth is false redirect to SigninPage

  //if user , Route is valid

  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? (
    <Route exact path={path}>
      {children}
    </Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
