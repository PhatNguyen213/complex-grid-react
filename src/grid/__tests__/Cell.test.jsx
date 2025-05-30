import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cell from "../Cell";

test("loads and displays greeting", async () => {
  render(<Cell resizing={false} handleResize={() => {}} />);

  expect(screen.getByTestId("grid-cell")).toBeInTheDocument();
});
