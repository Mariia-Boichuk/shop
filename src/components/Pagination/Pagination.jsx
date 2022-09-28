import { useEffect, useState } from "react";

import "./Pagination.scss";

const Pagination = ({
  goodsPerPage,
  setCurrentPage,
  totalGoods,
  setGoodsPerPage,
  currentPage,
  searchParams,
  setSearchParams,
}) => {
  const limit = searchParams.get("limit");
  const pageNumberParam = searchParams.get("pageNumber");
  const [quantity, setQuantity] = useState(goodsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGoods / goodsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (limit) {
      setGoodsPerPage(limit);
      setQuantity(limit);
    }

    if (pageNumberParam) {
      setCurrentPage(pageNumberParam);
    }
  }, []);

  useEffect(() => {
    searchParams.set("limit", goodsPerPage);
    searchParams.set("pageNumber", currentPage);

    setSearchParams(searchParams);
  }, [currentPage, goodsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <nav className="nav">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`pagination__page-number ${
              number === currentPage ? "pagination__page-number--active" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>

      <label className="label">
        кількість товарів
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <button
        className="pagination__button"
        onClick={() => setGoodsPerPage(quantity)}
      >
        показати
      </button>
    </nav>
  );
};

export default Pagination;
