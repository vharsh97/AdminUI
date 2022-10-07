import React, { useContext } from "react";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSearch } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../../Utils/context";

function Header() {
  const [users, setUsers, filteredUsers, setFilteredUsers, value, setValue] =
    useContext(UserContext);

  /* Filtering Users on the Basis of Name, Email OR Role */

  const filterUsers = (e) => {
    let searchText = e.target.value;
    setValue(e.target.value);
    if (searchText !== "") {
      const filterTable = users.filter((o) =>
        Object.keys(o).some((k) => {
          if (k !== "id")
            return String(o[k])
              .toLowerCase()
              .includes(searchText.toLowerCase());
        })
      );
      // console.log(filterTable);

      // alert to display when no records are found
      if (filterTable.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No Records Found !!!",
          showConfirmButton: false,
          timer: 2000,
        });
        setValue("");
      }
      setFilteredUsers([...filterTable]);
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Admin UI</Navbar.Brand>
        </Container>
      </Navbar>
      {users.length > 0 && (
        <Container fluid className="my-3">
          <InputGroup>
            <Form.Control
              placeholder="Search by name, email or role..."
              aria-label="search"
              aria-describedby="search"
              value={value}
              onChange={filterUsers}
            />
            <InputGroup.Text id="search">
              <BiSearch />
            </InputGroup.Text>
          </InputGroup>
        </Container>
      )}
    </>
  );
}

export default Header;
