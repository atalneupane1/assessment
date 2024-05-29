import React from "react";
import Tree from "./index";
import { render } from "@testing-library/react";

// Mocking a simple snapshot test
test("it matches the snapshot", () => {
  const { asFragment } = render(<Tree />);
  expect(asFragment()).toMatchSnapshot();
});