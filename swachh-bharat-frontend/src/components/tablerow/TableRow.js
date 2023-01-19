import React from "react";
import "./TableRow.css";
import { IoNavigateOutline } from "react-icons/io5";

const TableRow = ({ row, onClickHandler }) => {
  const handleNavigate = () => { };
  const address = row.landmark.trim() + ", " + row.street.trim() + ", " + row.city.trim() + ", " + row.state.trim() + ", " + row.country.trim();
  const dateAdded = row.dateAdded.split(" ")[0];
  const dateCleaned = row.dateCleaned && row.dateCleaned.split(" ")[0];

  const getMonthNameInShort = (monthNum) => {
    var months = ["Jan", "Feb", "March", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[Number(monthNum) + 1];
  }
  return (
    <div className="tableRow__container" onClick={onClickHandler}>
      <div className="tableRow__name">{address}</div>
      <div className="tableRow__status">
        <p className={`badge ${row.status ? "badge-success" : "badge-error"}`}>
          {row.status ? "Cleaned" : "Pending"}
        </p>
      </div>
      <div className="tableRow__dateAdded">{dateAdded.split("-")[0] + " " + getMonthNameInShort(dateAdded.split("-")[1])}</div>
      <div className="tableRow__dateCleaned">{row.dateCleaned ? row.dateCleaned.split(" ")[0] : "N/A"}</div>
      <div onClick={handleNavigate} className="tableRow__option">
        <div className="tableRow__icon">
          <IoNavigateOutline />
        </div>
        <div className="tableRow__icon-text">Track</div>
      </div>
    </div>
  );
};

export default TableRow;
