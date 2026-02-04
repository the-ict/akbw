import { cn } from '@/shared/lib/utils';
import { ChevronRight } from 'lucide-react';
import React from 'react'


interface Props {
    menuItems: any[];
    setProfileSubSection: (id: string) => void;
}


export default function MenuItems({ menuItems, setProfileSubSection }: Props) {
    return (
        <div className="space-y-3">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setProfileSubSection(item.id)}
                        className="w-full cursor-pointer flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
                    >
                        <div className={cn("p-3 rounded-lg bg-gradient-to-br text-white", item.color)}>
                            <Icon size={24} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                );
            })}
        </div>
    )
}
