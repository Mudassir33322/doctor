import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  Clock,
  ArrowRight,
  Calendar,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Smile,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export const ServicesSection: React.FC<{ limit?: number; showHeader?: boolean }> = ({
  limit,
  showHeader = true,
}) => {
  const { setActiveRoute, setPreselectedServiceId } = useApp();
  const allServices = storageService.getServices().filter(s => s.active);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Preventive & Diagnostics', label: 'Preventive & Hygiene' },
    { id: 'Cosmetic Dentistry', label: 'Cosmetic & Whitening' },
    { id: 'Orthodontics', label: 'Braces & Aligners' },
    { id: 'Endodontics', label: 'Root Canal' },
    { id: 'Implantology', label: 'Dental Implants' },
    { id: 'Restorative Dentistry', label: 'Crowns & Fillings' },
    { id: 'Pediatric Care', label: 'Kids Dentistry' },
    { id: 'Emergency Care', label: 'Emergency' },
  ];

  const filtered = allServices.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const displayedServices = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Specialized Treatments
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Complete Dental Care Under One Roof
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Every service is delivered by specialized dental practitioners using evidence-based protocols and digital precision diagnostics.
              </p>
            </div>

            {limit && (
              <button
                onClick={() => {
                  setActiveRoute('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
              >
                <span>View All 16 Services</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Filter Bar (buttons with handlers as allowed by constitution) */}
        {!limit && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map(service => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-teal-400 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{service.durationMinutes} min</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-teal-800 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Benefits sneak-peek */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                    <div key={bIdx} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions and Price */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {service.priceType === 'consultation_required' ? 'Fee Type' : 'Starting From'}
                  </div>
                  <div className="text-sm font-bold text-slate-900 tabular-nums">
                    {service.priceType === 'consultation_required'
                      ? 'Consultation Req.'
                      : `PKR ${service.startingPrice.toLocaleString()}`}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveRoute(`/services/${service.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="View treatment details"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => {
                      setPreselectedServiceId(service.id);
                      setActiveRoute('/appointment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-2xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
