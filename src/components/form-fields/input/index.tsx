import { ChangeEvent, HTMLInputTypeAttribute, forwardRef } from "react";
import cn from "clsx";
import { useFormContext } from "react-hook-form";

import styles from "./styles.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
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
    }: InputProps,
    ref
  ) => {
    const { register } = useFormContext() || {};

    return (
      <div className={cn(styles.wrapper, className)}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...(register && register(name))}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
