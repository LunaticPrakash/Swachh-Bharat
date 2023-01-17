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

const DriverUserProfilePage = () => {

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userId : null;
    const isDriver = user.roles.forEach((r) => {
        if (r["roleName"] === "DRIVER_USER") return true;
        return false;
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(user ? user.name : "");
    const [username, setUsername] = useState(user ? user.username : "");
    const [password, setPassword] = useState("");
    const [mobNumber, setMobNumber] = useState(user ? user.mobNumber : "");
    const [address, setAddress] = useState(user ? user.address : "");
    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});

    let allCountries = [];
    Country.getAllCountries().forEach((country) => {
        allCountries = [
            ...allCountries,
            { id: country.isoCode, name: country.name },
        ];
    });

    const getStatesOfCountry = (countryId) =>
        State.getStatesOfCountry(countryId).map((state) => {
            return { id: state.isoCode, name: state.name };
        });

    const getCitiesOfState = (countryId, stateId) =>
        City.getCitiesOfState(countryId, stateId).map((city) => {
            return { name: city.name };
        });

    const addCityButtonHandler = () => {

    }

    const submitHandler = () => {
        // e.preventDefault();
        const user = {
            name: name,
            username: username,
            password: password,
            mobNumber: mobNumber,
            address: address,
            coinsEarned: 0,
            pickupCities: [city.name]
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
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">City - 1</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">City - 2</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">City - 3</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">City - 4</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
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
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Pickup Cities</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <Form onSubmit={addCityButtonHandler} className="addLocation__form">
                                            <div>
                                                <label htmlFor="country-select">Choose Country:</label>
                                                <Form.Select
                                                    defaultValue={""}
                                                    aria-label="Choose Country"
                                                    id="country-select"
                                                    onChange={(e) => {
                                                        setCountry(JSON.parse(e.target.value));
                                                    }}
                                                >
                                                    <option value="" disabled>Choose Country</option>
                                                    {allCountries ? (
                                                        allCountries.map((country, index) => (
                                                            <option key={index} value={JSON.stringify(country)}>
                                                                {country.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="" disabled>No countries to display</option>
                                                    )}
                                                </Form.Select>
                                            </div>
                                            <div className="my-3">
                                                <label htmlFor="state-select">Choose State:</label>
                                                <Form.Select
                                                    defaultValue={""}
                                                    aria-label="Choose State"
                                                    id="state-select"
                                                    onChange={(e) => {
                                                        setState(JSON.parse(e.target.value));
                                                    }}
                                                >
                                                    <option value="" disabled>Choose State</option>
                                                    {Object.keys(country).length ? (
                                                        getStatesOfCountry(country.id).map((state, index) => (
                                                            <option key={index} value={JSON.stringify(state)}>
                                                                {state.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="" disabled>No states to display</option>
                                                    )}
                                                </Form.Select>
                                            </div>

                                            <div className="my-3">
                                                <label htmlFor="city-select">Choose City:</label>
                                                <Form.Select
                                                    defaultValue={""}
                                                    aria-label="Choose City"
                                                    id="city-select"
                                                    onChange={(e) => {
                                                        setCity(JSON.parse(e.target.value));
                                                    }}
                                                >
                                                    <option value="">Choose City</option>
                                                    {Object.keys(country).length && Object.keys(state).length ? (
                                                        getCitiesOfState(country.id, state.id).map((city, index) => (
                                                            <option key={index} value={JSON.stringify(city)}>
                                                                {city.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="" disabled>No cities to display</option>
                                                    )}
                                                </Form.Select>
                                            </div>
                                            <div style={{ width: "fit-content", margin: "auto" }}>
                                                <Button
                                                    className="my-3 addLocation__form__btn"
                                                    type="submit"
                                                    variant="primary"
                                                    onClick={addCityButtonHandler}
                                                >
                                                    {"Add"}
                                                </Button>
                                            </div>
                                        </Form>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverUserProfilePage