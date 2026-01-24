"use client";

import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { PromLabel } from "./label";
import { PromComponentProps, PromStyle } from "../../types";
import { PromFormFiled } from "../form";
import { cn } from "../../../function";

interface PromTextareaProps
  extends
    PromStyle,
    PromComponentProps,
    Omit<React.ComponentProps<"textarea">, "name"> {
  name: string;
  label?: string;
}

const PromTextarea: FC<PromTextareaProps> = ({
  name,
  label,
  isLoad,
  styleTitle,
  styleWrapper,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <PromFormFiled
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          {label && (
            <PromLabel className="block text-sm font-medium">{label}</PromLabel>
          )}

          <textarea
            {...field}
            data-slot="textarea"
            className={cn(
              "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              styleWrapper,
            )}
            {...props}
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

export { PromTextarea };
