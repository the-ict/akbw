import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <div className="w-full flex items-center justify-center">
            <Loader2 size={20} className='animate-spin' />
        </div>
    )
}
