import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  return (
    <nav className="px-3 mb-4">
      <div className="container nav-wrapper">
      <Link to="/"></Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {token ? (
            <>
            <li>
              <Link to="/login">Logout</Link>
            </li>
            <li>
            <Link to="/writequote">Write Quote</Link>
          </li>
          </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
