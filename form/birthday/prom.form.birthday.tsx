import { cn } from "@/shared/lib/utils";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface PromBirthdayFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
}
export const PromBirthdayField = <T extends FieldValues>({
  name,
  label = "",
  description = "Выберите день, месяц и год вашего рождения",
  required = true,
}: PromBirthdayFieldProps<T>) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const days = useMemo(
    () => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1940 + 1 }, (_, i) =>
      String(currentYear - i),
    );
  }, []);

  useEffect(() => {
    const value = getValues(name);
    if (value && typeof value === "string") {
      const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        setSelectedYear(match[1]);
        setSelectedMonth(match[2]);
        setSelectedDay(match[3]);
      }
    }
  }, [getValues, name]);

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const dateString = `${selectedYear}-${selectedMonth}-${selectedDay}`;
      setValue(name, dateString as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(name, "" as any, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedDay, selectedMonth, selectedYear, name, setValue]);

  return (
    <Field>
      {label && (
        <FieldLabel>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
      )}

      <div className="flex gap-5 justify-center mt-1">
        <div>
          <Select
            value={selectedDay || undefined}
            onValueChange={setSelectedDay}
          >
            <SelectTrigger
              className={cn(error && "border-red-500 focus:ring-red-500")}
            >
              <SelectValue placeholder="День" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {days.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={selectedMonth || undefined}
            onValueChange={setSelectedMonth}
          >
            <SelectTrigger
              className={cn(error && "border-red-500 focus:ring-red-500")}
            >
              <SelectValue placeholder="Месяц" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={selectedYear || undefined}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger
              className={cn(error && "border-red-500 focus:ring-red-500")}
            >
              <SelectValue placeholder="Год" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && (
        <span className="text-red-500 text-sm mt-3 block text-center">
          {error}
        </span>
      )}
    </Field>
  );
};
