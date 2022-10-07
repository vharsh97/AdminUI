import React from "react";
import classnames from "classnames";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { usePagination } from "../../Utils/usePagination";
import "./Pagination.css";

const Pagination = (props) => {
  const { handlePageChange, totalCount, currentPage, pageSize, className } =
    props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < paginationRange.length) handlePageChange(currentPage + 1);
  };

  const handleLastPage = () => {
    handlePageChange(lastPage);
  };

  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={handleFirstPage}
      >
        <BiChevronsLeft
          className={classnames("arrow", {
            disabled: currentPage === 1,
          })}
        />
      </li>

      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={handlePrevious}
      >
        <BiChevronLeft
          className={classnames("arrow", {
            disabled: currentPage === 1,
          })}
        />
      </li>
      {paginationRange.map((pageNumber, id) => (
        <li
          key={id}
          className={classnames("pagination-item", {
            selected: pageNumber === currentPage,
          })}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={handleNext}
      >
        <BiChevronRight className="arrow" />
      </li>

      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={handleLastPage}
      >
        <BiChevronsRight className="arrow" />
      </li>
    </ul>
  );
};

export default Pagination;
