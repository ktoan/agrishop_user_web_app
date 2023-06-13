import React from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const Pagination = ({pages = 1, activePage = 0, onChangePage = () => {}}) => {
  function onChangePageByArrow(dir) {
    if (dir === "prev") {
      if (activePage === 0) return;
      onChangePage(activePage - 1);
    } else if (dir === "next") {
      if (activePage === pages - 1) return;
      onChangePage(activePage + 1);
    } else {
      return;
    }
  }

  return (
    <ul className="pagination d-flex justify-content-center flex-wrap pagination-flat pagination-success">
      <li onClick={() => onChangePageByArrow("prev")} className="page-item">
        <span className="page-link">
          <FaAngleLeft />
        </span>
      </li>
      {Array(pages)
        .fill(0)
        .map((item, index) => (
          <li
            key={index}
            onClick={() => onChangePage(index)}
            className={`page-item ${activePage === index ? "active" : ""}`}
          >
            <span className="page-link">{index + 1}</span>
          </li>
        ))}
      <li onClick={() => onChangePageByArrow("next")} className="page-item">
        <span className="page-link">
          <FaAngleRight />
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
