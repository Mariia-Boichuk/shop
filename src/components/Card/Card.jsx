import React from "react";
import "./Card.scss";

const Card = ({ goodInfo }) => {
  return (
    <li className="products__item">
      <img src={goodInfo.image} alt={goodInfo.title} />
      <h5 className="bold-text">{goodInfo.title}</h5>
      <p className="p-text">{goodInfo.price}</p>
    </li>
  );
};

export default Card;
