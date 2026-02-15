import React from 'react';
import { Leaf, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AkbaraAbout from '../../../../public/assets/akbw-about.jpg';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const features = [
    {
      icon: Leaf,
      title: 'features.minimalism_title',
      description:
        'features.minimalism_description',
    },
    {
      icon: ShieldCheck,
      title: 'features.quality_title',
      description:
        "features.quality_description",
    },
    {
      icon: Globe,
      title: 'features.future_title',
      description:
        "features.future_description",
    },
  ];

  const t = useTranslations('AboutPage');

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-900/10 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase font-display">
            AKBW
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-2xl mx-auto tracking-wide">
            {t("hero_subtitle")}
          </p>
          <div className="h-1 w-24 bg-black mx-auto mt-8"></div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("intro_title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span className="font-bold text-black">
                  {t("akbw_full_name")}
                </span>{' '}
                {t("intro_description_1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("intro_description_2")}
              </p>
            </div>
            <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden group relative">
              <Image
                src={AkbaraAbout.src}
                alt="AKBW"
                className="w-full h-full object-cover"
                fill
              />
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
              <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                {t('vision_label')}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                {t('vision_title')}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                {t('vision_description')}
              </p>
              <div className="pt-4">
                <div className="inline-block border-t border-gray-300 pt-4">
                  <p className="font-bold text-lg">{t("founder_name")}</p>
                  <p className="text-sm text-gray-500">{t("founder_role")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
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
              <h2 className="text-3xl md:text-4xl font-bold">
                {t("growth_title")}
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  {t("growth_description_1")}
                </p>
                <p>
                  {t("growth_description_2")}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-neutral-100 rounded-2xl p-8 flex flex-col justify-end min-h-[300px] hover:bg-neutral-200 transition-colors">
                <span className="text-5xl mb-4">✨</span>
                <h4 className="text-xl font-bold mb-2">{t("values.honesty_title")}</h4>
                <p className="text-gray-600">
                  {t("values.honesty_description")}
                </p>
              </div>
              <div className="bg-neutral-900 text-white rounded-2xl p-8 flex flex-col justify-end min-h-[300px] mt-12 hover:bg-neutral-800 transition-colors">
                <span className="text-5xl mb-4">🚀</span>
                <h4 className="text-xl font-bold mb-2">{t("values.online_exp_title")}</h4>
                <p className="text-gray-400">
                  {t("values.online_exp_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Statement */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-snug">
            {t("bottom_quote")}
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl mb-10 font-light">
            {t("bottom_description")}
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/"
              className="border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all"
            >
              {t("home_link")}
            </Link>
            <Link
              href="/contact"
              className="border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all"
            >
              {t("contact_link")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
