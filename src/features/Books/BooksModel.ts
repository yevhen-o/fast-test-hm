import {
  observable,
  action,
  makeObservable,
  runInAction,
  reaction,
} from "mobx";
import booksRepository from "./Books.repository";
import { BookInterface } from "src/types/BookInterface";

interface BookI {
  author: string;
  name: string;
  isPrivate?: boolean;
}

class BooksModel {
  books: BookI[] = [];
  loading: boolean = false;
  filter: "all" | "private" = "all";
  isAddModalShown: boolean = false;
  privateBooksCount: number = 0;

  constructor() {
    makeObservable(this, {
      books: observable,
      loading: observable,
      filter: observable,
      isAddModalShown: observable,
      privateBooksCount: observable,

      loadBooks: action,
      addBook: action,
      setFilter: action,
      setIsAddModalShown: action,
    });

    // Auto-load books when filter changes
    reaction(
      () => this.filter, // Track filter changes
      () => {
        this.loadBooks();
      },
      { fireImmediately: true } // Run once on initialization
    );
  }

  async loadBooks(isGetPrivateBooksCount: boolean = false) {
    this.loading = true;
    const action =
      this.filter === "private" || isGetPrivateBooksCount
        ? booksRepository.getPrivateBooks
        : booksRepository.getBooks;

    const fetchedBooks = await action();
    runInAction(() => {
      if (!("error" in fetchedBooks)) {
        this.books = fetchedBooks;
        if (this.filter === "private" || isGetPrivateBooksCount) {
          this.privateBooksCount = fetchedBooks.length;
        }
      }
      this.loading = false;
    });
  }

  setFilter(filter: "all" | "private") {
    this.filter = filter;
  }

  setIsAddModalShown(isAddModalShown: boolean) {
    this.isAddModalShown = isAddModalShown;
  }

  async addBook(book: BookInterface) {
    this.loading = true;
    const newBook = await booksRepository.addBook(book);
    runInAction(() => {
      if (!("error" in newBook)) {
        this.books.push(book);
        this.privateBooksCount += 1;
      }
      this.loading = false;
    });
  }
}

export default BooksModel;
