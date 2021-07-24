import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { signup } from "../../redux/authReducer/actions";

import globalStyles from "../../utils/globalStyles";

const Wrapper = styled.div`
  background-color: ${globalStyles.bgColor};
  height: 100vh;
  color: ${globalStyles.fontColor};
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 500px;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  & .link {
    color: ${globalStyles.fontColor};

    :hover,
    :active {
      color: #eeeeee;
    }
  }
`;

const Title = styled.h1`
  font-size: 90px;
  text-align: center;
  padding-top: 10px;
`;

const SignupPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const isError = useSelector((state) => state.auth.isError);
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(userData)).then(() => {
      // console.log(userData);
      history.push("/signin");
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Title>Apartment Flats Manager</Title>

      <FormBox>
        
        <Input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder={"First Name"}
        />
        <Input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder={"Last Name"}
        />

        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={"Email"}
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder={"Password"}
        />
        <Button loading={isLoading} onClick={handleSignup} title={"Sign up as a Manager"} />
        <p>
          Already have an account?
          <Link className="link" to="/signin">
            Sign In
          </Link>
        </p>
        {isError && <h3>{errorMessage}</h3>}
      </FormBox>
    </Wrapper>
  );
};

export default SignupPage;
