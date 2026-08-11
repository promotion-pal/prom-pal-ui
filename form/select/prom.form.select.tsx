import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { useFormField } from "../prom.form";

export interface PromSelectOption {
  value: string | number;
  label: string;
}

interface PromFieldMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: PromSelectOption[];
  placeholder?: string;
  required?: boolean;
}
export const PromFieldMultiSelect = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Выберите значения...",
  required = false,
}: PromFieldMultiSelectProps<T>) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const selectedValues: (string | number)[] = watch(name) || [];
  const error = errors[name]?.message as string | undefined;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;

    const selectedOption = options.find((opt) => String(opt.value) === val);
    if (!selectedOption) return;

    const newValue = [...selectedValues, selectedOption.value];
    setValue(name, newValue as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });

    e.target.value = "";
  };

  const handleRemove = (valueToRemove: string | number) => {
    const newValue = selectedValues.filter((v) => v !== valueToRemove);
    setValue(name, newValue as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const availableOptions = options.filter(
    (opt) => !selectedValues.includes(opt.value),
  );

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex flex-wrap gap-1.5 p-2 border rounded-xl bg-white min-h-[42px]">
        {selectedValues.map((val) => {
          const option = options.find((opt) => opt.value === val);
          return option ? (
            <span
              key={val}
              className="flex items-center gap-1 bg-blue-50 text-blue-800 text-sm px-2 py-0.5 rounded"
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(val)}
                className="text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          ) : null;
        })}

        <select
          onChange={handleSelect}
          value=""
          disabled={availableOptions.length === 0}
          className="flex-1 bg-transparent outline-none text-sm min-w-[60px]"
        >
          <option value="" disabled>
            {availableOptions.length === 0 ? "Все выбраны" : placeholder}
          </option>
          {availableOptions.map((opt) => (
            <option key={opt.value} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

interface PromFieldSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: PromSelectOption[];
  placeholder?: string;
  className?: string;
}
export const PromFieldSelect = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Выберите значение...",
  className = "border rounded-lg p-2 w-full bg-background",
}: PromFieldSelectProps<T>) => {
  const { register, error } = useFormField<T>({ name });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}

      <select id={name} {...register} className={className} defaultValue="">
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
