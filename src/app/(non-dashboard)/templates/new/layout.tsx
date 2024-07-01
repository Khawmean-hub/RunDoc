// /app/page.tsx
"use client"

import { DocumentTemplateContext, DocumentTemplateProvider } from "@/app/context/DocumentTemplateContext"
import { Button } from "@/components/ui/button"
import { documentTemplateService } from "@/services"
import { HomeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { Transition } from '@headlessui/react'
import { ArrowBigLeft } from "lucide-react"

const tabs = [
    { name: 'Form', href: '/templates/new', current: false },
    { name: 'Level', href: '/templates/new/level', current: false },
    { name: 'Setting', href: '/templates/new/setting', current: true },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
    return (
        <DocumentTemplateProvider>
            <Header />

            <main className="max-w-4xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
                {children}
            </main>
        </DocumentTemplateProvider>
    )
}

function Header() {
    const pathname = usePathname()
    const { templateTitle, setTemplateTitle, levels, formFields } = useContext(DocumentTemplateContext)
    const router = useRouter()

    return (
        <header className="relative border-b-2 p-5 flex flex-col md:flex-row justify-between items-center bg-gray-50 shadow-md rounded-lg mb-6">
            <div className="flex items-center space-x-4">
                <Link href={'/templates'}><Button variant={'ghost'}><ArrowBigLeft className="h-6 w-6 text-indigo-600" aria-hidden="true" /></Button></Link>
                <input
                    value={templateTitle}
                    onChange={(e) => setTemplateTitle(e.target.value)}
                    placeholder="Template Title"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <nav className="flex space-x-8 mt-4 md:mt-0" aria-label="Tabs">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                            tab.href === pathname
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={tab.href === pathname ? 'page' : undefined}
                    >
                        {tab.name}
                    </Link>
                ))}
            </nav>
            <div className="mt-4 md:mt-0">
                <Button
                    onClick={() => {
                        documentTemplateService.create({
                            levels: levels,
                            title: templateTitle,
                            form_data: { fieldsets: formFields }
                        }).then(() => {
                            router.push('/templates')
                        }).catch(err => {
                            console.error(err)
                            alert("Something went wrong")
                        })
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Save
                </Button>
            </div>
        </header>
    )
}
