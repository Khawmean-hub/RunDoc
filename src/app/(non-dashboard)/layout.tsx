// /app/page.tsx
"use client"
import '../globals.css'
import { usePathname } from 'next/navigation';

const routeTitles: any = {
  '/': 'Dashboard',
  '/templates': 'Template Manager',
  '/documents': 'Documents',
  '/users': 'Users',
};


export default function Home({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {


  const pathname = usePathname()

  return (
    <>
      {children}
    </>
  )
}
