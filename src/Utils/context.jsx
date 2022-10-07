import React, { useState, createContext } from "react";

export const UserContext = createContext();

function UserDetailsProvider(props) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = useState("");
  return (
    <UserContext.Provider
      value={[users, setUsers, filteredUsers, setFilteredUsers, value, setValue]}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserDetailsProvider;
