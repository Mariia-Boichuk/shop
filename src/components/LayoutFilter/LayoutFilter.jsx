import React, { useEffect } from "react";
import { MdOutlineGridView } from "react-icons/md";
import { TbLayoutColumns } from "react-icons/tb";

import "./LayoutFilter.scss";

const LayoutFilter = ({
  setNumOfColumns,
  numOfColumns,
  searchParams,
  setSearchParams,
}) => {
  useEffect(() => {
    searchParams.set("columns", numOfColumns);
    setSearchParams(searchParams);
  }, [numOfColumns, searchParams, setSearchParams]);

  return (
    <div className="layout-filters">
      <div
        className={numOfColumns === 2 ? "layout-filter--active" : ""}
        onClick={() => setNumOfColumns(2)}
      >
        <TbLayoutColumns />
      </div>

      <div
        className={numOfColumns === 4 ? "layout-filter--active" : ""}
        onClick={() => setNumOfColumns(4)}
      >
        <MdOutlineGridView />
      </div>
    </div>
  );
};

export default LayoutFilter;
