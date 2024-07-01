// hooks/useNotification.js
import { useEffect } from 'react';
import { messaging } from '../lib/firebase/config';
import { getToken, onMessage } from 'firebase/messaging';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { fcmTokenService } from '@/services';
import toast from 'react-hot-toast';
const useNotification = () => {
    useEffect(() => {
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BFm3Ou3jgtcE4OiE67J_FGkbpJ5OaFRmefbfBu4ojagDat7RSCK1QxVu2McHmD6LywVLPHMn7_A-sEV6rXL4mT0' });
                console.log('FCM Token:', token);
                const fp = await FingerprintJS.load();
                const { visitorId } = await fp.get();
                console.log("Hash:", visitorId)
                await fcmTokenService.subscribe({
                    device_id: visitorId,
                    token
                })
                // Send this token to your backend for subscription
            } catch (error) {
                console.error('Permission denied', error);
            }
        };

        requestPermission()

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            // Handle the message as needed
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                         {payload?.data?.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {payload?.data?.body}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))
        });
    }, []);
};

export default useNotification;
