import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { stringifyParams } from "../../api/stringifyParams";

import Card from "../Card/Card";
import LayoutFilter from "../LayoutFilter/LayoutFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import Pagination from "../Pagination/Pagination";

import "./Products.scss";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const columnsParam = searchParams.get("columns");
  const category = searchParams.get("category");

  const [currentFilter, setCurrentFilter] = useState("all");
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState("");
  const [numOfColumns, setNumOfColumns] = useState(4);
  const [loading, setLoading] = useState(false);
  const [likedIds, setLikedIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage, setGoodsPerPage] = useState(4);

  useEffect(() => {
    const localLikes = JSON.parse(localStorage.getItem("likedProductsIds"));
    if (localLikes) {
      setLikedIds(localLikes);
    }

    if (columnsParam == 2) {
      setNumOfColumns(2);
    }

    if (category) {
      setCurrentFilter(category);
    }
  }, []);

  useEffect(() => {
    searchParams.set("category", currentFilter);

    setCurrentPage(1);
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
  }, [currentFilter]);

  const indexOfLastGoods = currentPage * goodsPerPage;
  const indexOfFirstGoods = indexOfLastGoods - goodsPerPage;
  const currentGoods = goods.slice(indexOfFirstGoods, indexOfLastGoods);

  return error ? (
    <p>{error}</p>
  ) : (
    <div className="container products__container">
      <Pagination
        goodsPerPage={goodsPerPage}
        setCurrentPage={setCurrentPage}
        totalGoods={goods?.length}
        setGoodsPerPage={setGoodsPerPage}
        currentPage={currentPage}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
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
          {loading ? (
            <p>loading products...</p>
          ) : (
            currentGoods?.map((item) => (
              <Card
                goodInfo={item}
                key={item.id}
                numOfColumns={numOfColumns}
                likedIds={likedIds}
                setLikedIds={setLikedIds}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Products;
