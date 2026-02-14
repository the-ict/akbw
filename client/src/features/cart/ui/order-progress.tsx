'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Truck, MapPin, Home, Package, Plane } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { monsterrat } from '@/shared/fonts';

interface OrderProgressProps {
  status: 'china' | 'uzbekistan' | 'delivering' | 'delivered';
  progress: number; // 0 to 100 representing total journey
}

export const OrderProgress = ({ status, progress }: OrderProgressProps) => {
  // Determine current active stage based on status or progress
  const getStageIndex = () => {
    if (status === 'china') return 0;
    if (status === 'uzbekistan') return 1;
    if (status === 'delivering') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  const checkpoints = [
    { id: 'china', label: 'Xitoy (Ombor)', icon: Package },
    { id: 'uzbekistan', label: "O'zbekiston (Bojxona)", icon: Plane },
    { id: 'delivering', label: 'Yetkazilmoqda (UzPost)', icon: Truck },
    { id: 'delivered', label: 'Yetkazildi', icon: Home },
  ];

  const activeStage = getStageIndex();

  return (
    <div className="w-full py-6">
      <div className="relative mb-12 mx-2">
        {/* Background Road Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-100 rounded-full" />

        {/* Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-black rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Moving Car */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-20"
          style={{ left: `${progress}%` }}
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-sm">
              {progress < 100 ? 'On the way' : 'Arrived'}
              <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rotate-45" />
            </div>

            {/* Car Icon */}
            <motion.div
              animate={{ y: [-0.5, 0.5, -0.5] }}
              transition={{ repeat: Infinity, duration: 0.2, ease: 'linear' }}
              className="bg-white p-1.5 rounded-full border border-gray-100 shadow-sm"
            >
              <Truck size={14} className="text-black" />
            </motion.div>
          </div>
        </motion.div>

        {/* Checkpoints */}
        <div className="flex justify-between relative z-10 w-full">
          {checkpoints.map((point, index) => {
            const Icon = point.icon;
            const isActive = index <= activeStage;
            const isCurrent = index === activeStage;

            return (
              <div
                key={point.id}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 bg-white',
                    isActive ? 'text-black ring-4 ring-white' : 'text-gray-200',
                  )}
                >
                  <Icon size={12} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <div
                  className={cn(
                    'absolute top-8 text-center w-24 transition-colors duration-500',
                    isActive ? 'text-black' : 'text-gray-300',
                  )}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider block">
                    {point.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="uppercase tracking-wide">Tracking Active</span>
        </div>
      </div>
    </div>
  );
};
