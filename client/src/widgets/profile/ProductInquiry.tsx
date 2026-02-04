import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ArrowLeft, HelpCircle, Image as ImageIcon, Send, X } from 'lucide-react';
import React from 'react'

interface Props {
    handleBackToMenu: () => void;
    chatMessage: string;
    setChatMessage: (chatMessage: string) => void;
    handleSendMessage: () => void;
    selectedImage: File | null;
    handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedImage: (selectedImage: File | null) => void;
}

export default function ProductInquiry({ handleBackToMenu, chatMessage, setChatMessage, handleSendMessage, selectedImage, handleImageSelect, setSelectedImage }: Props) {
    return (
        <div className="flex flex-col h-full">
            <button
                onClick={handleBackToMenu}
                className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition-colors mb-4"
            >
                <ArrowLeft size={20} />
                <span className="font-medium">Menyuga qaytish</span>
            </button>

            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto min-h-[500px]">
                <div className="text-center text-gray-500 py-8">
                    <HelpCircle size={48} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Mahsulot haqida savol bering</p>
                    <p className="text-xs mt-1">Rasm yuklang va xabar yozing</p>
                </div>
            </div>

            {selectedImage && (
                <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                    <ImageIcon size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-600 flex-1">{selectedImage.name}</span>
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="flex gap-2 my-3">
                <label className="h-11 px-4 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <ImageIcon size={18} className="text-gray-600" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </label>
                <Input
                    placeholder="Sizda bunday mahsulot bormi?"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 h-11 shadow-sm border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <Button
                    onClick={handleSendMessage}
                    className="h-11 px-4 bg-black hover:bg-black/90 text-white"
                >
                    <Send size={18} />
                </Button>
            </div>
        </div>
    )
}
