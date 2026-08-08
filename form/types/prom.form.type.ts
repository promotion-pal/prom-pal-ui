import { FieldValues } from "react-hook-form";

export interface PromCommonFormProps {
    refresh: () => Promise<void>,
    onCloseModal: () => void
}

export interface PromCommonFieldProps extends Partial<Pick<FieldValues, "label">> { }