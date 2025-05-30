import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./login";
import "whatwg-fetch";

describe("Login Form", () => {
  const mockSetLoggedUser = jest.fn();

  const setup = () => {
    render(
      <BrowserRouter>
        <Login setLoggedUser={mockSetLoggedUser} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockSetLoggedUser.mockClear();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("renders username input and Nästa button", () => {
    setup();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nästa/i })).toBeInTheDocument();
  });

  it("proceeds to password input after valid username", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testuser" }),
    });

    setup();

    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: /nästa/i }));

    const passwordInput = await screen.findByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("shows error if password is incorrect", async () => {
    // username-verifiering (första fetch)
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testuser" }),
    });

    setup();

    // Skriver in användarnamn och går vidare
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /nästa/i }));

    const passwordInput = await screen.findByPlaceholderText("Password");

    // Mockar login-försök (andra fetch)
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Wrong password!" }),
    });

    fireEvent.change(passwordInput, {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /logga in/i }));

    const errorMessage = await screen.findByText("Wrong username or password!");
    expect(errorMessage).toBeInTheDocument();
  });
});
