import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "../actions/userActions";

function Profile({ history }) {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(logout());
    history.push("/login");
  }

  return (
    <>
      <button onClick={logoutHandler}>Sign out</button>
    </>
  );
}

export default Profile;
