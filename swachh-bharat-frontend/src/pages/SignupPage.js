import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./SignupPage.css";
import * as authConstants from "../constants/authConstants";
import { register } from "../actions/authActions";
import swal from "sweetalert";
import { Form } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import { FaMobileAlt, FaLocationArrow } from "react-icons/fa";

const SignupPage = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDriverHandler = () => {
    setIsDriver(!isDriver);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      username: username,
      password: password,
      mobNumber: mobNumber,
      address: address,
      coinsEarned: 0,
    }

    register(dispatch, user, isDriver).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        swal(
          "Registeration Successfull!",
          `${user.name.split(" "[0])} succesfully registered as ${isDriver ? 'driver' : 'normal'} user`,
          "success"
        );
        navigate("/");
      }
      else {
        swal(
          "Registeration Failed!",
          `User is not registered yet.\nError : ${data.payload}`,
          "error"
        );
      }
    });
  }

  return (
    <div className='signup__container' >
      <div className='signup-form'>
        <h3>Register</h3>
        <div className="signupform__input-field">
          <CgProfile fontSize="20px" />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="signupform__input-field">
          <MdEmail fontSize="20px" />
          <input
            type="email"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="signupform__input-field">
          <BsKeyFill fontSize="20px" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signupform__input-field">
          <FaMobileAlt fontSize="20px" />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobNumber}
            onChange={(e) => setMobNumber(e.target.value)}
          />
        </div>
        <div className="signupform__input-field">
          <FaLocationArrow fontSize="20px" />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <Form.Check
          className="my-3 signupform-form-check"
          type="switch"
          id="isDriver-switch"
          label="Register as Driver?"
          onChange={isDriverHandler}
          checked={isDriver}
        />
        <input onClick={signupHandler} type="submit" value="Register" className="signupform-button" />
        <p onClick={() => navigate("/")} className="signupform-secondary-text primary-color">Login Here</p>

      </div>
    </div >
  )
}

export default SignupPage