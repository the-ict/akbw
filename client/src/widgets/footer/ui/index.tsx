'use client';

import Link from 'next/link';
import { PRODUCT_INFO } from '@/shared/constants/data';
import { Instagram, Send, Globe2Icon } from 'lucide-react';
import { useUIStore } from '@/shared/model/use-ui-store';

const Footer = () => {
  const openProfileChat = useUIStore((state) => state.openProfileChat);

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/shop/new' },
      { name: 'Best Sellers', href: '/shop/bestsellers' },
      { name: 'All Products', href: '/shop' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Chat', href: '/' },
    ],
    company: [
      { name: 'About AKBW', href: '/about' },
      { name: 'Privacy Policy', href: PRODUCT_INFO.privacy_policy },
      { name: 'Terms of Use', href: PRODUCT_INFO.terms_of_use },
    ],
  };

  return (
    <footer className="bg-[#D6D3CC] text-black mt-auto">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              href="/"
              className="font-display text-2xl text-akbw-black hover:opacity-70 transition-opacity inline-block mb-4"
            >
              {PRODUCT_INFO.name}
            </Link>
            <p className="text-black text-sm leading-relaxed">
              {PRODUCT_INFO.description}
            </p>
          </div>

          <div className='lg:col-span-3 grid grid-cols-3 gap-3 justify-between items-start lg:flex lg:justify-between lg:w-full'>
            <div>
              <h3 className="font-display text-sm mb-4">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-black hover:font-bold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.name === 'Chat') {
                          e.preventDefault();
                          openProfileChat();
                        }
                      }}
                      className="text-sm text-black hover:font-bold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm mb-4">Company</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-black hover:font-bold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <a
                href={PRODUCT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:font-bold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 icon-minimal" />
              </a>
              <a
                href={PRODUCT_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:font-bold transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 icon-minimal" />
              </a>
              <a
                href={PRODUCT_INFO.socials.website}
                rel="noopener noreferrer"
                className="text-black hover:font-bold transition-colors"
                aria-label="Website"
              >
                <Globe2Icon className="w-5 h-5 icon-minimal" />
              </a>
            </div>
          </div>
        </div>

        <hr />
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-black">
              © «2026© XK MCHJ «AKBW». STIR 00000000. Barcha huquqlar
              himoyalangan»
            </p>
            <div className="flex space-x-6 text-sm text-black">
              <Link
                href={PRODUCT_INFO.privacy_policy}
                className="hover:font-bold transition-colors"
              >
                Privacy
              </Link>
              <Link
                href={PRODUCT_INFO.terms_of_use}
                className="hover:font-bold transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
