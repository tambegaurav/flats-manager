import React from "react";
// import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  font-size: 22px;
  max-width: 400px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
`;

const Input = ({ onChange, placeholder, value, type = "text" }) => {
  return (
    <StyledInput
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;

// const StyledInputWrapper = styled.div`
//   & label.Mui-focused {
//     color: #e6e6e6;
//   }
//   & .MuiFormLabel-root {
//     color: #e6e6e6;
//   }
//   & .MuiOutlinedInput-root {
//     color: #e6e6e6;
//     & fieldset {
//       border-color: #e6e6e6;
//     }
//     &:hover fieldset {
//       border-color: #e6e6e6;
//     }
//     &.Mui-focused fieldset {
//       border-color: #e6e6e6;
//     }
//   }
// `;

// <StyledInputWrapper>
//   <TextField
//     label={label}
//     variant="outlined"
//     value={value}
//     onChange={onChange}
//     color="secondary"
//   />
// </StyledInputWrapper>
