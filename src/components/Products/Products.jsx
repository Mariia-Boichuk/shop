import Axios from "axios";
import React, { useEffect, useState } from "react";
import { stringifyParams } from "../../api/stringifyParams";
import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";

import LayoutFilter from "../LayoutFilter/LayoutFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

import "./Products.scss";

const Products = () => {
  console.log("prod");
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const columnsParam = searchParams.get("columns");

  const [currentFilter, setCurrentFilter] = useState(category || "all");
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState("");
  const [numOfColumns, setNumOfColumns] = useState(columnsParam == 2 ? 2 : 4);
  const [loading, setLoading] = useState(false);
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const localLikes = JSON.parse(localStorage.getItem("likedProductsIds"));
    if (localLikes) {
      setLikedIds(localLikes);
    }
  }, []);

  useEffect(() => {
    searchParams.set("category", currentFilter);
    setSearchParams(searchParams);

    const requestParams = stringifyParams({ category: currentFilter });

    const fetchData = async () => {
      try {
        setLoading(true);
        const goodsInfo = await Axios.get(
          `https://fakestoreapi.com/products${requestParams}`
        );
        setGoods(goodsInfo.data);
        setLoading(false);
      } catch (error) {
        setError("something gone wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [currentFilter, searchParams, setSearchParams]);

  return error ? (
    <p> {error}</p>
  ) : (
    <div className="container products__container">
      <LayoutFilter
        setNumOfColumns={setNumOfColumns}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        numOfColumns={numOfColumns}
      />
      <div className="products__wrapper">
        <CategoryFilter
          setError={setError}
          setCurrentFilter={setCurrentFilter}
          currentFilter={currentFilter}
        />
        <ul
          className={`products__list ${
            numOfColumns === 2 ? "products__2columns" : ""
          }`}
        >
          {goods?.map((item) => (
            <Card
              goodInfo={item}
              key={item.id}
              numOfColumns={numOfColumns}
              likedIds={likedIds}
              setLikedIds={setLikedIds}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
