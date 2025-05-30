import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";

beforeEach(() => {
  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      foundUser: {
        _id: "123",
        name: "Test User",
        username: "testuser",
        profileImage: "https://example.com/profile.jpg",
      },
    })
  );

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          _id: "123",
          name: "Test User",
          username: "testuser",
          profileImage: "https://example.com/profile.jpg",
        }),
    })
  );
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test("visar inloggad användares info", async () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(await screen.findByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("@testuser")).toBeInTheDocument();
});
