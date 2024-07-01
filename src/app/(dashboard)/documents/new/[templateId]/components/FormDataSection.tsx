import React, { useState, useEffect } from 'react';

// Define the types for the form fields and child elements
type FormChild = {
    id: string;
    value: string;
};

type FormField = {
    id: string;
    label: string;
    inputType: string;
    value?: string;
    childs?: FormChild[];
};

// Props type for the DynamicForm component
type DynamicFormProps = {
    fieldsets: FormField[];
    onSubmit: (formData: any) => void; // Updated type to handle more comprehensive form data
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fieldsets, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        // Initialize form data state based on fieldsets
        const initialFormData: Record<string, any> = {};
        fieldsets?.forEach(field => {
            initialFormData[field.id] = field.value || '';
        });
        setFormData(initialFormData);
    }, [fieldsets]);

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value,
        }));
    };

    const handleCheckboxChange = (fieldId: string, value: string) => {
        setFormData(prev => {
            const previousValues = prev[fieldId] || [];
            if (previousValues.includes(value)) {
                return {
                    ...prev,
                    [fieldId]: previousValues.filter((v: string) => v !== value),
                };
            } else {
                return {
                    ...prev,
                    [fieldId]: [...previousValues, value],
                };
            }
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const comprehensiveFormData = fieldsets.map(field => ({
            id: field.id,
            label: field.label,
            inputType: field.inputType,
            value: formData[field.id],
            childs: field.childs || [],
        }));
        onSubmit(comprehensiveFormData);
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-6">New Document</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fieldsets?.map((field) => (
                    <div key={field.id} className="flex flex-col space-y-2">
                        <label htmlFor={field.id} className="text-sm font-medium text-gray-700">{field.label}</label>
                        {renderInputField(field, handleInputChange, handleCheckboxChange, formData)}
                    </div>
                ))}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Create
                </button>
            </form>
        </div>
    );
};

function renderInputField(
    field: FormField,
    handleInputChange: (fieldId: string, value: any) => void,
    handleCheckboxChange: (fieldId: string, value: string) => void,
    formData: Record<string, any>
) {
    switch (field.inputType) {
        case 'text':
            return (
                <input
                    type="text"
                    id={field.id}
                    value={formData[field.id] || ''}
                    className="p-2 border rounded-md"
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
            );
        case 'multiple_choice':
            return (
                <div>
                    {(field.childs || []).map((choice) => (
                        <div key={choice.id} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name={field.id}
                                value={choice.value}
                                checked={formData[field.id] === choice.value}
                                onChange={() => handleInputChange(field.id, choice.value)}
                            />
                            <label>{choice.value}</label>
                        </div>
                    ))}
                </div>
            );
        case 'checkboxes':
            return (
                <div>
                    {(field.childs || []).map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={option.value}
                                checked={(formData[field.id] || []).includes(option.value)}
                                onChange={() => handleCheckboxChange(field.id, option.value)}
                            />
                            <label>{option.value}</label>
                        </div>
                    ))}
                </div>
            );
        case 'drop_down':
            return (
                <select
                    id={field.id}
                    value={formData[field.id] || ''}
                    className="p-2 border rounded-md"
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                >
                    <option value="">Select an option</option>
                    {(field.childs || []).map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            );
        default:
            return null;
    }
}

export default DynamicForm;
