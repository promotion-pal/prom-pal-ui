import { Label } from "@/shared/ui/label";
import { FieldValues, Path } from "react-hook-form";
import { useFormField } from "../prom.form";

interface PromFieldSwitchProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  className?: string;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const PromFieldSwitch = <T extends FieldValues>({
  name,
  label,
  className = "",
  disabled = false,
  onCheckedChange,
}: PromFieldSwitchProps<T>) => {
  const { setValue, error, value } = useFormField<T>({ name });

  const handleCheckedChange = (checked: boolean) => {
    setValue(checked);
    if (onCheckedChange) {
      onCheckedChange(checked);
    }
  };

  const currentValue = value ?? false;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        id={name}
        role="switch"
        aria-checked={currentValue}
        disabled={disabled}
        onClick={() => handleCheckedChange(!currentValue)}
        className={`
          relative inline-flex h-5 w-9 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
          ${currentValue ? "bg-primary" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
      >
        <span
          className={`
            inline-block h-3 w-3 transform rounded-full bg-white transition-transform
             ${currentValue ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>

      {label && (
        <Label htmlFor={name} className="font-medium cursor-pointer">
          {label}
        </Label>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
