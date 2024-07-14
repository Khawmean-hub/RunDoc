"use client"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { BellIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/app/context/AuthProvider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { notificationService } from '@/services'
import useNotification from '@/app/hooks/useNotification'
import toast, { Toaster } from 'react-hot-toast'
import { GiOrganigram } from "react-icons/gi"
import { useRouter } from 'next/navigation'

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
    const { user, logout } = useAuth()
    const [notifications, setNotifications] = useState([])
    const router = useRouter()
    useNotification()

    useEffect(() => {
        getNotifications()
    }, [])

    function getNotifications() {
        notificationService.getLatest().then(response => {
            setNotifications(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Toaster />
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center">
                <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex-1 flex">
                        <form className="w-full flex md:ml-0" action="#" method="GET">
                            <label htmlFor="search-field" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <input
                                    id="search-field"
                                    className="block w-full h-full pl-10 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                    placeholder="Search"
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="ml-4 flex items-center space-x-4">
                        <button
                            onClick={() => router.push("/organization")}
                            type="button"
                            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="sr-only">View organization</span>
                            <GiOrganigram className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    onClick={getNotifications}
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                                    <ul className="space-y-3">
                                        {notifications.map((notification: any) => (
                                            <li key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${notification.sender?.username}&background=random`}
                                                    alt="User avatar"
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 mr-3"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{notification.sender?.username}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Menu as="div" className="relative">
                            <MenuButton className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={`https://ui-avatars.com/api/?background=random&color=fff&name=${user?.email}`}
                                    alt=""
                                />
                            </MenuButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            {({ active }) => (
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            )}
                                        </MenuItem>
                                    ))}
                                    <MenuItem>
                                        {({ active }) => (
                                            <button 
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                                )}
                                                onClick={logout}
                                            >
                                                Sign Out
                                            </button>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}