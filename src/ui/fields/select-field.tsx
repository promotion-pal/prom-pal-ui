import { useFormContext } from "react-hook-form";
import { PromFormFiled } from "./form";
import { FC } from "react";
import { CommonPromComponentProps, CommonPromStyle } from "../types";
import { PromLabel } from "./label";
import {
  PromSelect,
  PromSelectContent,
  PromSelectItem,
  PromSelectTrigger,
  PromSelectValue,
} from "../ui/select";
import { PromSkeleton } from "../ui/skeleton";

interface PromSelectType {
  key: string | number;
  value: string;
}
type PromSelectFieldProps = CommonPromStyle &
  CommonPromComponentProps & {
    name: string;
    label?: string;
    placeholder?: string;
    options: PromSelectType[];
  };
const PromSelectField: FC<PromSelectFieldProps> = ({
  name,
  label,
  isLoad,
  options,
  placeholder,
  styleWrapper,
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

          {!isLoad ? (
            <PromSelect
              value={String(field.value)}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <PromSelectTrigger className="w-full">
                <PromSelectValue placeholder={placeholder} />
              </PromSelectTrigger>

              <PromSelectContent className="max-h-50">
                {options.map((item) => (
                  <PromSelectItem key={item.key} value={String(item.key)}>
                    {item.value}
                  </PromSelectItem>
                ))}
              </PromSelectContent>
            </PromSelect>
          ) : (
            <PromSkeleton className="w-full h-10" />
          )}

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

// --------

function promSelectFilterOptions<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, allowedKeys: K[]): Array<{ key: K; value: T[K] }> {
  return Object.entries(obj)
    .filter(([key]) => allowedKeys.includes(key as K))
    .map(([key, value]) => ({
      key: key as K,
      value: value as T[K],
    }));
}

export { PromSelectField, promSelectFilterOptions };
