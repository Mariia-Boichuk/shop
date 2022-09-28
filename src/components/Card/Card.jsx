import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

import "./Card.scss";

const Card = ({ goodInfo, numOfColumns, likedIds, setLikedIds }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likedIds) {
      setIsLiked(likedIds.includes(goodInfo.id));
      setLikedIds(likedIds);
    }
  }, []);

  const onLike = () => {
    let newLikedIds;

    if (!isLiked) {
      newLikedIds = [...likedIds, goodInfo.id];
    } else {
      console.log("unlike");
      newLikedIds = likedIds?.filter((elem) => {
        return elem !== goodInfo.id;
      });
    }

    localStorage.setItem("likedProductsIds", JSON.stringify(newLikedIds));

    setLikedIds(newLikedIds);
    setIsLiked((prev) => !prev);
  };

  return (
    <li
      className={`products__item ${
        numOfColumns === 2 ? "products__item--big" : ""
      }`}
    >
      <img src={goodInfo.image} alt={goodInfo.title} />
      <h5>{goodInfo.title}</h5>

      <div className="item__row">
        <p className="p-text">{goodInfo.price} грн</p>
        <div
          className={`item__like  ${isLiked ? "item__like--filled" : ""}`}
          onClick={onLike}
        >
          <FiHeart />
        </div>
      </div>
    </li>
  );
};

export default Card;
