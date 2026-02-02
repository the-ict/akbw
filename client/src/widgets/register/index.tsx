import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
    Modal,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalTitle,
    ModalTrigger
} from "@/shared/ui/modal";
import {
    cn
} from "@/shared/lib/utils";
import {
    ChevronDown,
    X,
} from "lucide-react";
import React from "react";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
    lastName: z.string().min(2, "Familiya kamida 2 ta harfdan iborat bo'lishi kerak"),
    gender: z.string().min(2, "Jins kamida 2 ta harfdan iborat bo'lishi kerak"),
    phone: z.string().min(12, "Telefon raqami noto'g'ri").regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Telefon raqami noto'g'ri"),
});


type Steps = "register" | "verify"

function Register() {
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender, setGender] = React.useState("male");
    const [phone, setPhone] = React.useState("+998");
    const [otp, setOtp] = React.useState("");
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [steps, setSteps] = React.useState<Steps>("register");
    const [timeLeft, setTimeLeft] = React.useState(60);

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (steps === "verify" && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [steps, timeLeft]);

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

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    const handleRegister = () => {
        const result = registerSchema.safeParse({ name, lastName, gender, phone });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue: z.ZodIssue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        setSteps("verify");
        setTimeLeft(60);
        setErrors({});
        console.log("Success:", result.data);
    };

    const handleVerify = () => {
        if (otp.length < 6) {
            setErrors({ otp: "Kod 6 ta raqamdan iborat bo'lishi kerak" });
            return;
        }
        setErrors({});
        console.log("Verifying with OTP:", otp);
    };

    const handleResendCode = () => {
        setTimeLeft(60);
        setOtp("");
        console.log("Resending code to:", phone);
    };


    const renderRegisterSteps = () => {
        switch (steps) {
            case "register":
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

            case "verify":
                return (
                    <>
                        <div className="flex flex-col gap-1 mt-5">
                            <Input
                                placeholder="000000"
                                value={otp}
                                onChange={handleOtpChange}
                                className={cn(
                                    "text-center tracking-[1em] font-bold text-xl h-12",
                                    errors.otp ? "border-red-500" : "placeholder:opacity-30 placeholder:tracking-normal"
                                )}
                                maxLength={6}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-gray-500">
                                    {phone} raqamiga yuborilgan 6 xonali kodni kiriting
                                </p>
                                {timeLeft > 0 ? (
                                    <p className="text-xs font-medium text-black">
                                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendCode}
                                        className="text-xs font-bold text-black underline hover:opacity-70 transition-opacity"
                                    >
                                        Qayta kod yuborish
                                    </button>
                                )}
                            </div>
                            {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
                        </div>

                        <Button onClick={handleVerify} className="mt-8 w-full">
                            Tasdiqlash
                        </Button>

                        <Button
                            onClick={() => {
                                setSteps("register");
                                setTimeLeft(60);
                            }}
                            className="bg-[#fff]/50 mt-3 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl text-sm font-bold w-full"
                        >
                            Malumotlarni tahrirlash
                        </Button>
                    </>
                )
        }
    }

    return (
        <Modal>
            <ModalTrigger asChild>
                <Button variant={"outline"} className="bg-[#fff]/50 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20 shadow-xl text-sm font-bold">
                    Ro'yhatdan o'tish
                </Button>
            </ModalTrigger>
            <ModalContent>
                <ModalClose>
                    <X />
                </ModalClose>

                <h1 className="font-display text-2xl md:text-3xl font-bold w-full text-center">AKBW</h1>
                <ModalTitle className="text-center">
                    {steps === "register" ? "Ro'yhatdan o'tish" : "Tasdiqlash kodi"}
                </ModalTitle>

                {renderRegisterSteps()}

                <ModalDescription className="text-gray-500 mt-3 text-[11px] text-center">
                    Davom etgan holda men <a href="/terms" className="text-gray-600 underline font-bold">AKBW malumotlarni qayta ishlash siyosatiga rozilik bildiraman!</a>
                </ModalDescription>

            </ModalContent>
        </Modal>
    )
}

export default Register;