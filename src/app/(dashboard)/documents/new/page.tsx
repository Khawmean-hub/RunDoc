"use client"

import { documentTemplateService } from "@/services"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SelectDocumentTemplate() {
    const router = useRouter()
    const [templates, setTemplates] = useState<any[]>([])
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

    useEffect(() => {
        listTemplates()
    }, [])

    function listTemplates() {
        documentTemplateService.list().then(response => {
            // Add a random background color to each template
            const templatesWithColors = response.data.map((template: any) => ({
                ...template,
                bgColor: getRandomColor()
            }))
            setTemplates(templatesWithColors)
        }).catch(er => {
            console.log(er)
            alert("Something went wrong")
        })
    }

    function handleContinue() {
        if (selectedTemplate) {
            
            router.push(`/documents/new/${selectedTemplate}`)
        } else {
            alert("No template selected")
        }
    }

    return (
        <>
            <h1 className="text-2xl font-medium">Select template</h1>
            <TemplatesList documentTemplates={templates} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
            <button 
                onClick={handleContinue} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={!selectedTemplate}
            >
                Continue
            </button>
        </>
    )
}

const getRandomColor = () => {
    const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const TemplatesList = ({ documentTemplates, selectedTemplate, setSelectedTemplate }: any) => {
    return (
        <div className="grid grid-cols-4 gap-3 mt-4">
            {documentTemplates.map((template: any) => {
                const isSelected = selectedTemplate === template.id;
                return (
                    <div
                        key={template.id}
                        className={`p-10 text-2xl text-white rounded-md cursor-pointer ${template.bgColor} ${isSelected ? 'ring-4 ring-offset-2 ring-blue-500' : ''}`}
                        onClick={() => setSelectedTemplate(template.id)}
                    >
                        {template.title}
                    </div>
                );
            })}
        </div>
    );
};
