"use client"
import { documentService, documentTemplateService } from '@/services';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicForm from './components/FormDataSection';
import { useRouter } from 'next/navigation';

// Define tab names
const tabs = [
    { name: 'Document Information', key: 'docInfo' },
    { name: 'Form Data', key: 'formData' }
];

// Helper function to combine class names conditionally
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function NewDocument({ params }: { params: { templateId: string } }) {
    // State management for form inputs
    const [formData, setFormData] = useState({
        name: '',
        templateId: params.templateId,
        status: '',
        remark: ''
    });

    useEffect(() => {
        getDocumentTemplate()
    }, [])
    // State management for active tab
    const [activeTab, setActiveTab] = useState('docInfo');
    const [documentTemplate, setDocumentTemplate] = useState<any>()
    const router = useRouter()

    // Handler for form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const getDocumentTemplate = () => {
        documentTemplateService.get(params.templateId).then(response => {
            setDocumentTemplate(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    // Handler for form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        documentService.create({
            name: formData.name,
            templateId: params.templateId, // Placeholder for actual templateId, as it's not included in the form
            remark: formData.remark
        }).then(response => {
            toast.success('Document created successfully');
        }).catch(er => {
            toast.error('Error creating document');
        })

    };

    return (
        <>
            <ToastContainer />
            <DynamicForm fieldsets={documentTemplate?.formData?.fieldsets} onSubmit={(data => {
                console.log(data)

                documentService.create({
                    name: `${documentTemplate?.title}_${Date.now()}`,
                    templateId: params.templateId, // Placeholder for actual templateId, as it's not included in the form
                    remark: formData.remark,
                    form: {
                        fields: data
                    }

                }).then(response => {
                    toast.success('Document created successfully');
                    router.push('/documents')
                }).catch(er => {
                    toast.error('Error creating document');
                })

            })}></DynamicForm>
            <div className='max-w-2xl'>
                {/* <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Document Title
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
                            Remark
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="remark"
                                id="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create
                        </button>
                    </div>
                </form> */}
            </div>
            <div className="text-gray-500 text-center py-6">

            </div>

        </>
    );
}
