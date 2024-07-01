import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { FormField } from './type'

type SelectComponentProps = {
    formField: FormField;
    formFields: FormField[];
    setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
};

export default function SelectComponent({ formField, formFields, setFormFields }: SelectComponentProps) {
    const addOption = () => {
        const updatedChilds = [...(formField.childs || []), { id: uuidv4(), value: '' }];
        updateFormField({ childs: updatedChilds });
    };

    const removeOption = (id: string) => {
        const updatedChilds = (formField.childs || []).filter(child => child.id !== id);
        updateFormField({ childs: updatedChilds });
    };

    const updateOption = (id: string, value: string) => {
        const updatedChilds = (formField.childs || []).map(child => child.id === id ? { ...child, value } : child);
        updateFormField({ childs: updatedChilds });
    };

    const updateFormField = (updatedField: Partial<FormField>) => {
        const updatedFormFields = formFields.map((field) =>
            field.id === formField.id ? { ...field, ...updatedField } : field
        );
        setFormFields(updatedFormFields);
    };

    return (
        <div className="space-y-2">
            {formField.childs?.map((child, index) => (
                <div key={child.id} className="flex items-center gap-2">
                    <p className="font-semibold">{index + 1}</p>
                    <input
                        value={child.value}
                        type="text"
                        onChange={(e) => updateOption(child.id, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formField.childs?.length!! > 1 && (
                        <Button className="text-red-500" onClick={() => removeOption(child.id)}>x</Button>
                    )}
                </div>
            ))}
            <Button className="bg-indigo-500 text-white px-3 py-1 rounded-md" onClick={addOption}>Add Option</Button>
        </div>
    );
}
