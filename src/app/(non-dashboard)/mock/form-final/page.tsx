"use client"

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FormField } from './type'
import FormFieldComponent from './FormFieldComponent';
import { Button } from "@/components/ui/button";

export default function Page() {
    const [formFields, setFormFields] = useState<FormField[]>([
        { id: uuidv4(), label: '', inputType: 'text' }
    ]);

    const addDefaultFormFields = () => {
        setFormFields([...formFields, { id: uuidv4(), label: '', inputType: 'text' }]);
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-4">
            <button
                className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
                onClick={addDefaultFormFields}
            >
                + Add Field
            </button>
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto w-full space-y-6">
                {formFields.map((formField) => (
                    <FormFieldComponent
                        key={formField.id}
                        formField={formField}
                        formFields={formFields}
                        setFormFields={setFormFields}
                    />
                ))}
                <pre className="text-xs text-gray-500 overflow-auto max-h-48">{JSON.stringify(formFields, null, 2)}</pre>
            </div>
        </div>
    );
}
