import { cn } from "@/shared/lib/utils";
import { Field, FieldLabel } from "@/shared/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface PromDateFieldProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    description?: string;
    required?: boolean;
}
export const PromDateField = <T extends FieldValues>({
    name,
    label = "",
    description,
    required = true,
}: PromDateFieldProps<T>) => {
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
        <Field className="w-full">
            {label && (
                <FieldLabel className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </FieldLabel>
            )}

            <div
                className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border bg-white shadow-sm transition-colors",
                    error
                        ? "border-red-500 bg-red-50/10 focus-within:ring-1 focus-within:ring-red-500"
                        : "border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
                )}
            >
                <div className="flex-1">
                    <Select
                        value={selectedDay || undefined}
                        onValueChange={setSelectedDay}
                    >
                        <SelectTrigger className="border-none shadow-none focus:ring-0 px-2 h-9 bg-transparent">
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

                <div className="h-5 w-[1px] bg-gray-200" />

                <div className="flex-[1.2]">
                    <Select
                        value={selectedMonth || undefined}
                        onValueChange={setSelectedMonth}
                    >
                        <SelectTrigger className="border-none shadow-none focus:ring-0 px-2 h-9 bg-transparent">
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

                <div className="h-5 w-[1px] bg-gray-200" />

                <div className="flex-1">
                    <Select
                        value={selectedYear || undefined}
                        onValueChange={setSelectedYear}
                    >
                        <SelectTrigger className="border-none shadow-none focus:ring-0 px-2 h-9 bg-transparent">
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
                <span className="text-gray-400 text-xs mt-1.5 block px-1">
                    {description}
                </span>
            )}

            {error && (
                <span className="text-red-500 text-xs font-medium mt-1.5 block px-1">
                    {error}
                </span>
            )}
        </Field>
    );
};