import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";

export interface CommonPopoverProps {
  items: Array<{
    label: string;
    style?: string;
    icon?: ReactNode;
    hidden?: boolean;
    onClick: () => void;
  }>;
  styleWrapper?: string;
}
const CommonPopover: FC<CommonPopoverProps> = ({ items, styleWrapper }) => {
  const hasVisibleItems = items.some((item) => !item.hidden);

  if (!items || items.length === 0 || !hasVisibleItems) {
    return null;
  }
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "bg-popover rounded-lg p-1 ring-1 ring-foreground/10",
          styleWrapper,
        )}
      >
        <EllipsisIcon className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-48 p-1 flex flex-col gap-0.5">
        {items.map(
          (item, index) =>
            !item.hidden && (
              <Button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                }}
                variant="ghost"
                className={cn(
                  "w-full justify-between gap-2 font-normal text-xs px-2.5 py-1.5 h-auto text-left icon-inline",
                  item.style,
                )}
              >
                <span>{item.label}</span>
                {item.icon && (
                  <span className="text-slate-500">{item.icon}</span>
                )}
              </Button>
            ),
        )}
      </PopoverContent>
    </Popover>
  );
};
export { CommonPopover };
