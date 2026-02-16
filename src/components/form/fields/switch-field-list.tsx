"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useFormContext } from "react-hook-form";
import { PromLabel } from "./label";
import { PromFormFiled } from "../form";
import { PromSwitch } from "../../ui/switch";
import { PromSkeleton } from "../../ui/skeleton";
import { PromDictionariesType } from "../../types";
import { cn } from "../../../function";
import { PromCheckbox } from "./checkbox";

interface PromSwitchListFieldProps {
  name: string;
  label?: string;
  isLoad?: boolean;
  errorMsg?: string;
  className?: string;
  disabled?: boolean;
  errorDisplay?: boolean;
  options: PromDictionariesType[];
  error?: (msg: string) => React.ReactNode;
}

const PromSwitchListField: React.FC<PromSwitchListFieldProps> = ({
  name,
  label,
  options,
  error,
  errorMsg,
  isLoad = false,
  disabled = false,
  errorDisplay = true,
  className,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <PromFormFiled
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("relative space-y-3", className)}>
          {label && <PromLabel>{label}</PromLabel>}

          {!isLoad ? (
            <div className="flex flex-wrap gap-5">
              {options.map((option) => {
                const values = field.value || [];
                const isChecked = values.includes(option.id);

                return (
                  <div key={option.id} className="flex items-center gap-2">
                    <PromCheckbox
                      id={`${name}-${option.id}`}
                      checked={isChecked}
                      disabled={disabled}
                      onCheckedChange={(checked: boolean) => {
                        const newValues = checked
                          ? [...values, option.id]
                          : values.filter((id: number) => id !== option.id);
                        field.onChange(newValues);
                      }}
                      {...props}
                    />

                    <PromLabel
                      htmlFor={`${name}-${option.id}`}
                      className={cn(
                        "text-gray-500 cursor-pointer",
                        disabled && "cursor-not-allowed opacity-50",
                      )}
                    >
                      {option.title}
                    </PromLabel>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {[1, 2, 3].map((i) => (
                <PromSkeleton key={i} className="w-10 h-5" />
              ))}
            </div>
          )}

          {errorDisplay && fieldState.error && (
            <>
              {error ? (
                error(fieldState.error.message)
              ) : (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        </div>
      )}
    />
  );
};

export { PromSwitchListField };
