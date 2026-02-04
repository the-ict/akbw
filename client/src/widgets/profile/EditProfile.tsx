import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ArrowLeft, ChevronDown, MapPin } from 'lucide-react';
import React from 'react'

interface Props {
    handleBackMenu: () => void;
    name: string;
    lastName: string;
    gender: string;
    phone: string;
    location: string;
    errors: Record<string, string>;
    setName: (name: string) => void;
    setLastName: (lastName: string) => void;
    setGender: (gender: string) => void;
    setPhone: (phone: string) => void;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveProfile: () => void;
    setLocation: (location: string) => void;
}

export default function EditProfile({ handleBackMenu, handleSaveProfile, handlePhoneChange, name, lastName, gender, phone, location, errors, setName, setLastName, setGender, setLocation }: Props) {
    return (
        <div className="space-y-4">
            <button
                onClick={handleBackMenu}
                className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition-colors mb-4"
            >
                <ArrowLeft size={20} />
                <span className="font-medium">Menyuga qaytish</span>
            </button>

            <div className="space-y-3.5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Ism</label>
                    <Input
                        placeholder="Abdullox Akbarov"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                            "h-11 shadow-sm border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all",
                            errors.name ? "border-red-500" : "placeholder:opacity-40"
                        )}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Familiya</label>
                    <Input
                        placeholder="Abdullox Akbarov"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={cn(
                            "h-11 shadow-sm border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all",
                            errors.lastName ? "border-red-500" : "placeholder:opacity-40"
                        )}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Jins</label>
                    <div className="relative">
                        <select
                            name="gender"
                            id="gender"
                            className={cn(
                                "flex h-11 w-full rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 bg-white shadow-sm border border-gray-200 transition-all",
                                errors.gender ? "border-red-500" : ""
                            )}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Erkak</option>
                            <option value="female">Ayol</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Telefon raqami</label>
                    <Input
                        placeholder="+998 (000) 245-6780"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={cn(
                            "h-11 shadow-sm border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all",
                            errors.phone ? "border-red-500" : "placeholder:opacity-40"
                        )}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                        <MapPin size={14} />
                        Yetkazib berish manzili
                    </label>
                    <Input
                        placeholder="Abdullox Address, add joyiashuv"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-11 shadow-sm border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:opacity-40"
                    />
                    <p className="text-[10px] text-gray-500 leading-tight">Bu manzil buyurtma berishda avtomatik tanlanadi</p>
                </div>

                <Button onClick={handleSaveProfile} className="w-full mt-6 h-11 bg-black hover:bg-black/90 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                    Saqlash
                </Button>
            </div>
        </div>
    )
}
