import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input'
import { ChevronDown } from 'lucide-react';
import React from 'react'


interface Props {
    name: string;
    lastName: string;
    gender: string;
    phone: string;
    errors: Record<string, string>;
    handleRegister: () => void;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setName: (name: string) => void;
    setLastName: (lastName: string) => void;
    setGender: (gender: string) => void;
}


export default function RegisterStep({ name,
    lastName,
    gender,
    phone,
    errors,
    handleRegister,
    handlePhoneChange,
    setName,
    setLastName,
    setGender,
}: Props) {
    return (
        <>
            <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm font-medium">Ism</label>
                <Input
                    placeholder="Abdullox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "border-red-500" : "placeholder:opacity-50"}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm font-medium">Familiya</label>
                <Input
                    placeholder="Akbarov"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={errors.lastName ? "border-red-500" : "placeholder:opacity-50"}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>

            <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm font-medium">Jins</label>
                <div className="relative">
                    <select
                        name="gender"
                        id="gender"
                        className={cn(
                            "flex h-10 w-full rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 bg-white shadow-lg border-none outline-none",
                            errors.gender ? "border-1 border-red-500" : ""
                        )}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Erkak</option>
                        <option value="female">Ayol</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
                {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
            </div>

            <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm font-medium">Telefon raqami</label>
                <Input
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={errors.phone ? "border-red-500" : "placeholder:opacity-50"}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <Button onClick={handleRegister} className="mt-5 w-full">
                Kod yuborish
            </Button>
        </>
    )
}
