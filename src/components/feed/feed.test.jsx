import "whatwg-fetch"; // Polyfill for fetch
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feed from "./feed";
import { BrowserRouter } from "react-router-dom";

// Mocka fetch
beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url) => {
    if (url.includes("/api/tweet/")) {
      return Promise.resolve({
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
      });
    }
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });

  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      foundUser: { _id: "123", name: "Test", username: "testuser" },
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

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
  fireEvent.change(textarea, {
    target: { value: "a".repeat(141) },
  });

  const postButton = screen.getByDisplayValue("Post");
  expect(postButton).toBeDisabled();
});

test("renders fetched tweets", async () => {
  renderWithRouter(<Feed />);
  await waitFor(() => {
    expect(screen.getByText("This is a test tweet")).toBeInTheDocument();
  });
});
