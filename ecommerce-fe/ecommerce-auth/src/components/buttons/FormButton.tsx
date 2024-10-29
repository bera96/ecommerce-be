import { FC } from "react";

interface FormButtonProps {
  type: "submit" | "button";
  text: string;
  onClick?: () => void;
}

export const FormButton: FC<FormButtonProps> = ({ text, type, onClick }) => {
  return (
    <button
      type={type}
      className="flex w-full justify-center rounded-md mt-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
