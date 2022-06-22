import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

import BlogForm from "./BlogForm";

test("form calls event handler when submitted", () => {
  const mockHandler = jest.fn();

  render(<BlogForm handleBlogPost={mockHandler} />);

  const titleLabel = screen.getByLabelText("Title:");
  fireEvent.change(titleLabel, "Dan");
  const authorLabel = screen.getByLabelText("Author:");
  fireEvent.change(authorLabel, "Dan");
  const urlLabel = screen.getByLabelText("Url:");
  fireEvent.change(urlLabel, "Dan");

  const buttonElem = screen.getByRole("button");
  fireEvent.click(buttonElem);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
