import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../actions/userProfileActions';
import Sidebar from '../../components/sidebar/Sidebar';
import "./DriverUserProfilePage.css";
import * as userProfileConstants from "../../constants/userProfileConstants";
import swal from 'sweetalert';
import { Country, State, City } from "country-state-city";
import FormContainer from '../../components/FormContainer';
import { FcInfo } from "react-icons/fc";

const DriverUserProfilePage = () => {

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userId : null;
    const isDriver = user.roles.map((r) => {
        if (r["roleName"] === "DRIVER_USER") return true;
        return false;
    })[0];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(user ? user.name : "");
    const [username, setUsername] = useState(user ? user.username : "");
    const [password, setPassword] = useState("");
    const [mobNumber, setMobNumber] = useState(user ? user.mobNumber : "");
    const [address, setAddress] = useState(user ? user.address : "");
    const [pickupCities, setPickupCities] = useState(user && isDriver && user.pickupCities ? user.pickupCities.toString() : "");


    const submitHandler = (e) => {
        e.preventDefault();
        const user = {
            name: name,
            username: username,
            password: password,
            mobNumber: mobNumber,
            address: address,
            coinsEarned: 0,
            pickupCities: isDriver ? pickupCities.trim().split(",").map(c => c.trim()) : []
        }

        updateUserProfile(dispatch, user, token).then((data) => {
            if (
                data.type === userProfileConstants.UPDATE_USERPROFILE_SUCCESS
            ) {
                localStorage.setItem("user", JSON.stringify(data.payload));
                swal(
                    "User Profile updated!",
                    `${user.name}'s details succesfully updated`,
                    "success"
                );
            } else {
                swal(
                    "User Profile Not Updated!",
                    `${user.name}'s details not updated.\nError: ${data.payload}`,
                    "error"
                );
            }
            navigate(`${isDriver ? "/driver-dashboard" : "/dashboard"}`);
        });
    }

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, [navigate]);

    return (
        <div className="nuserProfilePage__container">
            <div className="container__sidebar">
                <Sidebar />
            </div>
            <div className="container__nuserProfileContent">
                <p style={{ fontSize: "1.5rem", color: "black", margin: "10px" }}>
                    Profile
                </p>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="res/user.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">{user.address}</p>
                                        <p className="text-muted font-size-sm">{user.mobNumber}</p>
                                        {/* <button className="btn btn-primary">Follow</button>
                                            <button className="btn btn-outline-primary">Message</button> */}
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <h5>Pickup Cities</h5>
                                <ul className="list-group list-group-flush">
                                    {
                                        user && isDriver && user.pickupCities.map((c, index) => {
                                            return (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">{`City - ${index + 1}`}</h6>
                                                    <span className="text-secondary">{c}</span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={username}
                                            onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Password</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile Number</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={mobNumber}
                                            onChange={(e) => setMobNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={address}
                                            onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                </div>
                                {isDriver && <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Pickup Cities <FcInfo title='Write cities name separated by comma.'/> </h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" value={pickupCities}
                                            onChange={(e) => setPickupCities(e.target.value)} />
                                    </div>
                                </div>
                                }
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-9 text-secondary">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            onClick={submitHandler}
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DriverUserProfilePage