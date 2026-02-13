"use client";

import React, { useState } from "react";
import { useCategories } from "@/features/categories/lib/hooks";
import { useCreateStyle } from "../lib/hooks";
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
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
    const { mutate: createStyle, isPending } = useCreateStyle();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!image || !categoryId) {
            toast.error("Iltimos barcha maydonlarni to'ldiring");
            return;
        }

        createStyle({
            image,
            categoryId: Number(categoryId)
        }, {
            onSuccess: () => {
                setImage("");
                setCategoryId("");
                onClose();
            }
        });
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className="sm:max-w-[425px] rounded-3xl !bg-white">
                <ModalClose />
                <ModalTitle className="text-xl font-bold">Yangi stil qo'shish</ModalTitle>
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
                        <label className="font-bold text-sm uppercase text-gray-400">Rasm URL</label>
                        <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="rounded-xl border-gray-100 h-12"
                        />
                    </div>

                    {image && (
                        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

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
