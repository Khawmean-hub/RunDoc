// /app/page.tsx
"use client"

import '../globals.css'
import { usePathname } from 'next/navigation';


export default function Home({ children }: { children: React.ReactNode }) {

  

  return (
    
    {children}
  )
}
