import { cn } from "@/shared/lib/utils";
import { Loader2Icon } from "lucide-react";
import { FC } from "react";

interface CommonLoaderProps {
  type: "page" | "modal";
  className?: string;
  text?: string;
}

export const CommonLoader: FC<CommonLoaderProps> = ({
  type,
  className,
  text = "Загрузка данных...",
}) => {
  if (type === "page") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center min-h-[50vh] w-full gap-3 animate-fade-in",
          className,
        )}
      >
        <Loader2Icon className="h-10 w-full max-w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">{text}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg animate-fade-in",
        className,
      )}
    >
      <Loader2Icon className="h-8 w-full max-w-8 animate-spin text-primary" />
      {text && (
        <p className="text-xs text-muted-foreground font-medium mt-2">{text}</p>
      )}
    </div>
  );
};
