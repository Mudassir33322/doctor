import React from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Star, Clock, MapPin, Calendar, ArrowRight, Award } from 'lucide-react';

export const DentistsSection: React.FC<{ limit?: number; showHeader?: boolean }> = ({
  limit,
  showHeader = true,
}) => {
  const { setActiveRoute, setPreselectedDentistId } = useApp();
  const dentists = storageService.getDentists().filter(d => d.status === 'active');
  const displayed = limit ? dentists.slice(0, limit) : dentists;

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                Specialist Team
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Meet Our Experienced Dental Specialists
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Our clinicians hold recognized fellowships and international certifications across orthodontics, oral surgery, endodontics, and aesthetic smile design.
              </p>
            </div>

            {limit && (
              <button
                onClick={() => {
                  setActiveRoute('/dentists');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
              >
                <span>View All Specialists</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map(dentist => (
            <div
              key={dentist.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dentist.rating}</span>
                    <span className="text-slate-400 text-[10px]">({dentist.reviewCount})</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-teal-700 mb-1">
                    {dentist.specialty}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {dentist.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {dentist.title}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {dentist.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{dentist.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dentist.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{dentist.workingDays.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveRoute(`/dentists/${dentist.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setPreselectedDentistId(dentist.id);
                    setActiveRoute('/appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
