import React from "react";
import { Switch, Route } from "react-router-dom";
import AddFlat from "./pages/AddFlat";
import AddResident from "./pages/AddResident/AddResident";
import FlatDetails from "./pages/FlatDetails/FlatDetails";
import Home from "./pages/Home";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
      <PrivateRoute exact path="/flat/add">
        <AddFlat />
      </PrivateRoute>

      <PrivateRoute exact path="/flat/:id">
        <FlatDetails />
      </PrivateRoute>

      <PrivateRoute exact path="/:flat_id/resident/add">
        <AddResident />
      </PrivateRoute>

      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/signin">
        <SigninPage />
      </Route>
    </Switch>
  );
};

export default Routes;
