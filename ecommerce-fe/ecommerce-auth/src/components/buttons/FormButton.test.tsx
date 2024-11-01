import { render, screen, fireEvent } from "@testing-library/react";
import { FormButton } from "./FormButton";
import "@testing-library/jest-dom";
import React from "react";

describe("FormButton", () => {
  it("it renders correctly", () => {
    render(<FormButton type="button" text="Test Button" />);

    const button = screen.getByText("Test Button");
    expect(button).toBeInTheDocument();
  });

  it("renders with correct type attribute", () => {
    render(<FormButton type="submit" text="Submit" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("onClick function is called", () => {
    const mockOnClick = jest.fn();
    render(<FormButton type="button" text="Click" onClick={mockOnClick} />);

    const button = screen.getByText("Click");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders with correct CSS classes", () => {
    render(<FormButton type="button" text="Style Test" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex", "w-full", "justify-center", "rounded-md", "bg-indigo-600");
  });

  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
