"use client"

import { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { FormField } from "./components/form-data/type";
import FormFieldComponent from "./components/form-data/FormFieldComponent";
import { DocumentTemplateContext } from "@/app/context/DocumentTemplateContext";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Page() {
    const { formFields, setFormFields } = useContext(DocumentTemplateContext)
    // const [formFields, setFormFields] = useState<FormField[]>([
    //     { id: uuidv4(), label: '', inputType: 'text' }
    // ]);

    const addDefaultFormFields = () => {
        setFormFields([...formFields, { id: uuidv4(), label: '', inputType: 'text' }]);
    };

    return (
        <div className="flex items-center justify-center p-4">
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
            </div>
        </div>
    );
}
