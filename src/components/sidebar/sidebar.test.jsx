import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "./sidebar";
import { BrowserRouter } from "react-router-dom";

// Hjälpfunktion för att wrappa med Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

// Mockar fetch
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes("/api/search/users")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              _id: "u1",
              username: "testuser",
              name: "Test User",
              profileImage: "https://example.com/avatar.jpg",
            },
          ]),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders trends in sidebar", () => {
  renderWithRouter(<Sidebar />);
  expect(screen.getByText("Trends for you")).toBeInTheDocument();
  expect(screen.getByText("Samt")).toBeInTheDocument();
  expect(screen.getByText("China")).toBeInTheDocument();
});

test("shows dropdown when typing in search", async () => {
  renderWithRouter(<Sidebar />);
  const input = screen.getByPlaceholderText("🔍 Search");

  fireEvent.change(input, { target: { value: "test" } });

  await waitFor(() => {
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });
});

test("shows 'No results found' for empty result", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );

  renderWithRouter(<Sidebar />);
  const input = screen.getByPlaceholderText("🔍 Search");

  fireEvent.change(input, { target: { value: "zzznotfound" } });

  await waitFor(() => {
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
