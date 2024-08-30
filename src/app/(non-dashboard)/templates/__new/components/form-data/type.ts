export type InputType = "text" | "multiple_choice" | "checkboxes" | "drop_down";

export interface FormField {
    id: string;
    label: string;
    inputType: InputType;
    childs?: { id: string, value: string }[];
    value?:string
}
