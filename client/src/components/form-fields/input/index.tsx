import { ChangeEvent, HTMLInputTypeAttribute, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import cn from "clsx";

import styles from "./styles.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    type = "text",
    value,
    placeholder,
    error,
    disabled,
    required,
    handleChange,
    className,
    ...props
  },
  ref
) {
  const { register } = useFormContext() || {};

  return (
    <div className={cn(styles.wrapper, className)}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...(register && register(name))}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
