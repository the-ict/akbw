import { cn } from '@/shared/lib/utils';
import { Bell, Clock, Info, Calendar, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNotifications } from './lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { INotification } from '@/shared/config/api/notifications/notifications.model';

export default function Notifications() {
  const { data: notifications, isLoading } = useNotifications();
  const [selectedNotification, setSelectedNotification] =
    useState<INotification | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 w-full bg-gray-100 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {notifications?.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
            <Bell size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Bildirishnomalar topilmadi
          </h3>
          <p className="text-sm text-gray-500 max-w-[200px]">
            Hozircha sizda hech qanday yangi bildirishnomalar mavjud emas.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {notifications?.data?.map((notification) => (
            <div
              key={notification.id}
              className={
                'group relative cursor-pointer p-5 rounded-[24px] border-2 border-gray-300 shadow-sm bg-white transition-all duration-300'
              }
              onClick={() => setSelectedNotification(notification as any)}
            >
              <div className="flex gap-4 cursor-pointer">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Info size={18} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-black text-sm uppercase tracking-tight truncate group-hover:text-black transition-colors">
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                      <Clock size={10} />
                      {new Date(notification.createdAt).toLocaleDateString(
                        'uz-UZ',
                        { day: '2-digit', month: 'short' },
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex items-center gap-2 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-300">
                      <Calendar size={10} />
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                      <ChevronRight size={14} className="text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedNotification && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotification(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] h-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-lg bg-white rounded-[40px] shadow-2xl z-[10000] overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-gray-50 rounded-3xl">
                    <Bell size={24} className="text-black" />
                  </div>
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="p-2 hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest">
                        <Clock size={10} />
                        Bildirishnoma
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {new Date(
                          selectedNotification.createdAt,
                        ).toLocaleDateString('uz-UZ', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">
                      {selectedNotification.title}
                    </h2>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-[32px]">
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {selectedNotification.message}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="w-full h-14 bg-black text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-black/90 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      Yopish
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
