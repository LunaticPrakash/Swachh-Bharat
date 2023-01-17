import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../actions/userProfileActions';
import Sidebar from '../../components/sidebar/Sidebar';
import "./NormalUserProfilePage.css";
import * as userProfileConstants from "../../constants/userProfileConstants";
import swal from 'sweetalert';

const NormalUserProfilePage = () => {

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userId : null;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(user ? user.name : "");
    const [username, setUsername] = useState(user ? user.username : "");
    const [password, setPassword] = useState("");
    const [mobNumber, setMobNumber] = useState(user ? user.mobNumber : "");
    const [address, setAddress] = useState(user ? user.address : "");

    const submitHandler = () => {
        // e.preventDefault();
        const user = {
            name: name,
            username: username,
            password: password,
            mobNumber: mobNumber,
            address: address,
            coinsEarned: 0
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
            // navigate(`${isDriver ? "/driver-dashboard" : "/dashboard"}`);
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
                                {/* <hr className="my-4" />
                                    <ul className="list-group list-group-flush"> 
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                                            <span className="text-secondary">https://bootdey.com</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                            <span className="text-secondary">bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                            <span className="text-secondary">@bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                            <span className="text-secondary">bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                            <span className="text-secondary">bootdey</span>
                                        </li>
                                    </ul>*/}
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
                        {/* <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="d-flex align-items-center mb-3">Project Status</h5>
                                        <p>Web Design</p>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p>Website Markup</p>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: "72%", ariaValuenow: "72", ariaValueMin: "0", ariaValueMax: "100" }}></div>
                                        </div>
                                        <p>One Page</p>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "89%", ariaValueNow: "89", ariaValueMin: "0", ariaValueMax: "100" }}></div>
                                        </div>
                                        <p>Mobile Template</p>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "55%", ariaValueNow: "55", ariaValueMin: "0", ariaValueMax: "100" }}></div>
                                        </div>
                                        <p>Backend API</p>
                                        <div className="progress" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: "66%", ariaValueNow: "66", ariaValueMin: "0", ariaValueMax: "100" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NormalUserProfilePage