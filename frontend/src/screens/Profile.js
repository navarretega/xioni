import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout, getUserDetails, updateUserProfile } from "../actions/userActions";

function Profile({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  let { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails("profile"));
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (history.location.pathname === "/profile" && success) {
      setSuccessMsg("");
    }
  }, [history, success]);

  function logoutHandler() {
    dispatch(logout());
    history.push("/login");
  }

  function submitHandler() {
    if (password !== confirmPassword) {
      setPassErr("Passwords do not match!");
      setSuccessMsg("");
    } else {
      if (name || email || password) {
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
        setPassErr("");
        setSuccessMsg("Your profile has been updated");
      }
    }
  }

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex="0">
      <div className="pt-2 pb-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between">
          <h1 className="text-2xl font-semibold text-blue-900 tracking-wider uppercase">Your profile</h1>
          <p className="font-semibold text-blue-800 cursor-pointer" onClick={logoutHandler}>
            Sign out
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4 flex w-full justify-between">
            <div style={{ width: "25%" }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    className="py-2 px-2 bg-gray-100 block w-full sm:text-sm sm:leading-5"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    className="py-2 px-2 bg-gray-100 block w-full sm:text-sm sm:leading-5"
                    placeholder="john@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    type="password"
                    className="py-2 px-2 bg-gray-100 block w-full sm:text-sm sm:leading-5"
                    placeholder="***************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-5 text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    type="password"
                    className="py-2 px-2 bg-gray-100 block w-full sm:text-sm sm:leading-5"
                    placeholder="***************"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="py-2 block w-full">
                {error ? (
                  <p className="text-sm text-red-600 ">{error}</p>
                ) : passErr ? (
                  <p className="text-sm text-red-600 ">{passErr}</p>
                ) : success ? (
                  <p className="text-sm text-green-600 ">{successMsg}</p>
                ) : null}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={submitHandler}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="bg-red-200" style={{ width: "65%" }}>
              S2
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
