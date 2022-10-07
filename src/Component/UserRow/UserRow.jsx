import React, { useContext, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import Swal from "sweetalert2";
import classnames from "classnames";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { UserContext } from "../../Utils/context";
import "./UserRow.css";

function UserRow({ user, toggleDelete }) {
  const [users, setUsers, filteredUsers, setFilteredUsers, value, setValue] =
    useContext(UserContext);

  const [isEditable, setIsEditable] = useState(false);
  const [currentValue, setCurrentValue] = useState(user);

  const handleCheck = () => {
    // console.log(e.target.checked);
    let flag = false;
    users.forEach((data) => {
      if (data.id === user.id) data.isChecked = !data.isChecked;
      if (data.isChecked) flag = true;
    });
    toggleDelete(flag);
    setUsers([...users]);
  };

  // Edit User
  const enableEditing = () => {
    setIsEditable(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentValue({ ...currentValue, [name]: value });
  };

  const validateUserDetails = (data) => {
    if (data.name.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Username cannot be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (data.email.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Email cannot be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (data.role.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Role cannot be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else return true;
  };

  const handleSave = () => {
    if (!validateUserDetails(currentValue)) return;
    const UpdatedUsersData = users.map((data) => {
      if (data.id === currentValue.id) {
        data.name = currentValue.name;
        data.email = currentValue.email;
        data.role = currentValue.role;
      }
      return data;
    });
    Swal.fire({
      icon: "question",
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      /* Update only when save button is clicked */
      if (result.isConfirmed) {
        setUsers([...UpdatedUsersData]);
        Swal.fire({
          icon: "success",
          title: "Saved Successfully !!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsEditable(false);
    });
  };

  // Handling single user delete
  const handleDelete = () => {
    const remainingUsers = users.filter((data) => data.id !== user.id);
    const remainingFilteredUsers = filteredUsers.filter(
      (data) => data.id !== user.id
    );
    let flag = false;
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
        remainingUsers.forEach((data) => {
          if (data.isChecked) flag = true;
        });
        toggleDelete(flag);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <tr className={classnames({ rowSelected: user.isChecked })}>
        <td>
          <input
            type="checkbox"
            onChange={handleCheck}
            checked={user.isChecked === true ? "checked" : ""}
          />
        </td>
        <td>
          {isEditable ? (
            <Form className="m-0 p-0">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="name"
                  size="sm"
                  value={currentValue.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <p className="m-0 p-0">{user.name}</p>
          )}
        </td>
        <td>
          {isEditable ? (
            <Form className="m-0 p-0">
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  size="sm"
                  value={currentValue.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <p className="m-0 p-0">{user.email}</p>
          )}
        </td>
        <td>
          {isEditable ? (
            <Form className="m-0 p-0">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Role"
                  name="role"
                  size="sm"
                  value={currentValue.role}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <p className="m-0 p-0">{user.role}</p>
          )}
        </td>
        <td>
          <Stack direction="horizontal" gap={4}>
            {isEditable ? (
              <BiSave className="saveButton" onClick={handleSave} />
            ) : (
              <BiEdit className="editButton" onClick={enableEditing} />
            )}
            <BiTrash className="deleteButton" onClick={handleDelete} />
          </Stack>
        </td>
      </tr>
    </>
  );
}

export default UserRow;
