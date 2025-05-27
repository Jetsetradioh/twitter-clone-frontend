import { render, screen, fireEvent } from "@testing-library/react";
import Tweet from "./tweet";

const mockTweets = [];

describe("Tweet Component", () => {
  it("allows user to write and post a tweet", () => {
    render(<Tweet tweets={mockTweets} showInput={true} />);

    const textarea = screen.getByTestId("tweet-textarea");
    const button = screen.getByTestId("tweet-button");

    fireEvent.change(textarea, {
      target: { value: "Detta är en test-tweet!" },
    });
    fireEvent.click(button);

    expect(screen.getByText("Detta är en test-tweet!")).toBeInTheDocument();
  });
});
