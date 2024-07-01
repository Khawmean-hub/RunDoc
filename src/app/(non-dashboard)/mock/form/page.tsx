"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FormField, InputType } from './type'
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";

export default function Page() {
    const [formFields, setFormFields] = useState<FormField[]>([{
        id: uuidv4(),
        label: '',
        inputType: "text"
    }])

    const addDefaultFormFields = () => {
        setFormFields([...formFields,
        {
            id: uuidv4(),
            label: '',
            inputType: 'text'
        }
        ])
    }
    return <>
        <div className="bg-gray-100 flex items-center justify-center h-screen">

            <button className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg" onClick={addDefaultFormFields}>
                + add field
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                {formFields.map((formField) => {
                    return <FormFieldComponent key={formField.id} formField={formField} formFields={formFields} setFormFields={setFormFields} />
                })}
                {JSON.stringify(formFields)}
            </div>
        </div>

        <button className="add-form" onClick={() => {

        }}>

        </button>

    </>
}

function FormFieldComponent({
    setFormFields,
    formFields,
    formField
}: FormField | any) {



    return <div className="p-5 border gap-2">
        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">label</label>
        <div className="grid grid-cols-2">
            <div className="mt-2.5">
                <input type="text" value={formField.label} onChange={(e) => {
                    const { value } = e.currentTarget
                    const updatedFormFields = formFields.map((field: any) => field.id === formField.id ? { ...field, label: value } : field);
                    setFormFields(updatedFormFields)

                }} name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
                <select onChange={(e) => {
                    const { value } = e.currentTarget
                    const updatedFormFields = formFields.map((field: any) => field.id === formField.id ? { ...field, inputType: value } : field);
                    const formFieldCopy = updatedFormFields.find((field: any) => field.id === formField.id);
                    console.log(value, formFieldCopy)
                    if (['multiple_choice', 'checkboxes', 'drop_down'].includes(formFieldCopy.inputType)) {
                        let childs = formFieldCopy?.childs
                        console.log(childs)
                        if (!childs?.length || childs?.length < 1) {
                            formFieldCopy.childs = [
                                {
                                    id: uuidv4(),
                                    value: ''
                                }
                            ]
                            console.log(formFieldCopy)
                        }
                        updatedFormFields.map((field: any) => field.id === formField.id ? formFieldCopy : field)
                    }
                    setFormFields(updatedFormFields)
                }}>
                    <option value={"text"}>Short text</option>
                    <option value={'multiple_choice'}>Multiple choice</option>
                    <option value={"checkboxes"}>Checkboxes</option>
                    <option value={"drop_down"}>Drop-down</option>
                </select>
            </div>

        </div>
        <div className="grid grid-cols-2">
            {FormFieldInput(formField.inputType, formField, formFields, setFormFields)}

        </div>
    </div>
}

function FormFieldInput(inputType: InputType, formField: any, formFields: any, setFormFields: any) {
    switch (inputType) {
        case "text":
            return <input type="text"></input>
        case "multiple_choice":
            // return <input type="checkbox"></input>
            return <MultipleChoiceComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />
        case "checkboxes":
            return <CheckboxesComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />
        case "drop_down":
            return <SelectComponent formField={formField} formFields={formFields} setFormFields={setFormFields} />
        default:
            return <input type="text"></input>
    }
}

function MultipleChoiceComponent({
    formField,
    formFields,
    setFormFields
}: any) {
    return <>
        <div className="grid grid-cols-1">
            {formField?.childs?.map((child: any) => {
                return <div key={child.id} className="flex items-center justify-center gap-2">
                    <input type="radio" disabled></input>
                    <input value={child.value} type="text" onChange={(e) => {
                        const { value } = e.currentTarget
                        child.value = value
                        const updatedChilds = formField.childs.map((c: any) => c.id == child.id ? child : c)
                        formField.childs = updatedChilds
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }} />
                    {formField?.childs?.length > 1 ? <Button onClick={(e) => {
                        const childs = formField?.childs.filter((f: any) => f.id != child.id)
                        formField.childs = childs
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }}>x</Button> : <></>}
                </div>
            })}
            <button onClick={() => {
                const childs = formField?.childs

                formField.childs = [
                    ...childs,
                    {
                        id: uuidv4(),
                        value: ''
                    }
                ]

                setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))


            }}>Add</button>

        </div>
    </>



}





function CheckboxesComponent({
    formField,
    formFields,
    setFormFields
}: any) {
    return <>
        <div className="grid grid-cols-1">
            {formField?.childs?.map((child: any) => {
                return <div key={child.id} className="flex items-center justify-center gap-2">
                    <input type="checkbox" disabled></input>
                    <input value={child.value} type="text" onChange={(e) => {
                        const { value } = e.currentTarget
                        child.value = value
                        const updatedChilds = formField.childs.map((c: any) => c.id == child.id ? child : c)
                        formField.childs = updatedChilds
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }} />
                    {formField?.childs?.length > 1 ? <Button onClick={(e) => {
                        const childs = formField?.childs.filter((f: any) => f.id != child.id)
                        formField.childs = childs
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }}>x</Button> : <></>}
                </div>
            })}
            <button onClick={() => {
                const childs = formField?.childs

                formField.childs = [
                    ...childs,
                    {
                        id: uuidv4(),
                        value: ''
                    }
                ]

                setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))


            }}>Add</button>

        </div>
    </>



}


function SelectComponent({
    formField,
    formFields,
    setFormFields
}: any) {
    return <>
        <div className="grid grid-cols-1">
            {formField?.childs?.map((child: any, i: any) => {
                return <div key={child.id} className="flex items-center justify-center gap-2">
                    <p>{i + 1}</p>
                    <input value={child.value} type="text" onChange={(e) => {
                        const { value } = e.currentTarget
                        child.value = value
                        const updatedChilds = formField.childs.map((c: any) => c.id == child.id ? child : c)
                        formField.childs = updatedChilds
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }} />
                    {formField?.childs?.length > 1 ? <Button onClick={(e) => {
                        const childs = formField?.childs.filter((f: any) => f.id != child.id)
                        formField.childs = childs
                        setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))
                    }}>x</Button> : <></>}
                </div>
            })}
            <button onClick={() => {
                const childs = formField?.childs

                formField.childs = [
                    ...childs,
                    {
                        id: uuidv4(),
                        value: ''
                    }
                ]

                setFormFields(formFields.map((field: any) => field.id === formField.id ? formField : field))


            }}>Add</button>

        </div>
    </>



}