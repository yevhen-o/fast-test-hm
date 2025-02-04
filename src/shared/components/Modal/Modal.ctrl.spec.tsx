import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

it("should have right title and content", () => {
  const title = "Awesome title!";
  const content = "Awesome content";
  render(
    <Modal title={title} onClose={() => {}}>
      <h2>{content}</h2>
    </Modal>
  );
  const message = screen.queryByText(title);
  const body = screen.queryByText(content);
  expect(message).toBeVisible();
  expect(body).toBeVisible();
});

it("should run close function on click close button or overlay", () => {
  const title = "Awesome title!";
  const content = "Awesome content";
  let counter = 0;
  const closeFunction = () => counter++;
  const container = render(
    <Modal title={title} onClose={closeFunction}>
      <h2>{content}</h2>
    </Modal>
  );
  const closeButton = container.getByTestId("close_modal");
  fireEvent.click(closeButton);
  expect(counter).toBe(1);
  const modalOverlay = container.getByTestId("modal_overlay");
  fireEvent.click(modalOverlay);
  expect(counter).toBe(2);
});
