import type { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  invalid?: boolean;
  helper?: string;
}

const Input: FC<InputProps> = ({
  className = "",
  label,
  invalid,
  helper,
  ...props
}) => (
  <div
    className="w-full flex flex-col gap-1 items-start group"
    data-invalid={invalid}
  >
    {label && (
      <label htmlFor="" className="fieldset-label text-sm">
        {label}
      </label>
    )}
    <input
      className={clsx(
        "input input-bordered w-full group-data-[invalid=true]:outline-red-500",
        className,
      )}
      {...props}
    />
    {helper && (
      <p className="text-xs group-data-[invalid=true]:text-red-500">{helper}</p>
    )}
  </div>
);

export default Input;
