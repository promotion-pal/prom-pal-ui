import React, { FC } from "react";
import { PromComponentProps, PromStyle } from "../../types";
interface PromInputProps extends PromComponentProps, PromStyle, Omit<React.ComponentProps<"input">, "name"> {
    name: string;
    label?: string;
}
declare const PromInput: FC<PromInputProps>;
export { PromInput };
