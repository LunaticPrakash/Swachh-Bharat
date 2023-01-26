import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./MyModal.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdDoneOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import * as pickupLocationConstants from "../../constants/pickupLocationConstants";
import { useDispatch } from "react-redux";
import { IoNavigateOutline } from "react-icons/io5";
import { deletePickupLocation, updatePickupLocation } from "../../actions/pickupLocationActions";

const MyModal = (props) => {
  const pickupLocation = props.pickup;
  const handleClose = () => props.setShow(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  const isDriver = user.roles.map((r) => {
    if (r["roleName"] === "DRIVER_USER") return true;
    return false;
  })[0];

  const handleEdit = () => {
    navigate(`/edit-pickup-location/${pickupLocation.pickLocId}`);
  };

  const handleNavigate = () => { };

  const getCurrentDateTime = () => {
    var currentdate = new Date();
    return ("0" + currentdate.getDate()).slice(-2) + "-"
      + ("0" + currentdate.getMonth() + 1).slice(-2) + "-"
      + currentdate.getFullYear() + " "
      + ("0" + currentdate.getHours()).slice(-2) + ":"
      + ("0" + currentdate.getMinutes()).slice(-2) + ":"
      + ("0" + currentdate.getSeconds()).slice(-2);
  };

  const handleDone = () => {
    pickupLocation.status = true;
    pickupLocation.dateCleaned = getCurrentDateTime();
    pickupLocation.driverId = userId;

    updatePickupLocation(dispatch, pickupLocation, token).then((data) => {
      if (
        data.type === pickupLocationConstants.UPDATE_PICKUPLOCATION_SUCCESS
      ) {
        swal(
          "Pickup Location cleaned!",
          `${pickupLocation.city} succesfully cleaned`,
          "success"
        );
      } else {
        swal(
          "Pickup Location Not cleaned!",
          `${pickupLocation.city} is still dirty`,
          "error"
        );
      }
    });
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this pickup location!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePickupLocation(dispatch, pickupLocation.pickLocId, token).then(
          (data) => {
            if (
              data.type ===
              pickupLocationConstants.DELETE_PICKUPLOCATION_SUCCESS
            ) {
              swal(
                "Pickup Location Deleted!",
                `${pickupLocation.city} succesfully deleted`,
                "success"
              );
            } else {
              swal(
                "Pickup Location Not Deleted!",
                `${pickupLocation.city} not deleted`,
                "error"
              );
            }
          }
        );
      } else {
        swal(`${pickupLocation.city} is safe`);
      }
    });
    props.setShow(false);
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pickupLocation.city}</Modal.Title>
        <p
          style={{ marginRight: "0" }}
          className={`badge ${pickupLocation.status == "Cleaned" ? "badge-success" : "badge-error"
            }`}
        >
          {pickupLocation.status}
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="modal__image">
          <img
            width="200px"
            height="200px"
            src={pickupLocation.image}
            alt="image"
            style={{ border: "2px solid black" }}
          />
        </div>
        <div className="modal__address">
          <div className="row">
            <div className="bold">Street</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.street}</div>
          </div>

          <div className="row">
            <div className="bold">City</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.city}</div>
          </div>

          <div className="row">
            <div className="bold">State</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.state}</div>
          </div>

          <div className="row">
            <div className="bold">Landmark</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.landmark}</div>
          </div>

          <div className="row">
            <div className="bold">Country</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.country}</div>
          </div>

          <div className="row">
            <div className="bold">Date Added</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.dateAdded}</div>
          </div>

          <div className="row">
            <div className="bold">Date Cleaned</div>
            <div className="divider">:</div>
            <div className="value">{pickupLocation.dateCleaned ? pickupLocation.dateCleaned : "N/A"}</div>
          </div>

          <div className="row">
            <div className="bold">Cleaned By</div>
            <div className="divider">:</div>
            <div className="value">{"N/A"}</div>
          </div>

        </div>
      </Modal.Body>
      <div className="modal-footer">
        <div onClick={isDriver ? handleNavigate : pickupLocation.status ? handleClose : handleEdit} className="model-footer__option">
          <div className="modal-footer__icon">
            {isDriver ? <IoNavigateOutline /> : pickupLocation.status ? <MdDoneOutline /> : <FaRegEdit />}
          </div>
          <div className="modal-footer__icon-text">
            {isDriver ? "Navigate" : pickupLocation.status ? "Ok" : "Edit"}
          </div>
        </div>

        <div onClick={isDriver ? pickupLocation.status ? handleClose : handleDone : handleDelete} className="model-footer__option red">
          <div className="modal-footer__icon">
            {isDriver ? <MdDoneOutline /> : <MdDeleteOutline />}
          </div>
          <div className="modal-footer__icon-text">
            {isDriver ? pickupLocation.status ? "Ok" : "Cleaned" : "Delete"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
