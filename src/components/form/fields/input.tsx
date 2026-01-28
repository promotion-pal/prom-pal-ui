"use client";

import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import { PromLabel } from "./label";
import { PromComponentProps, PromStyle } from "../../types";
import { PromFormFiled } from "../form";
import { cn } from "../../../function";

interface PromInputProps
  extends
    PromComponentProps,
    PromStyle,
    Omit<React.ComponentProps<"input">, "name"> {
  name: string;
  label?: string;
  allowedPattern?: RegExp;
  mask?: (e: string) => string;
}

const PromInput: FC<PromInputProps> = ({
  name,
  mask,
  label,
  isLoad,
  styleTitle,
  styleWrapper,
  type = "text",
  allowedPattern,
  ...props
}) => {
  const { control, setValue } = useFormContext();

  const handleChange = (value: string) => {
    let processedValue = value;

    if (mask) {
      processedValue = mask(value);
    }

    if (allowedPattern) {
      if (!allowedPattern.test(processedValue)) {
        return;
      }
    }

    setValue(name, processedValue as any);
  };

  return (
    <PromFormFiled
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          {label && (
            <PromLabel className="block text-sm font-medium">{label}</PromLabel>
          )}

          <input
            {...field}
            {...props}
            onChange={(e) => handleChange(e.target.value)}
            type={type}
            disabled={isLoad || props.disabled}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              styleWrapper,
              styleTitle,
            )}
          />

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export { PromInput };
