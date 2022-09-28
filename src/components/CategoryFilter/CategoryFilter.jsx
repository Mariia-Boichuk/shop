import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./CategoryFilter.scss";

const CategoryFilter = ({ setError, setCurrentFilter, currentFilter }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <ul className="filters">
      {categories &&
        categories.map((item) => (
          <li
            onClick={() => setCurrentFilter(item)}
            key={item}
            className={currentFilter === item ? "bold-text" : ""}
          >
            {item === "all" ? "Переглянути все" : item}
          </li>
        ))}
    </ul>
  );
};

export default CategoryFilter;
