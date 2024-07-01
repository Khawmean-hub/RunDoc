/* This example requires Tailwind CSS v2.0+ */
"use client"
import { Button } from '@/components/ui/button'
import { documentTemplateService } from '@/services'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { ChevronRight, Filter, Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TemplateComponent from './components/TemplateComponent'
import TemplateTypeDialog from './components/TemplateTypeDialog'
import TemplateCreateDialog from './components/TemplateCreateDialog'
import TeamManagementDialog from './components/test2'



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function DocumentTemplates() {
  const [templates, setTemplates] = useState([])
  const router = useRouter()
  useEffect(() => {
    getTemplates()
  }, [])

  
  function getTemplates() {
    documentTemplateService.list().then(response => {
      setTemplates(response.data)
    }).catch(err => {
      alert('Something went wrong')
    })
  }
  return (
    <div>

      <div className='p-2 flex mb-2'>
        <h2 className="text-gray-800 text-xl font-medium uppercase tracking-wide">Templates</h2>
        <div className='ml-auto'></div>
        <Button className='gap-1 text-gray-700 text-sm' variant={'link'} size={'sm'}><Filter className='h-4 w-4' /> Sort</Button>
        <TemplateTypeDialog/>
      </div>
      <div className='fixed bottom-16 right-16'>
        <TemplateCreateDialog/>
        {/* <TeamManagementDialog/> */}
        {/* <Button variant="default" size="icon" className='rounded-full h-12 w-12' onClick={() => {
          router.push('/templates/new')
        }}>
          <Plus />
        </Button> */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {templates.map(((template: any) => {
          return <TemplateComponent template={template} />
        }))}
      </div>
    </div>
  )
}

