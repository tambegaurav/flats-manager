/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import FlatCard from "../../components/FlatCard";
import Spinner from "../../components/Spinner";
import { signout } from "../../redux/authReducer/actions";
import { getFlats } from "../../redux/flatReducer/actions";
import globalStyles from "../../utils/globalStyles";
import { setData } from "../../utils/localStorage";
import { useHistory } from "react-router-dom";

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  color: white;
  background-color: ${globalStyles.bgColor};
  margin-bottom: 50px;

  & .navBtns {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
const FlatsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.user.user._id);
  const flats = useSelector((state) => state.flat.flats);
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.flat
  );

  const handleLogout = () => {
    dispatch(signout());
    setData("flatsUserIsAuth", false);
    setData("flatsUser", null);
  };

  useEffect(() => {
    dispatch(getFlats(userId));
  }, []);

  return (
    <div>
      <Navbar>
        <h1>Home Page</h1>
        <div className="navBtns">
          <Button
            style={{ width: "150px" }}
            onClick={() => history.push("/flat/add")}
            title="Add new Flat"
          />
          <Button
            style={{ width: "100px" }}
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </Navbar>

      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : isError ? (
        <div>
          <h1>{errorMessage}</h1>
        </div>
      ) : (
        <FlatsWrapper>
          {flats.map((flat) => {
            return <FlatCard key={flat._id} flat={flat} />;
          })}
        </FlatsWrapper>
      )}
    </div>
  );
};

export default Home;
