import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import cn from "clsx";

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
  requiredMsg?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export function Input(props: InputProps) {
  const {
    name,
    label,
    type = "text",
    value,
    placeholder,
    error,
    disabled,
    required = false,
    requiredMsg = "This field is required",
    handleChange,
    className,
    ...restProps
  } = props;

  const { register, formState } = useFormContext() || {};
  const errors = formState?.errors || {};

  return (
    <div className={cn(styles.wrapper, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        {...(register && register(name, { ...(required && { required: requiredMsg }) }))}
        onChange={handleChange}
        {...restProps}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className={styles.inputError}>{message}</p>}
      />
    </div>
  );
}
