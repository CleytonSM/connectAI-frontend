import type { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input: FC<InputProps> = ({ className = "", label, ...props }) => (
  <div className="w-full flex flex-col gap-1 items-start">
    {label && (
      <label htmlFor="" className="fieldset-label text-sm">
        {label}
      </label>
    )}
    <input className={`input input-bordered w-full ${className}`} {...props} />
  </div>
);

export default Input;
