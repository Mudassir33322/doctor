import React from 'react';
import { useApp } from './context/AppContext';
import { DemoToolbar } from './components/layout/DemoToolbar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileQuickBar } from './components/layout/MobileQuickBar';
import { ToastContainer } from './components/common/Toast';

// Public components
import { HeroSection } from './components/public/HeroSection';
import { TrustSection } from './components/public/TrustSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ServiceDetailPage } from './components/public/ServiceDetailPage';
import { DentistsSection } from './components/public/DentistsSection';
import { DentistProfilePage } from './components/public/DentistProfilePage';
import { BeforeAfterGallery } from './components/public/BeforeAfterGallery';
import { ReviewsSection } from './components/public/ReviewsSection';
import { EmergencyPage } from './components/public/EmergencyPage';
import { PricingPage } from './components/public/PricingPage';
import { FAQSection } from './components/public/FAQSection';
import { ContactPage } from './components/public/ContactPage';
import { AboutPage } from './components/public/AboutPage';
import { BlogSection } from './components/public/BlogSection';
import { BlogPostDetail } from './components/public/BlogPostDetail';
import { LegalPages } from './components/public/LegalPages';

// Booking & Portals
import { AppointmentBookingPage } from './components/booking/AppointmentBookingPage';
import { PatientPortal } from './components/patient/PatientPortal';
import { DentistPortal } from './components/dentist/DentistPortal';
import { AdminPortal } from './components/admin/AdminPortal';

import { Calendar, Phone, MessageSquare, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const { activeRoute, setActiveRoute, cmsConfig, currentRole } = useApp();

  // Route Dispatcher
  const renderContent = () => {
    // Portals
    if (activeRoute.startsWith('/admin')) {
      return <AdminPortal />;
    }
    if (activeRoute.startsWith('/dentist')) {
      return <DentistPortal />;
    }
    if (activeRoute.startsWith('/patient')) {
      return <PatientPortal />;
    }

    // Appointment Booking Wizard
    if (activeRoute === '/appointment') {
      return <AppointmentBookingPage />;
    }

    // Dynamic Service Detail
    if (activeRoute.startsWith('/services/')) {
      const slug = activeRoute.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }
    if (activeRoute === '/services') {
      return (
        <div className="bg-[#F8FAFC] min-h-screen pb-16">
          <div className="bg-white border-b border-slate-200 py-12 lg:py-16 text-center max-w-4xl mx-auto px-4">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Comprehensive Dentistry
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              Our Dental Services & Treatments
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              From general checkups and teeth whitening to 3D dental implants and Invisalign aligners, browse our full treatment catalog.
            </p>
          </div>
          <ServicesSection showHeader={false} />
        </div>
      );
    }

    // Dynamic Dentist Detail
    if (activeRoute.startsWith('/dentists/')) {
      const slug = activeRoute.replace('/dentists/', '');
      return <DentistProfilePage slug={slug} />;
    }
    if (activeRoute === '/dentists') {
      return (
        <div className="bg-[#F8FAFC] min-h-screen pb-16">
          <div className="bg-white border-b border-slate-200 py-12 lg:py-16 text-center max-w-4xl mx-auto px-4">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Clinical Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              Our Dental Specialists & Surgeons
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Qualified dental specialists with post-graduate training from the UK, Europe, and FCPS boards dedicated to gentle patient care.
            </p>
          </div>
          <DentistsSection showHeader={false} />
        </div>
      );
    }

    // Dynamic Blog Post
    if (activeRoute.startsWith('/blog/')) {
      const slug = activeRoute.replace('/blog/', '');
      return <BlogPostDetail slug={slug} />;
    }
    if (activeRoute === '/blog') {
      return (
        <div className="bg-[#F8FAFC] min-h-screen pb-16">
          <div className="bg-white border-b border-slate-200 py-12 lg:py-16 text-center max-w-4xl mx-auto px-4">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Educational Guides
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              SMILORA Oral Health Journal
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Read transparent guides on braces, aligners, root canals, whitening, and children's dentistry.
            </p>
          </div>
          <BlogSection />
        </div>
      );
    }

    // Other standard pages
    if (activeRoute === '/about') return <AboutPage />;
    if (activeRoute === '/before-after') return <BeforeAfterGallery />;
    if (activeRoute === '/reviews') return <ReviewsSection />;
    if (activeRoute === '/pricing') return <PricingPage />;
    if (activeRoute === '/faq') return <FAQSection />;
    if (activeRoute === '/emergency' || activeRoute === '/emergency-dentistry') return <EmergencyPage />;
    if (activeRoute === '/contact' || activeRoute === '/locations') return <ContactPage />;
    if (activeRoute === '/privacy') return <LegalPages type="privacy" />;
    if (activeRoute === '/terms') return <LegalPages type="terms" />;

    // HOMEPAGE (Default Route: '/')
    if (activeRoute === '/') {
      return (
        <div className="bg-white">
          {/* Announcement banner if active */}
          {cmsConfig.announcementActive && (
            <div className="bg-teal-900 text-teal-100 py-2.5 px-4 text-xs font-medium text-center border-b border-teal-800">
              <span className="font-semibold text-white mr-1.5">Practice Update:</span>
              <span>{cmsConfig.announcementText}</span>
              <button
                onClick={() => {
                  setActiveRoute('/appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="underline font-bold text-teal-300 ml-2 hover:text-white"
              >
                Book online →
              </button>
            </div>
          )}

          {/* Hero Section */}
          <HeroSection />

          {/* 4 Trust Cards */}
          <TrustSection />

          {/* Featured Services (6 marquee treatments) */}
          <ServicesSection limit={6} showHeader={true} />

          {/* Why Choose Us Banner */}
          <section className="py-16 sm:py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Why Patients Choose SMILORA
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                    World-Class Clinical Standards With a Gentle Chairside Manner
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    We designed our clinic from the patient’s perspective: zero judgment, transparent pricing before you sit down, and dental technology that replaces outdated scary drills with quiet electric handpieces and painless diode lasers.
                  </p>

                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-bold text-white text-sm">Experienced Team</div>
                      <div className="text-slate-400 mt-1">Specialists with UK and FCPS credentials leading every department.</div>
                    </div>
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-bold text-white text-sm">Modern Technology</div>
                      <div className="text-slate-400 mt-1">3D digital scanners, low-dose digital sensors, and surgical microscopes.</div>
                    </div>
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-bold text-white text-sm">Personalized Care</div>
                      <div className="text-slate-400 mt-1">Every treatment plan is custom-crafted to your unique smile anatomy.</div>
                    </div>
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-bold text-white text-sm">Patient-First Comfort</div>
                      <div className="text-slate-400 mt-1">Gentle numbing protocols, calming atmosphere, and zero rushing.</div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-4/3 shadow-2xl">
                  <img
                    src="/assets/images/dental_smile_portrait_1791148478469.jpg"
                    alt="Radiant, Healthy Smile Transformation"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                    <div className="text-xl font-bold font-display">15,000+ Happy Patients</div>
                    <div className="text-slate-300 text-xs mt-0.5">
                      "I used to fear the dentist for years until I visited SMILORA. Completely painless."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dentists Preview (3 featured doctors) */}
          <DentistsSection limit={3} showHeader={true} />

          {/* Interactive Before & After Transformation Slider */}
          <BeforeAfterGallery />

          {/* Patient Reviews */}
          <ReviewsSection />

          {/* Big Appointment CTA Banner */}
          <section className="py-16 sm:py-20 bg-teal-800 text-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-200 bg-teal-900/60 px-3.5 py-1.5 rounded-full border border-teal-700">
                Reserve Your Smile Assessment
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white max-w-2xl mx-auto leading-tight">
                Ready to take care of your smile?
              </h2>
              <p className="text-sm sm:text-base text-teal-100 max-w-xl mx-auto leading-relaxed">
                Whether you need a routine preventative cleaning, teeth whitening, or specialist consultation, our friendly team is here to welcome you.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setActiveRoute('/appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-xl font-bold text-teal-950 bg-white hover:bg-teal-50 transition-all shadow-lg text-sm"
                >
                  Book Your Appointment
                </button>
                <a
                  href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-teal-900/80 hover:bg-teal-900 border border-teal-600 transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-300" />
                  <span>Call {cmsConfig.phone}</span>
                </a>
              </div>
            </div>
          </section>

          {/* Location & Quick Contact Strip */}
          <section className="py-14 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-display">Visit Our Practice</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {cmsConfig.address}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveRoute('/contact')}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      View Map & DHA Branch →
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-display">Opening Hours</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {cmsConfig.openingHours}
                  </p>
                  <div className="pt-2 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open Today For Walk-Ins & Appointments</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-display">WhatsApp & Direct Calls</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Instant appointment booking and dental advice direct from our front desk team.
                  </p>
                  <div className="pt-2 flex items-center gap-4 font-bold">
                    <a href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`} className="text-teal-700 hover:underline">
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // 404 fallback
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#F8FAFC]">
        <span className="text-4xl font-extrabold text-teal-800 font-display">404</span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Page Not Found</h2>
        <p className="text-xs text-slate-600 mt-1 max-w-sm">
          The requested clinic page could not be located.
        </p>
        <button
          onClick={() => setActiveRoute('/')}
          className="mt-6 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  const isAdminView = activeRoute.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Portfolio Showcase Demo Toolbar at Top */}
      <DemoToolbar />

      {/* Main Website Header (hidden when inside admin view for clean dashboard UX) */}
      {!isAdminView && <Header />}

      {/* Content Viewport */}
      <div className="flex-1 min-w-0">{renderContent()}</div>

      {/* Footer (hidden when inside admin view) */}
      {!isAdminView && <Footer />}

      {/* Mobile Fixed Quick Actions: Call | WhatsApp | Book */}
      <MobileQuickBar />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}
