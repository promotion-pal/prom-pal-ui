import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface PromCalendarFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const PromCalendarField = <T extends FieldValues>({
  name,
  label,
  placeholder = "",
  className,
}: PromCalendarFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={name}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border rounded-lg p-2 h-10",
                  !field.value && "text-muted-foreground",
                  error && "border-red-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {field.value ? (
                  new Date(field.value).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
