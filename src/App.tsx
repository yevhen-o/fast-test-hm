import BooksView from "./features/Books/ViewBooks/ViewBooks";
import BooksModel from "./features/Books/BooksModel";
import Header from "./shared/components/Header/Header";

const booksModel = new BooksModel();

function App() {
  return (
    <>
      <Header presenter={booksModel} />
      <h2>Books repository</h2>
      <BooksView presenter={booksModel} />
    </>
  );
}

export default App;
