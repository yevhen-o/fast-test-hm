import React from "react";
import { observer } from "mobx-react";
import BooksModel from "src/features/Books/BooksModel";
import Modal from "src/shared/components/Modal/Modal";

interface BooksAddModalI {
  presenter: BooksModel;
  onClose: () => void;
}
const BooksAddModal: React.FC<BooksAddModalI> = observer(
  ({ presenter, onClose }) => {
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const name = formData.get("name");
      const author = formData.get("author");
      if (
        name &&
        author &&
        typeof name === "string" &&
        typeof author === "string"
      ) {
        presenter.addBook({
          author,
          name,
        });
        onClose();
      }
    };
    return (
      <Modal title="Add private book" onClose={onClose}>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor={"name"}>Book name</label>
          <br />
          <input id="name" name="name" />
          <br />
          <label htmlFor={"author"}>Author</label>
          <br />
          <input id="author" name="author" />
          <br />
          <br />
          <button type="submit">Add book</button>
        </form>
      </Modal>
    );
  }
);

export default BooksAddModal;
