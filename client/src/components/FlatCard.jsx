/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const FlatCardWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #d8d8d8;
  display: grid;
  grid-template-columns: 3fr 3fr;
  border-radius: 10px;
  gap: 20px;
  padding: 20px;

  & .flatImage {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    & > img {
      height: 100%;
      width: 100%;
    }
  }

  & .flatData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

const FlatCard = ({ flat }) => {
  const { type, block, number, images_urls, _id, manager_id } = flat;

  const [residents, setResidents] = useState([]);
  const history = useHistory();

  console.log(_id);
  //   console.log(images_urls[1]);
  // let imgurl = images_urls[0];

  //   imgurl = "http://localhost:5000" + imgurl;

  const handleClick = () => {
    history.push("/flat/" + _id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    axios.delete(`http://localhost:5000/flats/${_id}`).then(() => {});
    window.location.href = "/";
    console.log("deleting");
  };

  const handleEdit = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/residents/${manager_id}/${_id}`)
      .then((res) => {
        // console.log(res.data.data);
        setResidents(res.data.data);
      });
  }, []);

  return (
    <FlatCardWrapper onClick={handleClick}>
      <div className="flatImage">
        <img
          src={
            "https://q-xx.bstatic.com/xdata/images/hotel/840x460/188606278.jpg?k=fb6acb7ccfe625d4b696151c0c26cb4737d5b9dac8675871b14f0dbfb66956bf&o="
          }
          alt="flatImages"
        />
      </div>
      <div className="flatData">
        <h2>Block: {block}</h2>
        <h3>Flat Number: {number}</h3>
        <h4>Type: {type}</h4>
        <h3>Number of residents: {residents.length} </h3>
        <Button title="Edit" onClick={handleEdit} />
        <Button title="Delete" onClick={handleDelete} />
      </div>
    </FlatCardWrapper>
  );
};

export default FlatCard;
