import React from 'react';
import { Leaf, Globe, ShieldCheck, } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    const features = [
        {
            icon: Leaf,
            title: "Minimalizm",
            description: "Ortiqcha bezaklarsiz, tushunarli shakllar va sokin ranglar orqali xarakter ifodasi."
        },
        {
            icon: ShieldCheck,
            title: "Sifat",
            description: "Har bir mahsulot tanlashdan tortib mijozga yetib borguncha qat'iy nazorat."
        },
        {
            icon: Globe,
            title: "Kelajak",
            description: "O'zbekistonda boshlanib, xalqaro miqyosga intilayotgan barqaror rivojlanish."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-neutral-900/10 z-0"></div>
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase font-display">AKBW</h1>
                    <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-2xl mx-auto tracking-wide">
                        Oddiy, Sifatli Cheksiz Dizayn
                    </p>
                    <div className="h-1 w-24 bg-black mx-auto mt-8"></div>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="py-20 md:py-32 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">O'zbekistonda tug'ilgan zamonaviy brend</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                <span className="font-bold text-black">AKBW (AKBARA BRAND WEAR)</span> — O‘zbekistonda tashkil topgan zamonaviy kiyim brendi bo‘lib, soddalik, sifat va minimal dizayn g‘oyalariga asoslangan.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Brendning asosiy maqsadi kundalik hayot uchun qulay, zamonaviy va estetik jihatdan toza kiyimlarni taklif qilish orqali o‘ziga xos uslubni shakllantirishdir.
                            </p>
                        </div>
                        <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 font-display text-9xl font-bold text-white select-none">
                                AKBW
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy & Vision - Alternating Layout */}
            <section className="bg-neutral-50 py-20 md:py-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    {/* Vision Block */}
                    <div className="mb-24">
                        <div className="max-w-3xl mx-auto text-center space-y-8">
                            <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">Vizyon</span>
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight">Vaqt sinovidan o'tadigan uslubni tanlash</h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                "Brend g‘oyasi shovqinli trendlar va tez o‘zgaruvchan modadan ko‘ra, uzoq muddatli qiymatga ega bo‘lgan dizayn, sokin ranglar va sifatli materiallarga tayanadi."
                            </p>
                            <div className="pt-4">
                                <div className="inline-block border-t border-gray-300 pt-4">
                                    <p className="font-bold text-lg">Akbarov Abdulloh</p>
                                    <p className="text-sm text-gray-500">AKBW Asoschisi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    <item.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Organization & Growth */}
            <section className="py-20 md:py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold">Rivojlanish va Maqsadlar</h2>
                            <div className="space-y-6 text-gray-600 text-lg">
                                <p>
                                    Brend Toshkent shahrida tashkil topgan bo‘lib, faoliyati <span className="font-semibold text-black">AKBARA GROUP</span> tarkibida olib boriladi. AKBW jamoasi dizayn, sifat nazorati va onlayn savdo jarayonlariga alohida e’tibor qaratadi.
                                </p>
                                <p>
                                    AKBW dastlab sifatli ishlab chiqaruvchilar bilan hamkorlik qilish orqali bozorda o‘z o‘rnini mustahkamlashni maqsad qilgan. Kelajakda esa brend o‘z dizayniga ega bo‘lgan, AKBW falsafasini to‘liq aks ettiruvchi mahsulotlarni yaratishni rejalashtiradi.
                                </p>
                            </div>
                            <Button className="mt-4 bg-black text-white rounded-full px-8 py-6 text-lg hover:bg-neutral-800 transition-all font-medium">
                                <Link href="/shop">To'plamni ko'rish</Link>
                            </Button>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                            <div className="bg-neutral-100 rounded-2xl p-8 flex flex-col justify-end min-h-[300px] hover:bg-neutral-200 transition-colors">
                                <span className="text-5xl mb-4">✨</span>
                                <h4 className="text-xl font-bold mb-2">Halollik</h4>
                                <p className="text-gray-600">Bizning barcha jarayonlarimizda shaffoflik va ishonch birinchi o'rinda.</p>
                            </div>
                            <div className="bg-neutral-900 text-white rounded-2xl p-8 flex flex-col justify-end min-h-[300px] mt-12 hover:bg-neutral-800 transition-colors">
                                <span className="text-5xl mb-4">🚀</span>
                                <h4 className="text-xl font-bold mb-2">Onlayn Tajriba</h4>
                                <p className="text-gray-400">Raqamli muhitda ochiq, tushunarli va qulay xarid tajribasi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Statement */}
            <section className="bg-black text-white py-24 px-6 text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-snug">
                        "AKBW — bu faqat dizayn emas, balki fikrlash uslubidir."
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl mb-10 font-light">
                        Ortiqcha bezaklarsiz, tushunarli shakllar va sokin ranglar orqali o'zingizni namoyon qiling.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="/" className="border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all">Bosh sahifa</Link>
                        <Link href="/contact" className="border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all">Bog'lanish</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
