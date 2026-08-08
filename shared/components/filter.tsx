import { FC, PropsWithChildren } from "react";
import { SlidersHorizontal } from "lucide-react";

interface CommonFilterProps extends PropsWithChildren {
    count?: number;
}

export const CommonFilter: FC<CommonFilterProps> = ({ count, children }) => {
    return (
        <section className="w-fit flex flex-col md:flex-row items-start md:items-center gap-4 p-3 bg-muted/30 border border-border rounded-2xl">
            <div className="flex items-center gap-2.5 text-muted-foreground text-sm font-medium border-b md:border-b-0 md:border-r border-border pb-2 md:pb-0 md:pr-4 shrink-0">
                <SlidersHorizontal className="size-4 text-primary" />
                <span>Фильтры</span>

                {typeof count === "number" && (
                    <span className="flex items-center justify-center px-2 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                        {count}
                    </span>
                )}
            </div>

            <div className="w-full flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                    {children}
                </div>
            </div>
        </section>
    );
};
