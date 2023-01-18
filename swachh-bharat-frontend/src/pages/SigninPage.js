import React, { useEffect, useState } from 'react'
import "./SigninPage.css";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/authActions";
import { useDispatch } from 'react-redux';
import * as authConstants from "../constants/authConstants";
import swal from 'sweetalert';

const SigninPage = () => {
    const [username, setUsername] = useState("driver@gmail.com");
    const [password, setPassword] = useState("12345678");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signinHandler = (e) => {
        e.preventDefault();
        login(dispatch, username, password).then((data) => {
            if (data.type === authConstants.USER_LOGIN_SUCCESS) {
              data.payload.roles.map((r) => {
                if (r["roleName"] === "DRIVER_USER") {
                  return navigate("/driver-dashboard");
                } else {
                  return navigate("/dashboard");
                }
              });
            }
            else {
                swal(
                  "Login Failed!",
                  `User is not logged in yet.\nError : ${data.payload}`,
                  "error"
                );
              }
          });
    }

    useEffect(() => {
        if (localStorage.getItem("jwtToken")) navigate("/dashboard");
    }, []);

    return (
        <div className='signin__container'>
            <div className='signin-form'>
                <h3>Login</h3>
                <div className="signinform__input-field">
                <MdEmail fontSize="20px"/>
                    <input
                        type="email"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="signinform__input-field">
                <BsKeyFill fontSize="20px"/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="forgot-pass-text">Forgot Password?</p>

                <input onClick={signinHandler} type="submit" value="Login" className="signinform-button" />
                <p onClick={() => navigate("/register")} className="signinform-secondary-text primary-color">Register Here</p>

                {/* <span style={{ marginTop: "10px", marginBottom: "5px" }} className="signinform-secondary-text">
                    Social Login
                </span> */}
                {/* <div className="social-icon__container">
                    <a href="#" className="social-icon">
                        <BsFacebook fontSize="30px" />
                    </a>
                    <a href="#" className="social-icon">
                        <BsTwitter fontSize="30px" />
                    </a>
                    <a href="#" className="social-icon">
                        <BsGoogle fontSize="30px" />
                    </a>
                </div> */}
            </div>
        </div>
    )
}

export default SigninPage