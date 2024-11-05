import React from "react";

type FormInputsProps = {
  label: string;
  type: string;
  name: string;
  autoComplete: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  color: "primary" | "error";
  testId?: string;
};

const FormInput = ({
  label,
  type,
  name,
  autoComplete,
  required,
  onChange,
  value,
  color,
  testId,
}: FormInputsProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          data-testid={testId}
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            color === "error" ? "ring-red-500" : ""
          }`}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default FormInput;
