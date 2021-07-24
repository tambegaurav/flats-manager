import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { addFlat } from "../../redux/flatReducer/actions";
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

const AddFlat = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [block, setBlock] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");

  const handleAddFlat = () => {
    const flatData = {
      block,
      number,
      type,
    };

    dispatch(addFlat({ flatData, token: user.token })).then(() => {
      console.log("Flat Added");
    });

    setBlock("");
    setNumber("");
    setType("");
  };

  return (
    <Wrapper>
      <Title>Apartment Flats Manager</Title>

      <FormBox>
        <Input
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          placeholder={"Tenant Type"}
        />

        <Input
          value={block}
          onChange={(e) => {
            setBlock(e.target.value);
          }}
          placeholder={"Block"}
        />
        <Input
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          type="number"
          placeholder={"Flat Number"}
        />
        <Button loading={""} onClick={handleAddFlat} title={"Add New Flat"} />

        {/* {isError && <h3>{errorMessage}</h3>} */}
      </FormBox>
    </Wrapper>
  );
};

export default AddFlat;
