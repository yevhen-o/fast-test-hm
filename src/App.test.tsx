import { render, screen } from "@testing-library/react";
import App from "./App";

it("should have right h1 text", () => {
  render(<App />);
  const message = screen.queryByText(/Books repository/i);
  expect(message).toBeVisible();
});
