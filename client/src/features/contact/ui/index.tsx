import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Send,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'contact_methods.phone_title',
      value: '+998 90 566 11 07',
      action: 'tel:+998905661107',
      description: 'contact_methods.phone_description',
    },
    {
      icon: Mail,
      title: 'contact_methods.email_title',
      value: 'akbw.uz@gmail.com',
      action: 'mailto:akbw.uz@gmail.com',
      description: 'contact_methods.email_description',
    },
    {
      icon: MapPin,
      title: 'contact_methods.address_title',
      value: 'Toshkent sh., Shayxontoxur tumani',
      action: null,
      description: 'contact_methods.address_description',
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

  const t = useTranslations("ContactPage");

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            {t("subtitle")}
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
              <h2 className="text-3xl font-bold mb-4">{t("socials_title")}</h2>
              <p className="text-gray-600 text-lg mb-8">
                {t("socials_description")}
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
                  <h3 className="font-bold text-lg mb-1">{t("working_hours_title")}</h3>
                  <p className="text-neutral-400">{t("working_days")}</p>
                  <p className="text-white text-xl font-medium mt-1">
                    {t("working_time")}
                  </p>
                  <p className="text-neutral-500 text-sm mt-3">
                    {t("weekend")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ / Simple Support Text */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              {t("faq_title")}
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-100">
                <h4 className="font-semibold text-lg mb-2">
                  {t("faq.delivery_question")}
                </h4>
                <p className="text-gray-600">
                  {t("faq.delivery_answer")}
                </p>
              </div>
              <div className="pb-6 border-b border-gray-100">
                <h4 className="font-semibold text-lg mb-2">
                  {t("faq.payment_question")}
                </h4>
                <p className="text-gray-600">
                  {t("faq.payment_answer")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  {t("faq.partnership_question")}
                </h4>
                <p className="text-gray-600">
                  {t("faq.partnership_answer", { email: "akbw.uz@gmail.com" })}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                {t("terms_link")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
