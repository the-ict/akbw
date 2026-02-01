import React from 'react';
import {
    Shield,
    Lock,
    Users,
    FileText,
    Mail,
    Phone,
    MapPin,
    Cookie,
    UserCheck,
    RefreshCw
} from 'lucide-react';

export default function Privacy() {
    const sections = [
        {
            id: 1,
            icon: FileText,
            title: "1. Qaysi ma'lumotlarni yig'amiz",
            content: "Biz quyidagi ma'lumotlarni yig'ishimiz mumkin:",
            list: [
                "Ism va familiya",
                "Telefon raqami",
                "Elektron pochta (email)",
                "Yetkazib berish manzili",
                "Buyurtmalar tarixi",
                "To'lovga oid texnik ma'lumotlar (karta raqami saqlanmaydi)"
            ]
        },
        {
            id: 2,
            icon: Users,
            title: "2. Ma'lumotlardan qanday foydalanamiz",
            content: "Yig'ilgan ma'lumotlar quyidagi maqsadlarda ishlatiladi:",
            list: [
                "Buyurtmalarni qabul qilish va yetkazib berish",
                "Foydalanuvchi bilan bog'lanish",
                "To'lovlarni amalga oshirish",
                "Xizmat sifatini yaxshilash",
                "Qonunchilik talablarini bajarish"
            ]
        },
        {
            id: 3,
            icon: Lock,
            title: "3. To'lov ma'lumotlari",
            content: "To'lovlar uchinchi tomon to'lov tizimlari (Click, Payme, Uzcard, Humo va boshqalar) orqali amalga oshiriladi.",
            note: "Platforma bank karta ma'lumotlarini saqlamaydi va ko'rmaydi."
        },
        {
            id: 4,
            icon: UserCheck,
            title: "4. Ma'lumotlarni uchinchi shaxslarga berish",
            content: "Biz foydalanuvchi ma'lumotlarini:",
            list: [
                "sotmaymiz",
                "ijaraga bermaymiz",
                "ruxsatsiz tarqatmaymiz"
            ],
            note: "Faqat quyidagi hollarda berilishi mumkin:",
            subList: [
                "qonun talabi bilan (sud yoki davlat organlari)",
                "yetkazib berish xizmati (faqat manzil va aloqa uchun)"
            ]
        },
        {
            id: 5,
            icon: Shield,
            title: "5. Ma'lumotlar xavfsizligi",
            content: "Platforma foydalanuvchi ma'lumotlarini himoyalash uchun:",
            list: [
                "zamonaviy texnik vositalar",
                "xavfsiz serverlar",
                "parollarni shifrlash (hash)"
            ],
            note: "usullaridan foydalanadi."
        },
        {
            id: 6,
            icon: Cookie,
            title: "6. Cookies (fayllar)",
            content: "Platforma foydalanuvchi tajribasini yaxshilash uchun cookies dan foydalanishi mumkin.",
            note: "Foydalanuvchi xohlasa brauzer sozlamalaridan cookies'ni o'chirishi mumkin."
        },
        {
            id: 7,
            icon: UserCheck,
            title: "7. Foydalanuvchi huquqlari",
            content: "Siz:",
            list: [
                "o'z ma'lumotlaringizni ko'rish",
                "tahrirlash",
                "o'chirishni so'rash"
            ],
            note: "huquqiga egasiz."
        },
        {
            id: 8,
            icon: RefreshCw,
            title: "8. Siyosatga o'zgartirishlar",
            content: "Platforma ushbu Maxfiylik siyosatini vaqti-vaqti bilan yangilashi mumkin.",
            note: "Yangilangan versiya saytga joylashtirilgan paytdan boshlab kuchga kiradi."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-black text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center mb-6">
                        <Shield size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Maxfiylik Siyosati
                    </h1>
                    <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
                        AKBW platformasi foydalanuvchilarining shaxsiy ma'lumotlarini qanday yig'ish, saqlash va ishlatishni tushuntiradi
                    </p>
                </div>
            </div>

            {/* Introduction */}
            <div className="container mx-auto px-4 max-w-4xl py-12">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
                    <p className="text-gray-800 leading-relaxed">
                        Platformadan foydalanish orqali siz ushbu siyosat shartlariga rozilik bildirasiz.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-black rounded-lg">
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                            {section.title}
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {section.content}
                                        </p>

                                        {section.list && (
                                            <ul className="space-y-2 mb-4">
                                                {section.list.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.note && (
                                            <p className="text-gray-600 italic mt-3">
                                                {section.note}
                                            </p>
                                        )}

                                        {section.subList && (
                                            <ul className="space-y-2 mt-3 ml-4">
                                                {section.subList.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-gray-600">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-br from-black to-gray-900 text-white rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail size={32} />
                        <h2 className="text-3xl font-bold">9. Aloqa</h2>
                    </div>
                    <p className="text-gray-300 mb-6">
                        Agar savollaringiz bo'lsa, biz bilan bog'laning:
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <a href="mailto:akbw.uz@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                                    akbw.uz@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Telefon</p>
                                <a href="tel:+998901234567" className="text-white hover:text-gray-300 transition-colors">
                                    +998 90 566 11 07
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Manzil</p>
                                <p className="text-white">
                                    Toshkent shahar, Shayxontoxur tumani
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Oxirgi yangilanish: 2026 yil 1-fevral
                    </p>
                </div>
            </div>
        </div>
    );
}
