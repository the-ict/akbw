"use client";

import React, { useState } from "react";
import { useCategories } from "@/features/categories/lib/hooks";
import { useCreateStyle } from "../lib/hooks";
import { Image as ImageIcon } from "lucide-react";
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalClose,
} from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddStyleModal({ isOpen, onClose }: Props) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
    const { mutate: createStyle, isPending } = useCreateStyle();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile || !categoryId) {
            toast.error("Iltimos barcha maydonlarni to'ldiring");
            return;
        };

        createStyle({
            image: imageFile,
            categoryId: Number(categoryId)
        }, {
            onSuccess: () => {
                setImageFile(null);
                setPreviewUrl("");
                setCategoryId("");
                onClose();
            }
        });
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className="sm:max-w-[425px] rounded-3xl !bg-white">
                <ModalClose />
                <ModalTitle className="text-xl font-bold cursor-pointer">Yangi fasl qo'shish</ModalTitle>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label className="font-bold text-sm uppercase text-gray-400">Kategoriya</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full rounded-xl border-gray-100 h-12 px-4 border focus:outline-none focus:ring-2 focus:ring-black/5"
                        >
                            <option value="">Kategoriyani tanlang</option>
                            {categoriesData?.map((cat: any) => (
                                <option key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="font-bold text-sm uppercase text-gray-400">Rasm yuklash</label>
                        <div
                            onClick={() => document.getElementById('style-image-upload')?.click()}
                            className="w-full h-32 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group"
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <>
                                    <ImageIcon size={24} className="text-gray-300 group-hover:text-black transition-colors" />
                                    <span className="text-xs text-gray-400 mt-2">Rasm tanlash uchun bosing</span>
                                </>
                            )}
                            <input
                                id="style-image-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                            Bekor qilish
                        </Button>
                        <Button type="submit" disabled={isPending} className="bg-black text-white hover:bg-black/90 rounded-xl px-8">
                            {isPending ? "Qo'shilmoqda..." : "Qo'shish"}
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}
