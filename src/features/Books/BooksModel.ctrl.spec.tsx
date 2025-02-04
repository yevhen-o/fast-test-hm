import { describe, it, expect, vi } from "vitest";
import BooksModel from "./BooksModel";
import booksRepository from "./Books.repository";
import { BookInterface } from "src/types/BookInterface";

describe("BooksModel", () => {
  it("should add a new book successfully", async () => {
    const booksModel = new BooksModel();

    const newBook: BookInterface = { author: "John Doe", name: "New Book" };

    vi.spyOn(booksRepository, "addBook").mockResolvedValue(newBook);

    await booksModel.addBook(newBook);

    expect(booksModel.books).toContainEqual(newBook);
    expect(booksModel.privateBooksCount).toBe(1);
    expect(booksModel.loading).toBe(false);
  });

  it("should not update books if addBook fails", async () => {
    const booksModel = new BooksModel();

    // Mock API Response with Error
    vi.spyOn(booksRepository, "addBook").mockResolvedValue({
      error: "Failed to add book",
      message: "Fail on test",
    });

    const newBook: BookInterface = { author: "Jane Doe", name: "Failed Book" };

    await booksModel.addBook(newBook);

    // Books should remain empty
    expect(booksModel.books).not.toContainEqual(newBook);
    expect(booksModel.privateBooksCount).toBe(0);
    expect(booksModel.loading).toBe(false);
  });
});
