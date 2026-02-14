"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useFormContext } from "react-hook-form";
import { PromLabel } from "./label";
import { PromFormFiled } from "../form";
import { PromSwitch } from "../../ui/switch";
import { PromSkeleton } from "../../ui/skeleton";
import { PromFieldProps } from "./types";

interface PromSwitchFieldProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>, PromFieldProps {
  name: string;
}
const PromSwitchField: React.FC<PromSwitchFieldProps> = ({
  name,
  label,
  error,
  errorMsg,
  isLoad = false,
  disabled = false,
  errorDisplay = true,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <PromFormFiled
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {!isLoad ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PromSwitch
                  id={name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...props}
                />

                {label && <PromLabel htmlFor={name}>{label}</PromLabel>}
              </div>

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
          ) : (
            <PromSkeleton className="w-10 h-2" />
          )}
        </>
      )}
    />
  );
};

export { PromSwitchField };
