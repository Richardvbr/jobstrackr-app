import React, { ChangeEvent } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import cn from "clsx";

import styles from "./styles.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  value?: string | number;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredMsg?: string;
  handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export function Textarea(props: InputProps) {
  const {
    name,
    label,
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

  const preventSubmitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <label htmlFor={name}>{required ? `${label} *` : label}</label>
      <textarea
        id={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        {...(register && register(name, { ...(required && { required: requiredMsg }) }))}
        onChange={handleChange}
        onKeyDown={(e) => preventSubmitOnEnter(e)}
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
