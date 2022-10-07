import "./App.css";
import Users from "./Component/Users/Users";
import UserDetailsProvider from "./Utils/context";

export const url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  return (
    <div className="App">
      <UserDetailsProvider>
        <Users />
      </UserDetailsProvider>
    </div>
  );
}

export default App;
