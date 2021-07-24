import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { signin } from "../../redux/authReducer/actions";

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
  margin-top: 100px;

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
  padding-top: 100px;
`;

const SigninPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const isError = useSelector((state) => state.auth.isError);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("gaurav@gmail.com");
  const [password, setPassword] = useState("test@123");

  const handleLogin = () => {
    const credentials = {
      email,
      password,
    };

    dispatch(signin(credentials)).then(() => {
      console.log("done");
    });
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
        <Button loading={isLoading} onClick={handleLogin} title={"Sign in as Manager"} />
        <p>
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </p>
        {isError && <h3>{errorMessage}</h3>}
      </FormBox>
    </Wrapper>
  );
};

export default SigninPage;
