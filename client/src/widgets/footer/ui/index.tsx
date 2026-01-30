import Link from 'next/link';
import { PRODUCT_INFO } from '@/shared/constants/data';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/shop/new' },
      { name: 'Best Sellers', href: '/shop/bestsellers' },
      { name: 'All Products', href: '/shop' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About AKBW', href: '/about' },
      { name: 'Privacy Policy', href: PRODUCT_INFO.privacy_policy },
      { name: 'Terms of Use', href: PRODUCT_INFO.terms_of_use },
    ],
  };

  return (
    <footer className="bg-akbw-black text-akbw-white mt-auto">
      <div className="container section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="font-display text-2xl text-akbw-white hover:opacity-70 transition-opacity inline-block mb-4">
              {PRODUCT_INFO.name}
            </Link>
            <p className="text-akbw-gray text-sm leading-relaxed">
              {PRODUCT_INFO.description}
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-sm mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-akbw-gray hover:text-akbw-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-akbw-gray hover:text-akbw-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h3 className="font-display text-sm mb-4">Company</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-akbw-gray hover:text-akbw-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={PRODUCT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-akbw-gray hover:text-akbw-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 icon-minimal" />
              </a>
              <a
                href={PRODUCT_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-akbw-gray hover:text-akbw-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 icon-minimal" />
              </a>
              <a
                href={PRODUCT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-akbw-gray hover:text-akbw-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 icon-minimal" />
              </a>
              <a
                href={PRODUCT_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-akbw-gray hover:text-akbw-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 icon-minimal" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-akbw-gray">
              © {currentYear} {PRODUCT_INFO.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-akbw-gray">
              <Link href={PRODUCT_INFO.privacy_policy} className="hover:text-akbw-white transition-colors">
                Privacy
              </Link>
              <Link href={PRODUCT_INFO.terms_of_use} className="hover:text-akbw-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
