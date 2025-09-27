import type { InputHTMLAttributes, FC } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className = '', ...props }) => (
  <input className={`input input-bordered w-full ${className}`} {...props} />
);

export default Input;
