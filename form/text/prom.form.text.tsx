import { CommonInfo } from "@/shared/components/info";
import { cn } from "@/shared/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ComponentProps, useState, useRef } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useFormField } from "../prom.form";

interface PromFieldInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  className?: string;
  placeholder?: string;
  mask?: (value: string) => string;
  allowedPattern?: RegExp;
  maxLength?: number;
  info?: ComponentProps<typeof CommonInfo>;
  type?: "text" | "email" | "tel" | "password";
}

export const PromFieldInput = <T extends FieldValues>({
  name,
  mask,
  allowedPattern,
  maxLength,
  info,
  label,
  placeholder,
  type = "text",
  className = "border rounded-lg p-2 w-full",
}: PromFieldInputProps<T>) => {
  const { register, error } = useFormField<T>({ name });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const lastValidValue = useRef<string>("");

  const isPassword = type === "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let incomingValue = e.target.value;

    if (allowedPattern && incomingValue !== "" && !allowedPattern.test(incomingValue)) {
      e.target.value = lastValidValue.current;
      return;
    }

    if (mask) {
      incomingValue = mask(incomingValue);
    }

    if (maxLength !== undefined && incomingValue.length > maxLength) {
      incomingValue = incomingValue.substring(0, maxLength);
    }

    e.target.value = incomingValue;
    lastValidValue.current = incomingValue;

    register.onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full flex gap-3">
        <input
          id={name}
          type={isPassword ? (passwordVisible ? "text" : "password") : type}
          {...register}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(className, isPassword && "pr-10")}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700"
            aria-label={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
          >
            {passwordVisible ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}

        {info && <CommonInfo {...info} />}
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

interface PromFieldTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const PromFieldTextArea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 3,
  className = "border rounded-lg p-2 w-full resize-y",
}: PromFieldTextareaProps<T>) => {
  const { register, error } = useFormField<T>({ name });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}

      <textarea
        id={name}
        rows={rows}
        {...register}
        placeholder={placeholder}
        className={className}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
