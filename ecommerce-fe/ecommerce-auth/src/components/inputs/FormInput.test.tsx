import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";
import "@testing-library/jest-dom";
import React from "react";

describe("FormInput", () => {
  it("renders the input with the correct label", () => {
    render(
      <FormInput
        label="Username"
        type="text"
        name="username"
        autoComplete="username"
        required={true}
        onChange={() => {}}
        value=""
        color="primary"
      />
    );

    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
  });

  it("renders the input with the correct type", () => {
    render(
      <FormInput
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        required={true}
        onChange={() => {}}
        value=""
        color="primary"
      />
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("calls onChange function when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <FormInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        required={true}
        onChange={handleChange}
        value=""
        color="primary"
      />
    );

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies the correct CSS class based on color prop", () => {
    render(
      <FormInput
        label="Name"
        type="text"
        name="name"
        autoComplete="name"
        required={true}
        onChange={() => {}}
        value=""
        color="error"
      />
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveClass("ring-red-500");
  });
  it("creates a React element", () => {
    const element = React.createElement("div", null, "Hello, User!");
    expect(element.type).toBe("div");
    expect(element.props.children).toBe("Hello, User!");
  });
});
