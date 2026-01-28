"use client";

import { ReactNode, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormState,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CommonPromComponentProps } from "prom-pal-ui/build/types/ui/types";

interface ExtendedFormMethods<
  T extends FieldValues = FieldValues,
> extends UseFormReturn<T> {
  setServerError: (error: string) => void;
  getServerError: () => string;
}

type PromFormRenderProps = {
  isValid: boolean;
  serverError?: string;
  isSubmitting: boolean;
  errors: Record<string, any>;
  form: ExtendedFormMethods<z.infer<any>>;
};

interface PromFromProps extends CommonPromComponentProps {
  children?: ReactNode;
  schema?: z.ZodObject<any>;
  defaultValues?: z.infer<any>;
  form?: ExtendedFormMethods<z.infer<any>>;
  onSubmit?: (data: z.infer<any>) => Promise<void>;
  render?: (props: PromFormRenderProps) => ReactNode;
}

const PromFrom = ({
  schema,
  render,
  children,
  onSubmit,
  defaultValues = {},
  form: externalForm,
}: PromFromProps) => {
  type FormData = z.infer<typeof schema>;

  const internalForm = useForm<FormData>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: defaultValues,
  });

  const [serverError, setServerError] = useState<string>("");

  const form = externalForm || {
    ...internalForm,
    setServerError,
    getServerError: () => serverError,
  };

  const { errors, isSubmitting, isValid } = form.formState;

  const handleOnSubmit = async (data: FormData) => {
    setServerError("");

    try {
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      let errorMessage = "Произошла ошибка при отправке формы";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setServerError(errorMessage);
    }
  };

  const handleSubmit = handleOnSubmit
    ? form.handleSubmit(handleOnSubmit)
    : undefined;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !onSubmit) {
            e.preventDefault();
          }
        }}
      >
        {render
          ? render({
              form,
              errors,
              isSubmitting,
              isValid,
              serverError,
            })
          : children}
      </form>
    </FormProvider>
  );
};

const usePromForm = <T extends FieldValues>() => {
  const form = useFormContext<T>() as ExtendedFormMethods<T>;
  const { errors, isSubmitting, isValid } = form.formState;

  return {
    form,
    errors,
    isValid,
    isSubmitting,
    serverError: form.getServerError?.() || "",
    reset: form.reset,
    watch: form.watch,
    control: form.control,
    trigger: form.trigger,
    register: form.register,
    setValue: form.setValue,
    getValues: form.getValues,
    setServerError: form.setServerError,
    handleSubmit: form.handleSubmit,
  };
};

const PromFormFiled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />;
};

const PromMessage = () => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  if (Object.keys(errors).length > 0) {
    return <p>Ошибка</p>;
  }
  return null;
};

const useCreatePromForm = ({
  schema,
  defaultValues,
}: {
  schema: z.ZodObject<any>;
  defaultValues?: z.infer<any>;
}) => {
  return useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });
};

export {
  PromFrom,
  usePromForm,
  PromMessage,
  PromFormFiled,
  useCreatePromForm,
  type PromFromProps,
  type PromFormRenderProps,
};
