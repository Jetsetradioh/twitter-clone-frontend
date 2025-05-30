import "whatwg-fetch";
import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Feed from "./feed";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      foundUser: { _id: "123", name: "Test User", username: "testuser" },
    })
  );
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: "1",
            name: "Test User",
            username: "testuser",
            image: "https://via.placeholder.com/50",
            content: "This is a test tweet",
            createdAt: new Date().toISOString(),
            comments: [],
            retweets: 0,
            likes: 0,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

test("renders tabs and toggles between them", () => {
  renderWithRouter(<Feed />);
  const forYouTab = screen.getByText("For you");
  const followingTab = screen.getByText("Following");
  expect(forYouTab).toBeInTheDocument();
  expect(followingTab).toBeInTheDocument();
  fireEvent.click(followingTab);
  expect(followingTab).toHaveClass("active");
});

test("renders post box with disabled Post button for long tweet", () => {
  renderWithRouter(<Feed />);
  const textarea = screen.getByPlaceholderText("What's happening?");
  fireEvent.change(textarea, { target: { value: "a".repeat(141) } });
  expect(screen.getByDisplayValue("Post")).toBeDisabled();
});

test("renders fetched tweets", async () => {
  await act(async () => {
    renderWithRouter(<Feed />);
  });
  expect(await screen.findByText("This is a test tweet")).toBeInTheDocument();
});
