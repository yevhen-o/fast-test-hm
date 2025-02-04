import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BooksModel from "src/features/Books/BooksModel";
import booksRepository from "src/features/Books/Books.repository";
import Header from "./Header";
import { BookInterface } from "src/types/BookInterface";

// Mock MobX Observer to avoid unnecessary reactivity issues in tests
vi.mock("mobx-react", () => ({
  observer: (component: unknown) => component,
}));

describe("Header Component", () => {
  it("renders correctly with zero private books", () => {
    const booksModel = new BooksModel();
    render(<Header presenter={booksModel} />);

    expect(
      screen.getByText("Your private books count is: 0")
    ).toBeInTheDocument();
  });

  it("displays correct private book count", () => {
    const booksModel = new BooksModel();
    booksModel.privateBooksCount = 3;

    render(<Header presenter={booksModel} />);

    expect(
      screen.getByText("Your private books count is: 3")
    ).toBeInTheDocument();
  });

  it("updates when private books change", async () => {
    const booksModel = new BooksModel();

    const newBook: BookInterface = { author: "John Doe", name: "New Book" };
    vi.spyOn(booksRepository, "addBook").mockResolvedValue(newBook);

    await booksModel.addBook(newBook);

    const { rerender } = render(<Header presenter={booksModel} />);
    expect(
      screen.getByText("Your private books count is: 1")
    ).toBeInTheDocument();

    await booksModel.addBook(newBook);
    rerender(<Header presenter={booksModel} />);

    expect(
      screen.getByText("Your private books count is: 2")
    ).toBeInTheDocument();
  });
});
