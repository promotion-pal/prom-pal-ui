import { InputHTMLAttributes } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import z from "zod";

export interface PromFormFields extends InputHTMLAttributes<HTMLInputElement> { }

export interface PromFieldsConfig<S extends z.ZodSchema> {
  schema: S;
  defaultValues: z.infer<S>;
}

interface UseFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export const useFormField = <T extends FieldValues>({
  name,
}: UseFormFieldProps<T>) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<T>();

  const error = errors[name]?.message as string;
  const value = watch(name);

  return {
    name,
    register: register(name),
    error,
    value,
    setValue: (val: any) => setValue(name, val),
    getValue: () => getValues(name),
  };
};
