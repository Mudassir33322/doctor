import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Phone, MessageSquare, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveRoute, cmsConfig } = useApp();

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Trusted Dental Care · Modern Technology · Experienced Dentists</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-display text-balance">
              {cmsConfig.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {cmsConfig.heroSubheadline}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveRoute('/appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-md hover:shadow-lg active:scale-98 text-sm"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-teal-200 ml-1" />
              </button>

              <button
                onClick={() => {
                  setActiveRoute('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors text-sm"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <a
                href={`tel:${cmsConfig.emergencyPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-800 font-semibold"
              >
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Emergency: {cmsConfig.emergencyPhone}</span>
              </a>

              <a
                href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp Instant Consultation</span>
              </a>
            </div>

            {/* Quick Proof Metrics adjacent to hero */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">15,000+</div>
                <div className="text-xs text-slate-500 mt-0.5">Smiles Restored</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">4.95 / 5</div>
                <div className="text-xs text-slate-500 mt-0.5">Patient Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Sterile Operatories</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-100 aspect-16/11 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_dental_care_1791148458507.jpg"
                alt="SMILORA Modern Dental Clinic Operatory"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating feature label at bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/40 shadow-md flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Gulberg & DHA Practice Suites</div>
                  <div className="text-slate-500 text-[11px]">Equipped with 3D CBCT & Painless Laser Care</div>
                </div>
                <button
                  onClick={() => {
                    setActiveRoute('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-teal-700 font-bold hover:underline shrink-0"
                >
                  Tour Clinic →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
