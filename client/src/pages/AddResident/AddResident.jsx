import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
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

const AddResident = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  const flat_id = params.flat_id;

  const handleAddResident = () => {
    const residentData = {
      name,
      age,
      gender,
      flat_id,
    };

    setLoading(true);
    setError(false);

    axios
      .post("http://localhost:5000/residents/add", residentData, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    setName("");
    setAge("");
    setGender("");
  };

  return (
    <Wrapper>
      <Title>Apartment Flats Manager</Title>

      <FormBox>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={"Name"}
        />

        <Input
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
          placeholder={"Age"}
        />
        <Input
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
          type="text"
          placeholder={"Gender"}
        />
        <Button
          loading={loading}
          onClick={handleAddResident}
          title={"Add New Resident"}
        />

        {error && <h3>Something went wrong</h3>}
      </FormBox>
    </Wrapper>
  );
};

export default AddResident;
