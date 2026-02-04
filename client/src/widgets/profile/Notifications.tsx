import {
    cn
} from '@/shared/lib/utils'
import {
    Bell
} from 'lucide-react'
import React from 'react'

export default function Notifications() {
    return (
        <div className="space-y-3">
            {[].length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <Bell size={48} className="mx-auto mb-3 opacity-20" />
                    <p>Bildirishnomalar yo'q</p>
                </div>
            ) : (
                [{ id: 1, title: "", message: "", date: "", read: false }].map((notification) => (
                    <div
                        key={notification.id}
                        className={cn(
                            "p-4 rounded-lg border transition-all",
                            notification.read
                                ? "bg-white border-gray-200"
                                : "bg-blue-50 border-blue-200"
                        )}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                            </div>
                            {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
