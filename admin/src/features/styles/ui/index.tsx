"use client";

import React, { useState } from "react";
import { useStyles, useDeleteStyle } from "../lib/hooks";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import AddStyleModal from "./AddStyleModal";
import { IStyle } from "@/shared/config/api/style/style.model";

export default function Styles() {
    const { data: stylesData, isLoading } = useStyles();
    const { mutate: deleteStyle } = useDeleteStyle();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm("Ushbu stilni o'chirmoqchimisiz?")) {
            deleteStyle(id);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Stillar boshqaruvi</h1>
                    <p className="text-gray-500">Bosh sahifadagi "Stillar" bo'limini boshqarish</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-black text-white hover:bg-black/90">
                    <Plus size={18} />
                    Yangi stil qo'shish
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[250px] bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stylesData?.data.map((style: IStyle) => (
                        <div key={style.id} className="relative group overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-lg">
                            <div className="aspect-[16/9] w-full overflow-hidden">
                                <img
                                    src={style.image}
                                    alt={style.category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4 bg-white">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg uppercase">{style.category.name}</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(style.id)}
                                        className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {stylesData?.data.length === 0 && (
                        <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500">
                            <ImageIcon size={48} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium">Hozircha stillar mavjud emas</p>
                            <p className="text-sm">Boshlash uchun yangi stil qo'shing</p>
                        </div>
                    )}
                </div>
            )}

            <AddStyleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
