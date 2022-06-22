import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

import Blog from "./Blog";
const blog = {
  title: "Teaching Fullstack",
  author: "Dan Sabelli",
  url: "fullstackdan.com",
  likes: 2,
  userId: "62ac789076d378adbe5647aa",
};
test("renders blogs with title and author only", () => {
  render(<Blog blog={blog} />);

  const elem1 = screen.getByText("Teaching Fullstack Dan Sabelli", {
    exact: true,
  });
  const elem2 = screen.getByText("fullstackdan.com", { exact: false });
  expect(elem1).toBeInTheDocument();

  expect(elem2).not.toBeVisible();
});

test("renders blogs with url when view button clicked", () => {
  const mockHandler = jest.fn();

  render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const button = screen.getByRole("button", { name: "view" });
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("like button clicked twice", () => {
  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();
  render(
    <Blog
      blog={blog}
      toggleVisibility={mockHandler1}
      handleLikes={mockHandler2}
    />
  );

  const viewButton = screen.getByRole("button", { name: "view" });
  fireEvent.click(viewButton);
  const likeButton = screen.getByTestId("likes");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler2.mock.calls).toHaveLength(2);
});
