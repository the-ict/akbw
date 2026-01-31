import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalTrigger
} from "@/shared/ui/modal";
import {
    cn
} from "@/shared/lib/utils";
import React from "react";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
    lastName: z.string().min(2, "Familiya kamida 2 ta harfdan iborat bo'lishi kerak"),
    gender: z.string().min(2, "Jins kamida 2 ta harfdan iborat bo'lishi kerak"),
    phone: z.string().min(12, "Telefon raqami noto'g'ri").regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Telefon raqami noto'g'ri"),
});


function Register() {
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender, setGender] = React.useState("male");
    const [phone, setPhone] = React.useState("+998");
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const formatPhone = (value: string) => {
        let cleaned = value.replace(/[^\d+]/g, "");
        if (!cleaned.startsWith("+998")) {
            cleaned = "+998" + cleaned.replace("+", "").replace("998", "");
        }

        let formatted = "+998";
        let digits = cleaned.slice(4).replace(/\D/g, "");

        if (digits.length > 0) formatted += " " + digits.slice(0, 2);
        if (digits.length > 2) formatted += " " + digits.slice(2, 5);
        if (digits.length > 5) formatted += " " + digits.slice(5, 7);
        if (digits.length > 7) formatted += " " + digits.slice(7, 9);

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        if (formatted.length <= 19) {
            setPhone(formatted);
        }
    };

    const handleSubmit = () => {
        const result = registerSchema.safeParse({ name, lastName, gender, phone });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue: z.ZodIssue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log("Success:", result.data);
    };

    return (
        <Modal>
            <ModalTrigger asChild>
                <Button variant={"outline"} className="btn-sign-in-padding text-sm font-bold">
                    Ro'yhatdan o'tish
                </Button>
            </ModalTrigger>
            <ModalContent>
                <h1 className="font-display text-2xl md:text-3xl font-bold w-full text-center">AKBW</h1>
                <ModalTitle className="text-center">
                    Ro'yhatdan o'tish
                </ModalTitle>

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
                    <select
                        name="gender"
                        id="gender"
                        className={cn(
                            "w-full p-2 rounded-lg border border-black/10 bg-white appearance-none text-sm outline-none",
                            errors.gender ? "border-red-500" : ""
                        )}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Erkak</option>
                        <option value="female">Ayol</option>
                    </select>
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

                <Button onClick={handleSubmit} className="mt-5 w-full">
                    Ro'yhatdan o'tish
                </Button>
            </ModalContent>
        </Modal>
    )
}

export default Register;