import { FolderIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/shared/ui/empty";

export function CommonEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>

        <EmptyTitle>Ничего не найдено</EmptyTitle>

        <EmptyDescription>
          Здесь пока пусто. Начните добавлять данные, чтобы заполнить этот
          раздел.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

