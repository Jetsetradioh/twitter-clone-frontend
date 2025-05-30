import "whatwg-fetch";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

jest.mock("../tweet/tweet", () => () => (
  <div data-testid="tweet-component">Mockad Tweet</div>
));

const mockUser = {
  foundUser: {
    _id: "123",
    name: "Test Användare",
    username: "testuser",
    bio: "Jag älskar kod",
    location: "Stockholm",
    tweetsCount: 5,
    bannerImage: "banner.jpg",
    profileImage: "profile.jpg",
    joinedDate: new Date().toISOString(),
    followersCount: 10,
    followingCount: 20,
  },
};
Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve([]) })
);

import Profile from "./profile";

afterEach(() => jest.restoreAllMocks());

test("visar användardata korrekt", async () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  expect(await screen.findAllByText("Test Användare")).toHaveLength(2);
  expect(screen.getByText("@testuser")).toBeInTheDocument();
  expect(screen.getByText("Jag älskar kod")).toBeInTheDocument();
  expect(screen.getByText("Stockholm")).toBeInTheDocument();
  expect(screen.getByText(/5 tweets/)).toBeInTheDocument();
  expect(screen.getByText(/20 Following/)).toBeInTheDocument();
  expect(screen.getByText(/10 Followers/)).toBeInTheDocument();
  expect(screen.getByTestId("tweet-component")).toBeInTheDocument();
});
