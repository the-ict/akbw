import { Button } from '@/shared/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'

export default function FavoriteTab() {
    return (
        <div className="space-y-3">
            {[].length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <Heart size={48} className="mx-auto mb-3 opacity-20" />
                    <p>Sevimli mahsulotlar yo'q</p>
                </div>
            ) : (
                [{ id: 1, name: "", price: "" }].map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gray-400">Rasm</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm font-bold">{item.price} UZS</p>
                        </div>
                        <Button size="sm" className="text-xs">
                            Ko'rish
                        </Button>
                    </div>
                ))
            )}
        </div>
    )
}
