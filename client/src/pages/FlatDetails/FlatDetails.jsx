/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import { signout } from "../../redux/authReducer/actions";
import { setData } from "../../utils/localStorage";
import { Navbar } from "../Home/Home";

const ResidentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  max-width: 500px;
  margin: auto;
  margin-top: 10px;
  padding: 15px;
  border-radius: 10px;

  & .btns {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
  }
`;

const FlatDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = useSelector((state) => state.auth.user.user._id);
  const [residents, setResidents] = useState([]);

  const flat_id = params.id;
  //   console.log(flat_id);
  //   console.log(userId);

  const handleLogout = () => {
    dispatch(signout());
    setData("flatsUserIsAuth", false);
    setData("flatsUser", null);
  };

  const getResidents = () => {
    axios
      .get(`http://localhost:5000/residents/${userId}/${flat_id}`)
      .then((res) => {
        // console.log(res.data.data);
        setResidents(res.data.data);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/residents/${id}`).then(() => {
      getResidents();
    });
  };

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <div>
      <Navbar>
        <h1 onClick={() => history.push("/")}>Home Page</h1>
        <div className="navBtns">
          <Button
            style={{ width: "150px" }}
            onClick={() => history.push(`/${flat_id}/resident/add`)}
            title="Add new Resident"
          />
          <Button
            style={{ width: "100px" }}
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </Navbar>
      <h1 style={{ textAlign: "center" }}>List of Residents</h1>
      {/* {JSON.stringify(residents)} */}
      {residents?.map((el) => (
        <ResidentWrapper>
          <h2>Name: {el.name}</h2>
          <h2>Age: {el.age}</h2>
          <h2>Gender: {el.gender}</h2>
          <div className="btns">
            <Button title="Delete" onClick={() => handleDelete(el._id)} />
            <Button title="Edit" />
          </div>
        </ResidentWrapper>
      ))}
    </div>
  );
};

export default FlatDetails;
