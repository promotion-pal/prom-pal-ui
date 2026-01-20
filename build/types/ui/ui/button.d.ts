import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { CommonPromComponentProps } from "../types";
declare const buttonVariants: (props?: {
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const skeletonVariants: (props?: {
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
} & import("class-variance-authority/dist/types").ClassProp) => string;
interface PromButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants>, CommonPromComponentProps {
    asChild?: boolean;
    loadingText?: string;
}
declare function PromButton({ size, variant, children, disabled, className, loadingText, isLoad, asChild, skeleton, ...props }: PromButtonProps): import("react/jsx-runtime").JSX.Element;
export { PromButton, buttonVariants, skeletonVariants };
