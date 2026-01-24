import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
interface PromSwitchFieldProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    name: string;
    label?: string;
    isLoad?: boolean;
    isDisable?: boolean;
}
declare const PromSwitchField: React.FC<PromSwitchFieldProps>;
export { PromSwitchField };
