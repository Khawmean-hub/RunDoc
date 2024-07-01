import { CheckCircle } from 'lucide-react';
import React from 'react';


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

// Props type for the DocumentView component
type DocumentViewProps = {
    fieldsets: FormField[] | any;
};

const DocumentView: React.FC<DocumentViewProps> = ({ fieldsets }) => {
    return (
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-gray-300">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Document Details</h1>
            <div className="space-y-6">
                {fieldsets?.map((field: any) => (
                    <div key={field.id} className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="text-green-500" />
                            <h2 className="text-xl font-semibold text-gray-700">{field.label}</h2>
                        </div>
                        <div className="ml-8">
                            {renderFieldContent(field)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

function renderFieldContent(field: FormField) {
    switch (field.inputType) {
        case 'text':
            return (
                <div className="p-4 border rounded-md bg-gray-50 text-gray-700">
                    {field.value}
                </div>
            );
        case 'multiple_choice':
            return (
                <div className="p-4 border rounded-md bg-gray-50 text-gray-700">
                    {field.value}
                </div>
            );
        case 'checkboxes':
            return (
                <div className="space-y-2">
                    {(field.value || [] as any).map((option: string, index: number) => (
                        <div key={index} className="p-2 border rounded-md bg-gray-50 text-gray-700">
                            {option}
                        </div>
                    ))}
                </div>
            );
        case 'drop_down':
            return (
                <div className="p-4 border rounded-md bg-gray-50 text-gray-700">
                    {field.value}
                </div>
            );
        default:
            return null;
    }
}

export default DocumentView;
