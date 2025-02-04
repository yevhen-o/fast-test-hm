import React from "react";
import { observer } from "mobx-react";
import BooksModel from "../BooksModel";
import BooksAddModal from "../BooksAddModal/BooksAddModal";

interface BooksViewProps {
  presenter: BooksModel;
}

const BooksView: React.FC<BooksViewProps> = observer(({ presenter }) => {
  if (presenter.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label htmlFor={"fAll"}>Show all books</label>
        <input
          onChange={() => presenter.setFilter("all")}
          checked={presenter.filter === "all"}
          id="fAll"
          type="radio"
          name="filter"
          value="all"
        />
        <br />
        <label htmlFor={"fPrivate"}>Show private books</label>
        <input
          onChange={() => presenter.setFilter("private")}
          checked={presenter.filter === "private"}
          id="fPrivate"
          type="radio"
          name="filter"
          value="private"
        />
      </div>
      {presenter.books?.map((book, i) => (
        <div className="book" key={i}>
          {book.author}: {book.name}
        </div>
      ))}
      <button onClick={() => presenter.setIsAddModalShown(true)}>Add</button>
      {presenter.isAddModalShown && (
        <BooksAddModal
          presenter={presenter}
          onClose={() => presenter.setIsAddModalShown(false)}
        />
      )}
    </div>
  );
});

export default BooksView;
