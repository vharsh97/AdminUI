import "@testing-library/jest-dom/extend-expect";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { url } from "../App";
import MockAdapter from "axios-mock-adapter";
import Users from "../Component/Users/Users";
import UserDetailsProvider from "../Utils/context";

const mock = new MockAdapter(axios);

const usersResponse = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
];

mock.onGet(url).reply(200, usersResponse);

jest.useFakeTimers();

describe("Users Page", () => {
  const UsersDOMTree = () => (
    <UserDetailsProvider>
      <Users />
    </UserDetailsProvider>
  );

  beforeEach(async () => {
    jest.clearAllMocks();
    render(UsersDOMTree());
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should have a search bar", () => {
    const searchInput = screen.getAllByPlaceholderText(/search/i)[0];
    expect(searchInput).toBeInTheDocument();
  });

  it("should make a GET request to load users", () => {
    const getUsersCall = mock.history.get.find((req) => req.url === url);
    expect(getUsersCall).toBeTruthy();
  });

  it("should have a table", () => {
    const usersTable = screen.getByTestId("users-table");
    expect(usersTable).toBeInTheDocument();
  });

  it("should have delete selected button", () => {
    const deleteSelectedButton = screen.getByRole("button", { name: /delete selected/i });
    expect(deleteSelectedButton).toBeInTheDocument();
  });

  it("should show user details by parsing the users response data", () => {
    const userName = screen.getAllByText(/Aaron Miles/);
    const email = screen.getAllByText(/aaron@mailinator.com/);
    const role = screen.getAllByText("member");

    expect(userName);
    expect(email);
    expect(role);
  });
});
