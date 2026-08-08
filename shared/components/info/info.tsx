import { cn } from "@/shared/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/ui/popover";

import { ArrowUpRight, CircleQuestionMarkIcon } from "lucide-react";
import { FC, ReactNode } from "react";

interface CommonInfoProps {
  title: string;
  link?: {
    href: string;
    label: string;
  };
  style?: string;
  action?: ReactNode;
  description: string;
}
export const CommonInfo: FC<CommonInfoProps> = ({
  link,
  style,
  title,
  description,
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("text-accent cursor-pointer", style)}>
        <CircleQuestionMarkIcon size={25} />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>

          {link && (
            <a
              href={link.href}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium flex items-center justify-between mt-3"
            >
              {link.label}
              <ArrowUpRight />
            </a>
          )}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};
