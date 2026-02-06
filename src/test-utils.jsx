import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * Custom render that wraps UI with MemoryRouter so components using
 * Link, useNavigate, etc. work in tests.
 */
function renderWithRouter(ui, options = {}) {
  const { ...renderOptions } = options;
  const Wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

export * from "@testing-library/react";
export { renderWithRouter as render };
