import React from "react";
import styled from "styled-components";
import globalStyles from "../utils/globalStyles";
import Spinner from "./Spinner";

const StyledButton = styled.button`
  width: 100%;
  font-size: 22px;
  max-width: 400px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  background-color: ${globalStyles.buttonColor};
  color: #f0f0f0;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  max-height: 30px;

  :hover,
  :active {
    background-color: ${globalStyles.buttonHover};
  }
`;

const Button = ({ title, onClick, loading, style }) => {
  return (
    <StyledButton style={style} onClick={onClick}>
      {loading ? <Spinner /> : title}
    </StyledButton>
  );
};

export default Button;
