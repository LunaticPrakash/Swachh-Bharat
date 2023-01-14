import React from "react";
import "./FeaturedItem.css";

const FeaturedItem = ({ item }) => {
  const getClassName = (title) => {
    if (title.includes("Coins Earned")) return "coin";
    else if (title.includes("Cleaned")) return "places-cleaned";
    else if (title.includes("Pending")) return "pending";
  };

  return (
    <div className="featuredItem__container">
      <span className="featured-title">{item.title}</span>
      <div className="featured-content">
        <span className="featured-value">{item.value}</span>
        <span className={`featured-icon ${getClassName(item.title)}`}>
          {item.icon}
        </span>
      </div>
      <span className="featured-subtitle">{item.subtitle}</span>
    </div>
  );
};

export default FeaturedItem;
