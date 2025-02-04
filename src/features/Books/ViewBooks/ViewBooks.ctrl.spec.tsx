import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import ViewBooks from "./ViewBooks";
import BooksModel from "../BooksModel";

vi.mock("../BooksAddModal/BooksAddModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="add-book-modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("ViewBooks", () => {
  let presenter: BooksModel;

  beforeEach(() => {
    presenter = new BooksModel();
    vi.spyOn(presenter, "loadBooks").mockImplementation(() =>
      Promise.resolve()
    );
  });

  it("renders loading state initially", () => {
    presenter.loading = true;

    render(<ViewBooks presenter={presenter} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays books correctly", async () => {
    presenter.books = [
      { author: "John Doe", name: "Book 1" },
      { author: "Jane Doe", name: "Book 2" },
    ];
    presenter.loading = false;

    render(<ViewBooks presenter={presenter} />);

    expect(screen.getByText("John Doe: Book 1")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe: Book 2")).toBeInTheDocument();
  });

  it("changes filter when clicking radio buttons", async () => {
    presenter.loading = false;
    render(<ViewBooks presenter={presenter} />);

    const privateFilter = screen.getByLabelText("Show private books");
    fireEvent.click(privateFilter);

    expect(presenter.filter).toBe("private");

    const allFilter = screen.getByLabelText("Show all books");
    fireEvent.click(allFilter);

    expect(presenter.filter).toBe("all");
  });

  it("opens and closes the add book modal", async () => {
    presenter.loading = false;
    render(<ViewBooks presenter={presenter} />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(screen.getByTestId("add-book-modal")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("add-book-modal")).not.toBeInTheDocument();
    });
  });
});
