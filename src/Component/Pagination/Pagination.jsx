import React, { useContext } from "react";
import classnames from "classnames";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { usePagination } from "../../Utils/usePagination";
import { UserContext } from "../../Utils/context";
import "./Pagination.css";

const Pagination = (props) => {
  const [users, setUsers, filteredUsers, setFilteredUsers, value, setValue] =
    useContext(UserContext);

  const {
    handlePageChange,
    totalCount,
    currentPage,
    pageSize,
    className,
    selectAll,
    toggleDelete
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  // function to deselect all the selected users on currentpage on pagination
  const resetSelection = () => {
    selectAll.current.checked = false;
    toggleDelete(false);
    users.forEach((data) => {
      data.isChecked = false;
    });
    setUsers([...users]);
  };

  // navigation of the pages

  const handleFirstPage = () => {
    handlePageChange(1);
    resetSelection();
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
    resetSelection();
  };

  const handleNext = () => {
    if (currentPage < paginationRange.length) handlePageChange(currentPage + 1);
    resetSelection();
  };

  const handleLastPage = () => {
    handlePageChange(lastPage);
    resetSelection();
  };

  const handlePageClick = (pageNumber) => {
    handlePageChange(pageNumber);
    resetSelection();
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
          onClick={() => handlePageClick(pageNumber)}
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
