import { FormField, InputType } from './type'
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import MultipleChoiceComponent from './MultipleChoiceComponent';
import CheckboxesComponent from './CheckboxesComponent';
import SelectComponent from './SelectComponent';

type FormFieldComponentProps = {
    formField: FormField;
    formFields: FormField[];
    setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
};

export default function FormFieldComponent({ formField, formFields, setFormFields }: FormFieldComponentProps) {
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        updateFormField(formField.id, { label: value });
    };

    const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.currentTarget;
        const updatedField = { ...formField, inputType: value as InputType };
        if (['multiple_choice', 'checkboxes', 'drop_down'].includes(value) && !updatedField.childs) {
            updatedField.childs = [{ id: uuidv4(), value: '' }];
        }
        updateFormField(formField.id, updatedField);
    };

    const updateFormField = (id: string, updatedField: Partial<FormField>) => {
        const updatedFormFields = formFields.map((field) =>
            field.id === id ? { ...field, ...updatedField } : field
        );
        setFormFields(updatedFormFields);
    };

    return (
        <div className="p-6 border rounded-lg shadow-sm bg-gray-50 space-y-4">
            <label htmlFor={formField.id} className="block text-sm font-medium text-gray-700">Label</label>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    value={formField.label}
                    onChange={handleLabelChange}
                    id={formField.id}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <select
                    value={formField.inputType}
                    onChange={handleInputTypeChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="text">Short text</option>
                    <option value="multiple_choice">Multiple choice</option>
                    <option value="checkboxes">Checkboxes</option>
                    <option value="drop_down">Drop-down</option>
                </select>
            </div>
            <FormFieldInput formField={formField} formFields={formFields} setFormFields={setFormFields} />
        </div>
    );
}

function FormFieldInput({ formField, formFields, setFormFields }: FormFieldComponentProps) {
    switch (formField.inputType) {
        case "multiple_choice":
            return <MultipleChoiceComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />;
        case "checkboxes":
            return <CheckboxesComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />;
        case "drop_down":
            return <SelectComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />;
        default:
            return <input type="text" value={formField?.value} onChange={e => {
                const { value } = e.currentTarget;
                setFormFields(formFields.map(field => field.id == formField.id ? {
                    ...formField,
                    value: value
                } : field));
            }} className="mt-2.5 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />;
    }
}
