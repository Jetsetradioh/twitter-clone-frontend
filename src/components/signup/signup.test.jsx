import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./signup";

describe("Signup Form", () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Användarnamn");
    const emailInput = screen.getByPlaceholderText("E-post");
    const passwordInput = screen.getByPlaceholderText("Lösenord");
    const verifyPasswordInput =
      screen.getByPlaceholderText("Verifiera lösenord");
    const submitButton = screen.getByRole("button", { name: /skapa konto/i });

    return {
      usernameInput,
      emailInput,
      passwordInput,
      verifyPasswordInput,
      submitButton,
    };
  };

  it("renders all input fields", () => {
    const { usernameInput, emailInput, passwordInput, verifyPasswordInput } =
      setup();

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(verifyPasswordInput).toBeInTheDocument();
  });

  it("shows error if passwords do not match", () => {
    const {
      usernameInput,
      emailInput,
      passwordInput,
      verifyPasswordInput,
      submitButton,
    } = setup();

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(verifyPasswordInput, {
      target: { value: "differentPassword" },
    });
    fireEvent.click(submitButton);

    expect(screen.getByText("Lösenorden matchar inte")).toBeInTheDocument();
  });
});
