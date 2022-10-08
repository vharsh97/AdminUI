import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import classnames from "classnames";
import { Container, Spinner, Button, Table, Row, Col } from "react-bootstrap";
import { url } from "../../App";
import { UserContext } from "../../Utils/context";
import Header from "../Header/Header";
import UserRow from "../UserRow/UserRow";
import Pagination from "../Pagination/Pagination";
import "./Users.css";

let PageSize = 10;

function Users() {
  const [users, setUsers, filteredUsers, setFilteredUsers, value, setValue] =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const selectAll = useRef(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      // console.log(response.data);
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      //   console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error Fetching User Details !!!",
        showConfirmButton: true,
        // timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  /*
FUNCTION TO RENDER PAGINATED DATA

  -> if filtered users based on search result is there then currentTableData  
  will return filtered reords and current page is set to start to show data from start page

  -> if filtered data is less than pagesizer than return directly filtered data don't slice it

  -> if filtered data is null then return all users. 

  -> rendetr paginate function inside useMemo() to track dependency
*/

  const paginate = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let currentTableData = [];
    if (filteredUsers.length > 0) {
      if (filteredUsers.length <= PageSize) currentTableData = filteredUsers;
      else
        currentTableData = filteredUsers.slice(firstPageIndex, lastPageIndex);
    } else
      currentTableData =
        users.length > 0 ? users.slice(firstPageIndex, lastPageIndex) : [];
    // console.log(currentTableData);
    setCurrentRecords(currentTableData);
  };

  useMemo(() => {
    paginate();
  }, [users, filteredUsers, currentPage]);

  // Select All Users
  const selectAllUsers = () => {
    currentRecords.forEach((data) => {
      data.isChecked = selectAll.current.checked;
    });
    setShowDelete(selectAll.current.checked);
    setCurrentRecords([...currentRecords]);
  };

  // const testing = () => {
  //   console.log(currentRecords);
  // };

  // delete users that are selected via checkbox
  const deleteSelected = () => {
    const remainingUsers = users.filter((data) => data.isChecked !== true);
    const remainingFilteredUsers = filteredUsers.filter(
      (data) => data.isChecked !== true
    );
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(remainingUsers);
        setFilteredUsers(remainingFilteredUsers);
        if (remainingFilteredUsers.length === 0) setValue("");
        selectAll.current.checked = false;
        setShowDelete(false);
        // testing();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Selected Users has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {/* Header and Search  */}
      <Header />

      {loading === true ? (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
          <Spinner animation="border" role="status" />
          <p className="lead">Loading...</p>
        </Container>
      ) : (
        <Container fluid>
          {users.length > 0 && (
            <Table responsive data-testid="users-table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      ref={selectAll}
                      onChange={selectAllUsers}
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords &&
                  currentRecords.map((user, id) => (
                    <UserRow
                      user={user}
                      key={user.id}
                      toggleDelete={(val) => setShowDelete(val)}
                    />
                  ))}
              </tbody>
            </Table>
          )}

          {/* Footer component */}

          {users.length > 0 && (
            <footer className="mt-2">
              <Row>
                <Col sm="12" md="4">
                  <Button
                    className={classnames("rounded-pill", {
                      toggleDelete: !selectAll.current.checked && !showDelete,
                    })}
                    variant="danger"
                    onClick={deleteSelected}
                  >
                    Delete Selected
                  </Button>
                </Col>
                <Col sm="12" md="8">
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={
                      filteredUsers.length > 0
                        ? filteredUsers.length
                        : users.length
                    }
                    pageSize={PageSize}
                    handlePageChange={(page) => setCurrentPage(page)}
                    selectAll={selectAll}
                    toggleDelete={(val) => setShowDelete(val)}
                  />
                </Col>
              </Row>
            </footer>
          )}
        </Container>
      )}
    </>
  );
}

export default Users;
