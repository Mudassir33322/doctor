import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveRoute, setCurrentRole, cmsConfig, setAdminActiveTab } = useApp();

  const handleNav = (route: string) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-20 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Clinic Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                SMILORA
              </span>
              <p className="text-teal-400 font-medium text-xs tracking-wider uppercase">
                {cmsConfig.tagline}
              </p>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Providing modern, compassionate, and minimally invasive dental healthcare. From preventive hygiene and pediatric dentistry to 3D guided dental implants and cosmetic porcelain smile design.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{cmsConfig.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{cmsConfig.branchWestAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{cmsConfig.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Key Treatments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/services/dental-checkup')} className="hover:text-teal-300 transition-colors">
                  Digital Dental Checkup
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/teeth-cleaning')} className="hover:text-teal-300 transition-colors">
                  Ultrasonic Teeth Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/teeth-whitening')} className="hover:text-teal-300 transition-colors">
                  Laser Teeth Whitening
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/clear-aligners')} className="hover:text-teal-300 transition-colors">
                  Invisalign Clear Aligners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/dental-implants')} className="hover:text-teal-300 transition-colors">
                  3D Guided Implants
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/root-canal-treatment')} className="hover:text-teal-300 transition-colors">
                  Microscopic Root Canal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services/cosmetic-dentistry')} className="hover:text-teal-300 transition-colors">
                  Porcelain Smile Makeover
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="text-teal-400 hover:underline">
                  View All 16 Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Patient Portal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Patient Portal & Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-teal-300 transition-colors">
                  About Our Practice
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/dentists')} className="hover:text-teal-300 transition-colors">
                  Our Dental Specialists
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/before-after')} className="hover:text-teal-300 transition-colors">
                  Smile Transformation Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/pricing')} className="hover:text-teal-300 transition-colors">
                  Transparent Treatment Fees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/faq')} className="hover:text-teal-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/emergency')} className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
                  <span>Emergency Dental Care</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('/patient');
                    setCurrentRole('patient');
                  }}
                  className="text-teal-400 hover:underline font-medium"
                >
                  Sign In to Patient Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Operations Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Clinic Direct Lines
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Appointments Desk</div>
                  <div className="font-semibold">{cmsConfig.phone}</div>
                </div>
              </a>

              <a
                href={`tel:${cmsConfig.emergencyPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 hover:bg-rose-950/60 text-rose-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-rose-300">24/7 Emergency Line</div>
                  <div className="font-semibold">{cmsConfig.emergencyPhone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 hover:bg-emerald-950/60 text-emerald-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-emerald-300">WhatsApp Live Chat</div>
                  <div className="font-semibold">{cmsConfig.whatsapp}</div>
                </div>
              </a>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveRoute('/admin');
                    setAdminActiveTab('dashboard');
                    setCurrentRole('super_admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-center py-2 px-3 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Clinic Admin Portal Login →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio & Legal Strip */}
        <div className="border-t border-slate-800 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <span>
              &copy; {new Date().getFullYear()} SMILORA Dental Care. All patient/clinical records shown are fictional demo entities for agency portfolio demonstration.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/terms')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNav('/emergency')} className="hover:text-slate-300 transition-colors">
              Urgent Care Protocol
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
