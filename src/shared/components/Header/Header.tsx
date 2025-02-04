import React from "react";
import { observer } from "mobx-react";
import BooksModel from "src/features/Books/BooksModel";

interface HeaderI {
  presenter: BooksModel;
}

const Header: React.FC<HeaderI> = observer(({ presenter }) => {
  return (
    <header>
      <strong>
        Your private books count is: {presenter.privateBooksCount}
      </strong>
    </header>
  );
});

export default Header;
