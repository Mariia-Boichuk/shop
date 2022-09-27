import Axios from "axios";
import React, { useEffect, useState } from "react";
import { stringifyParams } from "../../api/stringifyParams";
import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";

import "./Products.scss";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [currentFilter, setCurrentFilter] = useState(category || "all");
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesInfo = await Axios.get(
          "https://fakestoreapi.com/products/categories"
        );

        setCategories(["all", ...categoriesInfo.data]);
      } catch (error) {
        setError("something gone wrong");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    searchParams.set("category", currentFilter);
    setSearchParams(searchParams);

    const requestParams = stringifyParams({ category: currentFilter });

    const fetchData = async () => {
      try {
        const goodsInfo = await Axios.get(
          `https://fakestoreapi.com/products${requestParams}`
        );
        setGoods(goodsInfo.data);
      } catch (error) {
        setError("something gone wrong");
      }
    };

    fetchData();
  }, [currentFilter, searchParams, setSearchParams]);

  return (
    <div>
      <ul className="filters">
        {error && error}
        {categories &&
          categories.map((item) => (
            <li
              onClick={() => setCurrentFilter(item)}
              key={item}
              className={currentFilter === item ? "bold-text" : ""}
            >
              {item}
            </li>
          ))}
      </ul>

      <ul className="products">
        {goods.map((item) => (
          <Card goodInfo={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
