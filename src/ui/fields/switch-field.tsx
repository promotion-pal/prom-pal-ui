"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { PromFormFiled } from "./form";
import { useFormContext } from "react-hook-form";
import { PromLabel } from "./label";
import { PromSwitch } from "../ui/switch";
import { PromSkeleton } from "../ui/skeleton";

interface PromSwitchFieldProps extends React.ComponentProps<
  typeof SwitchPrimitive.Root
> {
  name: string;
  label?: string;
  isLoad?: boolean;
  isDisable?: boolean;
}
const PromSwitchField: React.FC<PromSwitchFieldProps> = ({
  name,
  label,
  className,
  isLoad = false,
  isDisable = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <PromFormFiled
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {!isLoad ? (
            <div className="flex items-center gap-2">
              <PromSwitch
                id={name}
                disabled={isDisable}
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
              {label && <PromLabel htmlFor={name}>{label}</PromLabel>}
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
