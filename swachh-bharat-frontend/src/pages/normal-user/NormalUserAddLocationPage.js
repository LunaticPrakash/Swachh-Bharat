import React, { useEffect, useState } from 'react'
import "./NormalUserAddLocationPage.css";
import Sidebar from '../../components/sidebar/Sidebar';
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { addPickupLocation, fetchPickupLocation, updatePickupLocation } from '../../actions/pickupLocationActions';
import * as pickupLocationConstants from "../../constants/pickupLocationConstants";
import swal from "sweetalert";

const NormalUserAddLocationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const pickLocId = params.id;

    const pickupLocationReducer = useSelector(
        (state) => state.pickupLocationReducer
    );
    const [pickupLocations, setPickupLocations] = useState(pickupLocationReducer.pickupLocations);
    const [oldPickupLocation, setOldPickupLocation] = useState(pickupLocations ?
        pickupLocations.filter(loc => loc.pickLocId == pickLocId)[0] : null);

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
    const [country, setCountry] = useState(oldPickupLocation ? allCountries.filter(c => c.name == oldPickupLocation.country)[0] : {});
    const [state, setState] = useState(oldPickupLocation ? getStatesOfCountry(country.id).filter(s => s.name == oldPickupLocation.state)[0] : {});
    const [city, setCity] = useState(oldPickupLocation ? getCitiesOfState(country.id, state.id).filter(c => c.name == oldPickupLocation.city)[0] : {});
    const [street, setStreet] = useState(oldPickupLocation ? oldPickupLocation.street : "");
    const [landmark, setLandmark] = useState(oldPickupLocation ? oldPickupLocation.landmark : "");
    const [image, setImage] = useState([]);


    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userId : null;
    const isDriver = user.roles.map((r) => {
        if (r["roleName"] === "DRIVER_USER") return true;
        return false;
    })[0];

    const handleImageUpload = (event) => {
        if (event.target.files.length) {
            setImage(URL.createObjectURL(event.target.files[0]));
            const formData = new FormData();
            formData.append("fileupload", event.target.files[0]);

            // fetch("/product/upload", {
            //   method: "POST",
            //   body: formData,
            //   dataType: "jsonp",
            // });
        } else {
            alert("No image selected!");
            setImage([]);
        }
    };

    const getCurrentDateTime = () => {
        var currentdate = new Date();
        return ("0" + currentdate.getDate()).slice(-2) + "-"
            + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
            + currentdate.getFullYear() + " "
            + ("0" + currentdate.getHours()).slice(-2) + ":"
            + ("0" + currentdate.getMinutes()).slice(-2) + ":"
            + ("0" + currentdate.getSeconds()).slice(-2);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const pickupLocation = {
            landmark: landmark,
            street: street,
            city: city.name,
            state: state.name,
            country: country.name,
            dateAdded: getCurrentDateTime(),
            dateCleaned: null,
            status: false,
            userId: userId,
            driverId: null
        }
        if (pickLocId) {
            pickupLocation["pickLocId"] = pickLocId;
            updatePickupLocation(dispatch, pickupLocation, token).then((data) => {
                if (
                    data.type === pickupLocationConstants.UPDATE_PICKUPLOCATION_SUCCESS
                ) {
                    swal(
                        "Pickup Location updated!",
                        `${pickupLocation.city} succesfully updated`,
                        "success"
                    );
                } else {
                    swal(
                        "Pickup Location Not Updated!",
                        `${pickupLocation.city} not updated.\nError: ${data.payload}`,
                        "error"
                    );
                }
                navigate(`${isDriver ? "/driver-dashboard" : "/dashboard"}`);
            });
        } else {
            addPickupLocation(dispatch, pickupLocation, token).then((data) => {
                if (data.type === pickupLocationConstants.ADD_PICKUPLOCATION_SUCCESS) {
                    swal(
                        "Pickup Location Added!",
                        `${pickupLocation.city} succesfully added`,
                        "success"
                    );
                } else {
                    swal(
                        "Pickup Location Not Added!",
                        `Your location not added. \n Error: ${data.payload}`,
                        "error"
                    );
                }
                navigate(`${isDriver ? "/driver-dashboard" : "/dashboard"}`);
            });
        }

    }

    useEffect(() => {
        fetchPickupLocation(dispatch, userId, token).then((data) => {
            const t1 = data.payload
            setPickupLocations(data.payload);

            if (pickLocId) {
                const t2 = t1.filter(loc => loc.pickLocId == pickLocId)[0];
                setOldPickupLocation(t2);
                setStreet(t2.street)
                setLandmark(t2.landmark);
            }
        });
    }, [dispatch, token]);

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, [navigate]);

    return (
        <div className="addLocationPage__container">
            <div className="container__sidebar">
                <Sidebar />
            </div>
            <div className="container__addLocationContent">
                <p style={{ fontSize: "1.5rem", color: "black", margin: "10px" }}>
                    {pickLocId ? "Edit Location" : "Add Location"}
                </p>

                <FormContainer>
                    <Form onSubmit={submitHandler} className="addLocation__form">
                        <div className="my-3">
                            <label htmlFor="country-select">Choose Country:</label>
                            <Form.Select
                                defaultValue={oldPickupLocation ? JSON.stringify(country) : ""}
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
                                defaultValue={oldPickupLocation ? JSON.stringify(state) : ""}
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
                                defaultValue={oldPickupLocation ? JSON.stringify(city) : ""}
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

                        <Form.Group className="my-3" controlId="street-address">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Exact Address"
                                value={street}
                                onChange={(e) => {
                                    setStreet(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="landmark">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Landmark"
                                value={landmark}
                                onChange={(e) => {
                                    setLandmark(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <label>Upload Image</label>
                            <br />
                            {image.length ? (
                                <img className="addLocation__form__image" src={image} />
                            ) : (
                                <></>
                            )}
                            <Form.Control
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                required="required"
                                onChange={handleImageUpload}
                            ></Form.Control>
                        </Form.Group>

                        <div style={{ width: "fit-content", margin: "auto" }}>
                            <Button
                                className="my-5 addLocation__form__btn"
                                type="submit"
                                variant="primary"
                                onClick={submitHandler}
                            >
                                {pickLocId ? "Update" : "Add"}
                            </Button>
                        </div>
                    </Form>
                </FormContainer>
            </div>
        </div>
    )
}

export default NormalUserAddLocationPage