import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import BooksAddModal from "./BooksAddModal";
import BooksModel from "../BooksModel";

vi.mock("src/shared/components/Modal/Modal", () => ({
  default: ({
    title,
    children,
    onClose,
  }: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="modal">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("BooksAddModal", () => {
  let presenter: BooksModel;
  let onClose: () => void;

  beforeEach(() => {
    presenter = new BooksModel();
    onClose = vi.fn();
    vi.spyOn(presenter, "addBook").mockImplementation(() => Promise.resolve());
  });

  it("renders correctly with title", () => {
    render(<BooksAddModal presenter={presenter} onClose={onClose} />);

    expect(screen.getByText("Add private book")).toBeInTheDocument();
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<BooksAddModal presenter={presenter} onClose={onClose} />);

    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls presenter.addBook with correct data", () => {
    render(<BooksAddModal presenter={presenter} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText("Book name"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByText("Add book"));

    expect(presenter.addBook).toHaveBeenCalledWith({
      name: "Test Book",
      author: "John Doe",
    });
  });

  it("calls onClose after submitting the form", () => {
    render(<BooksAddModal presenter={presenter} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText("Book name"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByText("Add book"));

    expect(onClose).toHaveBeenCalled();
  });

  it("does not submit if inputs are empty", () => {
    render(<BooksAddModal presenter={presenter} onClose={onClose} />);

    fireEvent.click(screen.getByText("Add book"));

    expect(presenter.addBook).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
