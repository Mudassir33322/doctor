import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Calendar, Menu, X, ArrowRight, User } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeRoute,
    setActiveRoute,
    setBookingModalOpen,
    cmsConfig,
    currentRole,
    setCurrentRole,
    setAdminActiveTab,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Dentists', route: '/dentists' },
    { label: 'Before & After', route: '/before-after' },
    { label: 'Reviews', route: '/reviews' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'Emergency', route: '/emergency' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleNavClick = (route: string) => {
    setActiveRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-[41px] z-40 w-full transition-all duration-200 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200' : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Zone 1: Single text element wordmark (Display Face, no secondary taglines) */}
            <button
              onClick={() => handleNavClick('/')}
              className="text-left group cursor-pointer focus:outline-hidden"
            >
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                SMILORA
              </span>
            </button>

            {/* Zone 2: 4-6 clean text navigation links with subtle underlines */}
            <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-600">
              <button
                onClick={() => handleNavClick('/')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute === '/' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute === '/about' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('/services')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute.startsWith('/services') ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('/dentists')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute.startsWith('/dentists') ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Dentists
              </button>
              <button
                onClick={() => handleNavClick('/before-after')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute === '/before-after' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Smile Gallery
              </button>
              <button
                onClick={() => handleNavClick('/pricing')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute === '/pricing' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavClick('/blog')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute.startsWith('/blog') ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className={`py-1 transition-colors hover:text-slate-900 ${
                  activeRoute === '/contact' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: 1-2 primary actions (Call + Book Appointment) */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span className="whitespace-nowrap">{cmsConfig.phone}</span>
              </a>

              <button
                onClick={() => {
                  setActiveRoute('/appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-xs hover:shadow-sm whitespace-nowrap active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book Appointment</span>
              </button>

              {/* Mobile hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {navLinks.map(link => (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left px-3 py-2 rounded-lg transition-colors ${
                    activeRoute === link.route ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call Clinic: {cmsConfig.phone}</span>
              </a>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <button
                  onClick={() => {
                    setActiveRoute('/patient');
                    setCurrentRole('patient');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Patient Area
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/dentist');
                    setCurrentRole('dentist');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Dentist Area
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/admin');
                    setAdminActiveTab('dashboard');
                    setCurrentRole('super_admin');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 border border-teal-200 bg-teal-50/50 rounded-lg text-teal-800 font-medium"
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
