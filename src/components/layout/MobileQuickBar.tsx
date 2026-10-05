import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  const { activeRoute, setActiveRoute, cmsConfig } = useApp();

  // Show only on public routes and not when inside admin/dentist/patient dashboard
  const isPublicRoute =
    !activeRoute.startsWith('/admin') &&
    !activeRoute.startsWith('/dentist') &&
    !activeRoute.startsWith('/patient');

  if (!isPublicRoute) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 text-slate-700 hover:text-teal-700 rounded-lg active:bg-slate-100 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-600 mb-0.5" />
          <span className="text-[11px] font-semibold">Call Now</span>
        </a>

        <a
          href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20SMILORA%20Dental%20Care,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 text-emerald-800 hover:text-emerald-900 rounded-lg active:bg-emerald-50 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <button
          onClick={() => {
            setActiveRoute('/appointment');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg active:scale-95 transition-all shadow-xs"
        >
          <Calendar className="w-4 h-4 text-teal-200 mb-0.5" />
          <span className="text-[11px] font-bold">Book Visit</span>
        </button>
      </div>
    </div>
  );
};
