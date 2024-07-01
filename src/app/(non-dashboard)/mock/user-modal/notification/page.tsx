"use client"
import { Popover } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline';


const notifications = [
    {
      id: 1,
      message: 'Notification 1',
      detail: 'This is the detail of the notification.',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', // Example avatar URL
    },
    {
      id: 2,
      message: 'Notification 2',
      detail: 'This is the detail of the notification.',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', // Example avatar URL
    },
    {
      id: 3,
      message: 'Notification 3',
      detail: 'This is the detail of the notification.',
      avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg', // Example avatar URL
    },
  ]

  
export default function NotificationTab() {
    return (
        <div className="fixed top-4 right-4">
        <Popover className="relative">
          <Popover.Button className="flex items-center p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none">
            <BellIcon className="w-6 h-6 text-gray-700" />
          </Popover.Button>
  
          <Popover.Panel className="absolute right-0 z-10 mt-2 w-72 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <ul className="mt-4 space-y-2">
                {notifications.map(notification => (
                  <li key={notification.id} className="flex items-start p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    {/* User Avatar in Notification */}
                    <img 
                      src={notification.avatarUrl} 
                      alt="User avatar" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-600">{notification.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    )
}