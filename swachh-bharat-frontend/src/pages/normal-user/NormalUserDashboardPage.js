import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FeaturedItem from '../../components/featuredItem/FeaturedItem';
import Sidebar from '../../components/sidebar/Sidebar';
import "./NormalUserDashboardPage.css";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { RiHandHeartLine } from "react-icons/ri";
import { GiMineTruck } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickupLocation } from '../../actions/pickupLocationActions';
import TableRow from '../../components/tablerow/TableRow';
import MyModal from '../../components/modal/MyModal';

const NormalUserDashboardPage = () => {

    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userId : null;

    const [show, setShow] = useState(false);
    const [selectedLoc, setSelectedLoc] = useState();

    const pickupLocationReducer = useSelector(
        (state) => state.pickupLocationReducer
    );
    const [pickupLocations, setPickupLocations] = useState(pickupLocationReducer.pickupLocations);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const featuredData = [
        {
            title: "Coins Earned",
            value: `₹ ${pickupLocations
                ? pickupLocations.filter((loc) => loc.status).length * 20
                : "N/A"
                }`,
            icon: <HiOutlineCurrencyRupee />,
            subtitle: "You can use them anytime.",
        },

        {
            title: "Cleaned",
            value: pickupLocations
                ? pickupLocations.filter((loc) => loc.status).length
                : "N/A",
            icon: <RiHandHeartLine />,
            subtitle: "Nice Work. You're the Green Man!",
        },

        {
            title: "Pending",
            value: pickupLocations ? pickupLocations.filter((loc) => !loc.status).length : "N/A",
            icon: <GiMineTruck />,
            subtitle: "Don't worry, We're on the way!",
        },
    ];

    const handleShow = (data) => {
        setShow(!show);
        setSelectedLoc(data);
    };

    useEffect(() => {
        fetchPickupLocation(dispatch, userId, token).then((data) => {
            setPickupLocations(data.payload);
        });
    }, [dispatch, token]);

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, [navigate]);

    return (
        <div className="nuserDashboardPage__container">
            <div className="container__sidebar">
                <Sidebar />
            </div>
            <div className="container__nuserDashboardContent">
                <p style={{ fontSize: "1.5rem", color: "black", margin: "10px" }}>
                    Dashboard
                </p>
                <div className="nuserDashboardContent__featured">
                    {featuredData.map((data, index) => (
                        <FeaturedItem key={index} item={data} />
                    ))}
                </div>
                <p style={{ fontSize: "1.5rem", color: "black", margin: "5px 10px" }}>
                    Last 5 places details
                </p>
                {show && <MyModal pickup={selectedLoc} show={show} setShow={setShow} />}
                <div className='nuserDashboardContent__table--heading'>
                    <div className='table__address'>Address</div>
                    <div className='table__status'>Status</div>
                    <div className='table__dateAdded'>Added</div>
                    <div className='table__dateCleaned'>Cleaned</div>
                    <div className='table__options'>Options</div>

                </div>
                {pickupLocations && pickupLocations.length ? (<div className="nuserDashboardContent__table--data">
                    {pickupLocations.map((data, index) => {
                        return (
                            <TableRow
                                key={index}
                                row={data}
                                isGreyBg={index % 2 === 0}
                                onClickHandler={() => handleShow(data)}
                            />
                        );
                    })}

                </div>) :
                    <p style={{ marginLeft: "5rem" }}>No Pickup Location to display!</p>
                }
            </div>
        </div>
    )
}

export default NormalUserDashboardPage