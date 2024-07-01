// /app/page.tsx
"use client"
import Layout from './layout/Layout'
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function Home({ children }: { children: React.ReactNode }) {

  const { user } = useAuth();

  return (
    <>
     <Toaster/>
      {user ? (
        <Layout>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-4">
              {children}
            </div>
          </div>
        </Layout>
      ) : null}
    </>
  )
}
