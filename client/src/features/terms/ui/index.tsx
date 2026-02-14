import React from 'react';
import {
  FileText,
  ShoppingCart,
  CreditCard,
  Truck,
  Clock,
  RotateCcw,
  ShieldAlert,
  Copyright,
  RefreshCw,
  Mail,
  Phone,
  AlertTriangle,
} from 'lucide-react';

export default function TermsAndConditions() {
  const sections = [
    {
      id: 1,
      icon: FileText,
      title: '1. Umumiy qoidalar',
      list: [
        "Platforma kiyim-kechak mahsulotlarini onlayn buyurtma qilish va yetkazib berish xizmatini ko'rsatadi.",
        "Platforma O'zbekiston Respublikasi qonunchiligiga muvofiq faoliyat yuritadi.",
        'Platforma orqali buyurtma berish faqat 18 yoshdan katta shaxslar uchun ruxsat etiladi.',
      ],
    },
    {
      id: 2,
      icon: ShoppingCart,
      title: '2. Buyurtma berish tartibi',
      list: [
        'Foydalanuvchi mahsulotni tanlab, buyurtma beradi.',
        "Buyurtma berishda kiritilgan ma'lumotlar (ism, telefon, manzil) to'g'ri va aniq bo'lishi shart.",
        "Noto'g'ri kiritilgan ma'lumotlar sababli yetkazib berilmagan buyurtma uchun Platforma javobgar emas.",
      ],
    },
    {
      id: 3,
      icon: CreditCard,
      title: "3. To'lov shartlari",
      content: "To'lovlar quyidagi usullar orqali amalga oshiriladi:",
      list: ['Click', 'Payme', 'Uzcard', 'Humo'],
      notes: [
        "To'lovlar xavfsiz uchinchi tomon to'lov tizimlari orqali amalga oshiriladi.",
        "Platforma bank karta ma'lumotlarini saqlamaydi va qayta ishlamaydi.",
      ],
    },
    {
      id: 4,
      icon: Truck,
      title: '4. Yetkazib berish shartlari',
      isImportant: true,
      content:
        'Mahsulotlar Uzpost pochta xizmati orqali yetkazib beriladi va yetkazib berish ikki bosqichdan iborat:',
      stages: [
        {
          title: '1-bosqich:',
          items: [
            "Mahsulot chet eldan O'zbekistonga (Toshkent shahriga) yetkaziladi.",
            "Ushbu bosqichga ko'proq vaqt ketishi mumkin.",
            "Bu vaqt bojxona, logistika va tashqi omillarga bog'liq.",
          ],
        },
        {
          title: '2-bosqich:',
          items: [
            "Mahsulot Toshkent shahridan foydalanuvchi ko'rsatgan manzilga Uzpost orqali yuboriladi.",
          ],
        },
      ],
      warning:
        "Foydalanuvchi yetkazib berish muddati asosan 1-bosqichga bog'liqligini tushunib, bunga rozilik bildiradi.",
    },
    {
      id: 5,
      icon: Clock,
      title: '5. Yetkazib berish muddati',
      list: ['Yetkazib berish muddati taxminiy hisoblanadi.'],
      content: 'Kechikishlar:',
      subList: ['bojxona tekshiruvlari', 'ob-havo', 'transport muammolari'],
      note: 'sababli yuzaga kelishi mumkin.',
      warning: 'Platforma ushbu holatlar uchun javobgar emas.',
    },
    {
      id: 6,
      icon: RotateCcw,
      title: '6. Qaytarish va refund',
      content: 'Agar mahsulot:',
      list: ["noto'g'ri yuborilgan bo'lsa", 'jiddiy nuqson bilan yetib kelsa'],
      note: 'foydalanuvchi mahsulotni qabul qilgan kundan boshlab 3 kun ichida murojaat qilishi kerak.',
      additionalNotes: [
        "O'lcham yoki did sababli qaytarish masalalari individual tartibda ko'rib chiqiladi.",
        'Yetkazib berilgan va ishlatilgan mahsulotlar qaytarilmaydi.',
      ],
    },
    {
      id: 7,
      icon: ShieldAlert,
      title: '7. Javobgarlikni cheklash',
      list: [
        "Platforma uchinchi tomon xizmatlari (Uzpost, to'lov tizimlari) faoliyati uchun to'liq javobgar emas.",
        "Platforma foydalanuvchining noto'g'ri harakatlari sababli yuzaga kelgan zararlar uchun javobgar emas.",
      ],
    },
    {
      id: 8,
      icon: Copyright,
      title: '8. Intellektual mulk',
      list: [
        'Saytdagi barcha matnlar, rasmlar va dizayn elementlari Platformaga tegishli.',
        "Ularni ruxsatsiz ko'chirish yoki ishlatish taqiqlanadi.",
      ],
    },
    {
      id: 9,
      icon: RefreshCw,
      title: "9. O'zgartirishlar",
      content:
        "Platforma ushbu Foydalanish shartlarini istalgan vaqtda o'zgartirish huquqiga ega.",
      note: 'Yangilangan shartlar saytga joylangan kundan boshlab kuchga kiradi.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <FileText size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Foydalanish Shartlari
          </h1>
          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
            AKBW platformasidan foydalanish qoidalari va shartlari
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg mb-12">
          <p className="text-gray-800 leading-relaxed font-medium">
            Platformadan foydalanish orqali siz ushbu shartlarga rozilik
            bildirasiz va ularni bajarishga majbursiz.
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
                {section.isImportant && (
                  <div className="mb-4 flex items-center gap-2 text-red-600">
                    <AlertTriangle size={20} />
                    <span className="font-bold text-sm uppercase">Muhim</span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-black rounded-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>

                    {section.content && (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {section.content}
                      </p>
                    )}

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

                    {section.subList && (
                      <ul className="space-y-2 mb-2 ml-4">
                        {section.subList.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.stages && (
                      <div className="space-y-4 mb-4">
                        {section.stages.map((stage, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">
                              {stage.title}
                            </h3>
                            <ul className="space-y-2">
                              {stage.items.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  className="flex items-start gap-3"
                                >
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.notes && (
                      <div className="space-y-2 mt-3">
                        {section.notes.map((note, index) => (
                          <p key={index} className="text-gray-600 italic">
                            {note}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <p className="text-gray-600 italic mt-3">
                        {section.note}
                      </p>
                    )}

                    {section.additionalNotes && (
                      <ul className="space-y-2 mt-3">
                        {section.additionalNotes.map((note, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{note}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.warning && (
                      <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            size={20}
                            className="text-red-600 flex-shrink-0 mt-0.5"
                          />
                          <p className="text-red-800 font-medium">
                            {section.warning}
                          </p>
                        </div>
                      </div>
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
            <h2 className="text-3xl font-bold">10. Aloqa</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Savollar bo'yicha biz bilan bog'lanishingiz mumkin:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Telefon</p>
                <a
                  href="tel:+998905661107"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  +998 90 566 11 07
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a
                  href="mailto:akbw.uz@gmail.com"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  akbw.uz@gmail.com
                </a>
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
