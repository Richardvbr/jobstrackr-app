import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import cn from "clsx";
import { useFormContext } from "react-hook-form";

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

const Input = ({
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
}: InputProps) => {
  const { register } = useFormContext() || {};

  return (
    <div className={cn(styles.wrapper, className)}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...(register && register(name))}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Input;
