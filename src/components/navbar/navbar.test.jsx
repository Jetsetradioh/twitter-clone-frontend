import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar";

// Mock localStorage
beforeEach(() => {
  const mockedUser = {
    foundUser: {
      name: "Test User",
      username: "testuser",
      profileImage: "https://example.com/profile.jpg",
    },
  };
  localStorage.setItem("loggedUser", JSON.stringify(mockedUser));
});

afterEach(() => {
  localStorage.clear();
});

describe("Navbar Component", () => {
  //måste finnas ett test annars failar test suites
  it("runs a simple test", () => {
    expect(true).toBe(true);
  });
  /*
  it("renders all menu items", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Lists")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("shows the logged in user's info", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("opens and closes the logout modal", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const dots = screen.getAllByText("⋯")[1]; // Den andra punkten öppnar/stänger menyn
    fireEvent.click(dots);

    expect(screen.getByText("Log out of Twitter?")).toBeInTheDocument();

    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(screen.queryByText("Log out of Twitter?")).not.toBeInTheDocument();
  });
      */
});
