import { useFormContext } from "react-hook-form";

import type { SelectInputItem } from "@/types/elements";
import styles from "./styles.module.scss";

type SelectInputProps = React.ComponentPropsWithoutRef<"select"> & {
  item: SelectInputItem;
  disabled?: boolean;
  value?: string;
};

export function SelectInput({ item, disabled, value, ...props }: SelectInputProps) {
  const { register } = useFormContext() || {};

  const { name, label, options } = item;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={label}>{label}</label>
      <select {...(register && register(name))} disabled={disabled} name={name} {...props}>
        {options.map(({ value, label }) => (
          <option key={`${value}-${label}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
