import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="block rounded-[4px] bg-[#6A778A] py-3 px-6 text-base font-medium text-white"
    >
      {children}
    </button>
  );
};
