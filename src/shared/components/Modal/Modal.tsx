import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalI {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalI> = ({ onClose, title, children }) => {
  return (
    <>
      {createPortal(
        <>
          <div
            className="overlay"
            onClick={onClose}
            data-testid="modal_overlay"
          />
          <div aria-live="polite" role="dialog" className="modal__wrapper">
            <button
              aria-label="Close modal"
              className="modal__close-btn"
              onClick={onClose}
              data-testid="close_modal"
            >
              x
            </button>
            <h2>{title}</h2>
            <div className="modal__body">{children}</div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default Modal;
