import { cn } from "@/shared/lib/utils";
import { ComponentProps, FC, PropsWithChildren, ReactNode, useState } from "react";
import { Badge } from "../ui/badge";
import { CommonFilter } from "./filter";
import { LayoutGrid, Table2 } from "lucide-react";

interface WrapperStudentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: ReactNode;
  filter?: {
    render: ComponentProps<typeof CommonFilter>
  }
  styleChildren?: string;
}
const CommonWrapper = ({
  title,
  action,
  filter,
  children,
  description,
  styleChildren,
}: WrapperStudentProps) => {
  return (
    <section className="px-6 py-4 relative">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <h2 className="h1">{title}</h2>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>

        {filter?.render && (
          <CommonFilter {...filter.render} />
        )}
      </div>

      <div className={cn(styleChildren, "mt-7")}>{children}</div>
    </section>
  );
};

interface CommonWrapperBadgeProps {
  data?: any[]
  title: string
}
const CommonWrapperBadge: FC<CommonWrapperBadgeProps> = ({ data, title }) => {
  if (!data) return

  return <div className="flex items-center justify-between mb-4">
    <p className="h3">{title}</p>

    <Badge variant="secondary" className="text-sm">
      {data.length}
    </Badge>
  </div>
}

export { CommonWrapper, CommonWrapperBadge };


interface CommonWrapperViewModeProps extends ReturnType<typeof useCommonWrapperViewMode> {
  cards: ReactNode
  tables: ReactNode
}
const CommonWrapperViewMode: FC<PropsWithChildren<CommonWrapperViewModeProps>> = ({ cards, tables, viewMode, setViewMode }) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <CommonWrapperViewModeToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "cards" ? cards : tables}
    </>
  );
};

interface CommonWrapperViewModeToggleProps {
  viewMode: CommonWrapperViewModeType;
  onChange: (mode: CommonWrapperViewModeType) => void;
}
const CommonWrapperViewModeToggle: FC<CommonWrapperViewModeToggleProps> = ({ viewMode, onChange }) => {
  const options: { key: CommonWrapperViewModeType; label: string; icon: FC<{ className?: string }> }[] = [
    { key: "cards", label: "Карточки", icon: LayoutGrid },
    { key: "table", label: "Таблица", icon: Table2 },
  ];

  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-border bg-muted/40">
      {options.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "icon-inline gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors",
            viewMode === key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
};

type CommonWrapperViewModeType = "cards" | "table";
const useCommonWrapperViewMode = () => {
  const [viewMode, setViewMode] = useState<CommonWrapperViewModeType>("cards");

  return {
    viewMode,
    setViewMode
  }
}

export {
  CommonWrapperViewMode,
  useCommonWrapperViewMode,
  CommonWrapperViewModeToggle,
}