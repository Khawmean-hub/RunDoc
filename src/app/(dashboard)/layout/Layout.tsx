"use client"
import { useState, ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="md:pl-64">
                <div className='max-full mx-6 flex flex-col md:px-8 xl:px-0'>
                    <Header setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1">
                        <div className="py-2">
                            <div className="px-4 sm:px-6 md:px-0">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
