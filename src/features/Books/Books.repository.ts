import ApiGateway from "src/shared/ApiGateway";
import { BookInterface } from "src/types/BookInterface";

class BooksRepository {
  private httpGateway: ApiGateway;

  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get("/");
    return booksDto;
  };

  getPrivateBooks = async () => {
    const booksDto = await this.httpGateway.get("/private");
    return booksDto;
  };

  addBook = async (book: BookInterface) => {
    const bookAddDto = await this.httpGateway.post("/", book);
    return bookAddDto;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
