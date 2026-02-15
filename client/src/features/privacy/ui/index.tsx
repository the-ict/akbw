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
  RefreshCw,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Privacy() {

  const t = useTranslations("PrivacyPage");

  const sections = [
    {
      id: 1,
      icon: FileText,
      title: t("sections.0.title"),
      content: t("sections.0.content"),
      list: [
        t("sections.0.list.0"),
        t("sections.0.list.1"),
        t("sections.0.list.2"),
        t("sections.0.list.3"),
        t("sections.0.list.4"),
        t("sections.0.list.5"),
      ],
    },
    {
      id: 2,
      icon: Users,
      title: t("sections.1.title"),
      content: t("sections.1.content"),
      list: [
        t("sections.1.list.0"),
        t("sections.1.list.1"),
        t("sections.1.list.2"),
        t("sections.1.list.3"),
        t("sections.1.list.4"),
        t("sections.1.list.5"),
        t("sections.1.list.6"),
      ],
    },
    {
      id: 3,
      icon: Lock,
      title: t("sections.2.title"),
      content: t("sections.2.content"),
      note: t("sections.2.note"),
    },
    {
      id: 4,
      icon: UserCheck,
      title: t("sections.3.title"),
      content: t("sections.3.content"),
      list: [
        t("sections.3.list.0"),
        t("sections.3.list.1"),
        t("sections.3.list.2"),
      ],
      note: t("sections.3.note"),
      subList: [
        t("sections.3.subList.0"),
        t("sections.3.subList.1"),
      ],
    },
    {
      id: 5,
      icon: Shield,
      title: t("sections.4.title"),
      content: t("sections.4.content"),
      list: [
        t("sections.4.list.0"),
        t("sections.4.list.1"),
        t("sections.4.list.2"),
      ],
      note: t("sections.4.note"),
    },
    {
      id: 6,
      icon: Cookie,
      title: t("sections.5.title"),
      content: t("sections.5.content"),
      note: t("sections.5.note"),
    },
    {
      id: 7,
      icon: UserCheck,
      title: t("sections.6.title"),
      content: 'Siz:',
      list: [
        t("sections.6.list.0"),
        t("sections.6.list.1"),
        t("sections.6.list.2"),
      ],
      note: t("sections.6.note"),
    },
    {
      id: 8,
      icon: RefreshCw,
      title: t("sections.7.title"),
      content: t("sections.7.content"),
      note: t("sections.7.note"),
    },
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
            {t("hero.title")}
          </h1>
          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
          <p className="text-gray-800 leading-relaxed">
            {t("intro")}
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
            <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
          </div>
          <p className="text-gray-300 mb-6">
            {t("contact.description")}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t("contact.emailLabel")}</p>
                <a
                  href="mailto:akbw.uz@gmail.com"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {t("contact.email")}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t("contact.phoneLabel")}</p>
                <a
                  href="tel:+998901234567"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {t("contact.phone")}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t("contact.addressLabel")}</p>
                <p className="text-white">
                  {t("contact.address")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t("footerNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
