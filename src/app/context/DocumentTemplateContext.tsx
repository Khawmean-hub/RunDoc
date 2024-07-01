import React, { createContext, useState, ReactNode } from 'react';
import { FormField } from '../(non-dashboard)/templates/new/components/form-data/type';
import { v4 as uuidv4 } from 'uuid';

interface Document {
    title: string;
    description: string;
    content: string;
}

const levels_sample = [
    {
        "name": "string",
        "levelNumber": 0,
        "users": [
            {
                "id": "string",
                "username": "string"
            }
        ],
        "remark": "string"
    }
]

export type Level = (typeof levels_sample)[number]

interface Settings {
    setting1: boolean;
    setting2: string;
}

interface TemplateContextType {
    templateTitle: string,
    setTemplateTitle: React.Dispatch<React.SetStateAction<string>>
    form: Document;
    setForm: React.Dispatch<React.SetStateAction<Document>>;
    levels: Level[];
    setLevels: React.Dispatch<React.SetStateAction<Level[]>>;
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    formFields:FormField[],
    setFormFields:React.Dispatch<React.SetStateAction<FormField[]>>
}

export const DocumentTemplateContext = createContext<TemplateContextType>({} as TemplateContextType);

export const DocumentTemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [templateTitle, setTemplateTitle] = useState('untitled template')
    const [form, setForm] = useState<Document>({ title: '', description: '', content: '' });
    const [levels, setLevels] = useState<Level[]>([]);
    const [settings, setSettings] = useState<Settings>({ setting1: false, setting2: 'option1' });
    const [formFields, setFormFields] = useState<FormField[]>([
        { id: uuidv4(), label: '', inputType: 'text' }
    ]);

    return (
        <DocumentTemplateContext.Provider value={{
            form,
            setForm,
            levels,
            setLevels,
            settings,
            setSettings,
            templateTitle,
            setTemplateTitle,
            formFields,
            setFormFields
        }}>
            {children}
        </DocumentTemplateContext.Provider>
    );
};