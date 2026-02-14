import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Send,
  Clock,
  Facebook,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+998 90 566 11 07',
      action: 'tel:+998905661107',
      description: 'Har kuni 09:00 dan 18:00 gacha',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'akbw.uz@gmail.com',
      action: 'mailto:akbw.uz@gmail.com',
      description: 'Bizga istalgan vaqtda yozing',
    },
    {
      icon: MapPin,
      title: 'Manzil',
      value: 'Toshkent sh., Shayxontoxur tumani',
      action: null,
      description: 'Bosh ofis joylashuvi',
    },
  ];

  const socials = [
    {
      icon: Send,
      name: 'Telegram',
      link: 'https://t.me/akbwuz',
      color: 'hover:text-blue-500',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://instagram.com/akbw.uz',
      color: 'hover:text-pink-600',
    },
    { icon: Globe, name: 'Website', link: '/', color: 'hover:text-black' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Bog'lanish
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Savollaringiz bormi yoki hamkorlik qilmoqchimisiz? Biz bilan aloqaga
            chiqing.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-6 py-12 -mt-10 md:-mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {contactMethods.map((method, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-neutral-200 shadow-xl">
                <method.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              {method.action ? (
                <a
                  href={method.action}
                  className="text-lg font-medium hover:text-blue-600 transition-colors mb-2"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-lg font-medium mb-2">{method.value}</p>
              )}
              <p className="text-sm text-gray-400">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Social Media & Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ijtimoiy tarmoqlar</h2>
              <p className="text-gray-600 text-lg mb-8">
                Yangiliklar, aksiyalar va yangi to'plamlardan xabardor bo'lish
                uchun bizni kuzatib boring.
              </p>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium transition-all hover:shadow-md ${social.color}`}
                  >
                    <social.icon size={22} />
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 text-white p-8 rounded-2xl mt-8">
              <div className="flex items-start gap-4 mb-4">
                <Clock className="text-neutral-400 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Ish vaqti</h3>
                  <p className="text-neutral-400">Dushanba - Shanba</p>
                  <p className="text-white text-xl font-medium mt-1">
                    09:00 - 18:00
                  </p>
                  <p className="text-neutral-500 text-sm mt-3">
                    Yakshanba - Dam olish kuni
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ / Simple Support Text */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              Ko'p beriladigan savollar
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-100">
                <h4 className="font-semibold text-lg mb-2">
                  Yetkazib berish qancha vaqt oladi?
                </h4>
                <p className="text-gray-600">
                  Xalqaro yetkazib berish (1-bosqich) va ichki yetkazib berish
                  (2-bosqich) birgalikda o'rtacha 5-15 kun davom etishi mumkin.
                </p>
              </div>
              <div className="pb-6 border-b border-gray-100">
                <h4 className="font-semibold text-lg mb-2">
                  To'lov turlari qanday?
                </h4>
                <p className="text-gray-600">
                  Biz Click, Payme, Uzum va Paynet orqali to'lovlarni qabul
                  qilamiz.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Hamkorlik bo'yicha kimga murojaat qilish kerak?
                </h4>
                <p className="text-gray-600">
                  Tijoriy takliflar uchun{' '}
                  <a
                    href="mailto:akbw.uz@gmail.com"
                    className="text-black font-medium underline"
                  >
                    akbw.uz@gmail.com
                  </a>{' '}
                  elektron pochta manziliga yozishingiz mumkin.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                Foydalanish shartlari va qoidalari bilan tanishib chiqing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
