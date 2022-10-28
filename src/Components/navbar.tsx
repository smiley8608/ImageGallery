import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const Navbar = () => {
  const auth = useAppSelector((state) => state.User.Auth);
  console.log(`Auth ${auth}`);
  
  

  return (
    <div className="tw-w-full tw-bg-blue-500 tw-flex tw-p-4 tw-justify-end tw-space-x-3 tw-absolute">
      {!auth ? (
        <>
          <div className="tw-space-x-3">
            <Link to="/">Home</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">LogIn</Link>
          </div>
        </>
      ) : (
        <>
          <div className="tw-space-x-3">
            <Link to="/">Home</Link>
            <Link to="/allimages">AllImages</Link>
            <Link to="/myimages">MyImages</Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;