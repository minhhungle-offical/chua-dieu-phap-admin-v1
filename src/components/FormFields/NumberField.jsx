import React from "react";
import { useController } from "react-hook-form";

export function NumberField({
  label,
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  disabled = false,
  min,
  max,
  step = 1,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <input
        id={name}
        {...field}
        {...rest}
        type="number"
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`border rounded-md px-3 py-2 text-gray-900
          focus:outline-none focus:ring-2 focus:ring-[#147265] focus:border-[#147265]
          transition
          ${
            invalid
              ? "border-red-600 focus:ring-red-600 focus:border-red-600"
              : "border-gray-300"
          }
        `}
      />

      {invalid && (
        <p className="text-xs text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}
