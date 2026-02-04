import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import React from 'react'


interface Props {
    handleBackToMenu: () => void;
    chatMessage: string;
    setChatMessage: (chatMessage: string) => void;
    handleSendMessage: () => void;
    mockChatMessages: any[];
}


export default function SupportChat({ handleBackToMenu, chatMessage, setChatMessage, handleSendMessage, mockChatMessages }: Props) {
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
                <div className="space-y-3">
                    {mockChatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex",
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[70%] rounded-lg px-4 py-2",
                                    msg.sender === "user"
                                        ? "bg-black text-white"
                                        : "bg-white text-gray-900 border border-gray-200"
                                )}
                            >
                                <p className="text-sm">{msg.message}</p>
                                <p className={cn(
                                    "text-xs mt-1",
                                    msg.sender === "user" ? "text-gray-300" : "text-gray-500"
                                )}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 my-3">
                <Input
                    placeholder="Xabar yozing..."
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
