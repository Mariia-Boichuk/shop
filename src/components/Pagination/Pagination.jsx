import "./Pagination.scss";

const Pagination = ({
  goodsPerPage,
  setCurrentPage,
  totalGoods,
  setGoodsPerPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGoods / goodsPerPage); i++) {
    pageNumbers.push(i);
  }

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
          value={goodsPerPage}
          onChange={(e) => setGoodsPerPage(e.target.value)}
        />
      </label>
    </nav>
  );
};

export default Pagination;
