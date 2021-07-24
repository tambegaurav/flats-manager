import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 3px solid #bdbdbd;
  border-right: 3px solid #bdbdbd;
  border-bottom: 3px solid #bdbdbd;
  border-left: 3px solid white;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export default Spinner;
