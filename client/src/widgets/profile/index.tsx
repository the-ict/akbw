'use client';

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
import { cn } from "@/shared/lib/utils";
import {
    X,
    User,
    Heart,
    Bell,
    MessageSquare,
    MapPin,
    ChevronDown,
    Camera,
    Star,
    ExternalLink,
    Menu as MenuIcon,
    ArrowLeft,
    Send,
    Image as ImageIcon,
    Settings,
    Headphones,
    HelpCircle,
    ChevronRight,
    LogOut
} from "lucide-react";
import React from "react";
import * as z from "zod";

const profileSchema = z.object({
    name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
    lastName: z.string().min(2, "Familiya kamida 2 ta harfdan iborat bo'lishi kerak"),
    gender: z.string().min(2, "Jins kamida 2 ta harfdan iborat bo'lishi kerak"),
    phone: z.string().min(12, "Telefon raqami noto'g'ri").regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Telefon raqami noto'g'ri"),
    location: z.string().optional(),
});

type TabType = "menu" | "favorites" | "notifications" | "reviews";
type SubSectionType = "editProfile" | "supportChat" | "productInquiry" | null;

// Mock data for demonstration
const mockFavorites = [
    { id: 1, name: "Classic White T-Shirt", price: "150,000", image: "/placeholder.jpg" },
    { id: 2, name: "Denim Jacket", price: "450,000", image: "/placeholder.jpg" },
];

const mockNotifications = [
    { id: 1, title: "Yangi chegirma!", message: "Barcha mahsulotlarga 20% chegirma", date: "2026-02-01", read: false },
    { id: 2, title: "Buyurtmangiz yetkazildi", message: "Buyurtma #12345 muvaffaqiyatli yetkazildi", date: "2026-01-30", read: true },
];

const mockReviews = [
    { id: 1, productName: "Classic White T-Shirt", rating: 5, comment: "Juda yaxshi mahsulot!", date: "2026-01-25", productId: "123" },
    { id: 2, productName: "Denim Jacket", rating: 4, comment: "Yaxshi, lekin rangi biroz boshqacha edi", date: "2026-01-20", productId: "456" },
];

const mockChatMessages = [
    { id: 1, sender: "admin", message: "Salom! Sizga qanday yordam bera olaman?", time: "10:30" },
    { id: 2, sender: "user", message: "Buyurtmam qachon yetib keladi?", time: "10:32" },
];

interface ProfileProps {
    children?: React.ReactNode;
}

function Profile({ children }: ProfileProps) {
    const [activeTab, setActiveTab] = React.useState<TabType>("menu");
    const [activeSubSection, setActiveSubSection] = React.useState<SubSectionType>(null);
    const [name, setName] = React.useState("Abdullox");
    const [lastName, setLastName] = React.useState("Akbarov");
    const [gender, setGender] = React.useState("male");
    const [phone, setPhone] = React.useState("+998 90 123 45 67");
    const [location, setLocation] = React.useState("");
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [profileImage, setProfileImage] = React.useState<string>("");
    const [chatMessage, setChatMessage] = React.useState("");
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

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

    const handleSaveProfile = () => {
        const result = profileSchema.safeParse({ name, lastName, gender, phone, location });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue: z.ZodIssue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log("Profile saved:", result.data);
    };

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            console.log("Sending message:", chatMessage);
            setChatMessage("");
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleBackToMenu = () => {
        setActiveSubSection(null);
    };

    const tabs = [
        { id: "menu" as TabType, label: "Menyu", icon: MenuIcon },
        { id: "favorites" as TabType, label: "Sevimlilar", icon: Heart },
        { id: "notifications" as TabType, label: "Bildirishnomalar", icon: Bell },
        { id: "reviews" as TabType, label: "Sharhlar", icon: MessageSquare },
    ];

    const menuItems = [
        {
            id: "editProfile" as SubSectionType,
            title: "Profilni tahrirlash",
            description: "Shaxsiy ma'lumotlarni o'zgartirish",
            icon: Settings,
            color: "from-slate-600 to-slate-700"
        },
        {
            id: "supportChat" as SubSectionType,
            title: "Yordam",
            description: "Admin bilan bog'lanish",
            icon: Headphones,
            color: "from-teal-600 to-teal-700"
        },
        {
            id: "productInquiry" as SubSectionType,
            title: "Mahsulot so'rash",
            description: "Mahsulot haqida so'rov yuborish",
            icon: HelpCircle,
            color: "from-indigo-600 to-indigo-700"
        },
    ];

    const renderProfileHeader = () => (
        <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/5">
            <div className="relative mt-2">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-[3px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center">
                                <User size={48} className="text-white/90" />
                            </div>
                        )}
                    </div>
                </div>
                {
                    activeTab === "menu" && activeSubSection === "editProfile" && (
                        <button className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full hover:bg-black/80 transition-all shadow-md hover:shadow-lg">
                            <Camera size={12} />
                        </button>
                    )
                }
            </div>
            <div className="text-center">
                <h3 className="font-bold text-lg tracking-tight">{name} {lastName}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{gender === "male" ? "Erkak" : "Ayol"}</p>
            </div>
        </div>
    );

    const renderMenuItems = () => (
        <div className="space-y-3">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveSubSection(item.id)}
                        className="w-full cursor-pointer flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
                    >
                        <div className={cn("p-3 rounded-lg bg-gradient-to-br text-white", item.color)}>
                            <Icon size={24} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                );
            })}
        </div>
    );

    const renderEditProfile = () => (
        <div className="space-y-4">
            <button
                onClick={handleBackToMenu}
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
    );

    const renderSupportChat = () => (
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
    );

    const renderProductInquiry = () => (
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
    );

    const renderMenuContent = () => {
        if (activeSubSection === "editProfile") return renderEditProfile();
        if (activeSubSection === "supportChat") return renderSupportChat();
        if (activeSubSection === "productInquiry") return renderProductInquiry();
        return renderMenuItems();
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "menu":
                return renderMenuContent();

            case "favorites":
                return (
                    <div className="space-y-3">
                        {mockFavorites.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <Heart size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Sevimli mahsulotlar yo'q</p>
                            </div>
                        ) : (
                            mockFavorites.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                        <span className="text-xs text-gray-400">Rasm</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{item.name}</h4>
                                        <p className="text-sm font-bold">{item.price} UZS</p>
                                    </div>
                                    <Button size="sm" className="text-xs">
                                        Ko'rish
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                );

            case "notifications":
                return (
                    <div className="space-y-3">
                        {mockNotifications.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <Bell size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Bildirishnomalar yo'q</p>
                            </div>
                        ) : (
                            mockNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 rounded-lg border transition-all",
                                        notification.read
                                            ? "bg-white border-gray-200"
                                            : "bg-blue-50 border-blue-200"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">{notification.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                            <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case "reviews":
                return (
                    <div className="space-y-3">
                        {mockReviews.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <MessageSquare size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Sharhlar yo'q</p>
                            </div>
                        ) : (
                            mockReviews.map((review) => (
                                <div key={review.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="font-medium text-sm">{review.productName}</h4>
                                        <button className="text-gray-400 hover:text-black transition-colors">
                                            <ExternalLink size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={cn(
                                                    i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                    <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                                </div>
                            ))
                        )}
                    </div>
                );
        }
    };

    return (
        <Modal>
            <ModalTrigger asChild>
                {children || <User size={24} className="cursor-pointer" />}
            </ModalTrigger>
            <ModalContent className="max-w-xl max-h-[90vh] overflow-hidden flex flex-col bg-white">
                <ModalClose className="absolute right-4 top-4 z-10">
                    <X className="h-5 w-5" />
                </ModalClose>

                {/* Only show profile header when NOT in a sub-section */}
                {(activeTab === "menu" || activeSubSection === "editProfile" || activeTab === "reviews" || activeTab === "notifications" || activeTab === "favorites") && renderProfileHeader()}

                {/* Only show navigation tabs when NOT in a sub-section */}
                {!(activeTab === "menu" && activeSubSection) && (
                    <div className="flex items-center justify-between gap-2 no-scrollbar border border-gray-300 p-2 rounded-2xl">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setActiveSubSection(null);
                                    }}
                                    className={cn(
                                        "flex items-center justify-center py-2 px-3 gap-2 cursor-pointer rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-black text-white shadow-md"
                                            : "bg-white text-gray-700"
                                    )}
                                >
                                    <div className="flex items-center flex-col gap-1">
                                        <Icon size={16} />
                                        {tab.label}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className={cn(
                    "flex-1 overflow-y-auto px-1",
                    activeTab === "menu" && activeSubSection ? "mt-6" : "mt-5"
                )}>
                    {renderTabContent()}

                    {/* Only show logout button when NOT in a sub-section */}
                    {!(activeTab === "menu" && activeSubSection) && (
                        <Button onClick={() => console.log("Logout")} className="w-full mt-6 h-11 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                            <LogOut size={18} className="mr-2" />
                            Chiqish
                        </Button>
                    )}
                </div>

                {/* Only show footer when NOT in a sub-section */}
                {!(activeTab === "menu" && activeSubSection) && (
                    <ModalDescription className="text-gray-400 mt-5 mb-2 text-[10px] text-center leading-tight">
                        Ma'lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi
                    </ModalDescription>
                )}
            </ModalContent>
        </Modal>
    );
}

export default Profile;