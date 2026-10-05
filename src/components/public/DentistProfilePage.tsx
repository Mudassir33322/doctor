import React from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Award,
  Globe,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const DentistProfilePage: React.FC<{ slug: string }> = ({ slug }) => {
  const { setActiveRoute, setPreselectedDentistId } = useApp();
  const dentist = storageService.getDentistById(slug) || storageService.getDentists()[0];
  const allServices = storageService.getServices();

  if (!dentist) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-slate-800">Dentist Profile Not Found</h2>
        <button
          onClick={() => setActiveRoute('/dentists')}
          className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm"
        >
          Back to Dentists
        </button>
      </div>
    );
  }

  const handleBookDoctor = () => {
    setPreselectedDentistId(dentist.id);
    setActiveRoute('/appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => setActiveRoute('/')} className="hover:text-slate-900">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActiveRoute('/dentists')} className="hover:text-slate-900">
            Dentists
          </button>
          <span>/</span>
          <span className="text-teal-800 font-semibold truncate">{dentist.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Doctor Card & Quick Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 text-center">
              <img
                src={dentist.image}
                alt={dentist.name}
                className="w-32 h-32 rounded-2xl object-cover mx-auto mb-4 border-2 border-teal-500/30 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <h1 className="text-xl font-bold text-slate-900 font-display">{dentist.name}</h1>
              <div className="text-xs font-semibold text-teal-700 mt-1">{dentist.specialty}</div>
              <div className="text-xs text-slate-500 mt-0.5">{dentist.title}</div>

              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{dentist.rating}</span>
                <span className="text-slate-400">({dentist.reviewCount} verified patient reviews)</span>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={handleBookDoctor}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-teal-200" />
                  <span>Book Appointment with {dentist.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>

            {/* Quick Details Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs text-slate-600">
              <h3 className="font-bold text-slate-900 text-sm font-display">Practice Details</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Qualification:</span>
                    <span>{dentist.qualification}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Working Hours:</span>
                    <span>
                      {dentist.workingHours.start} - {dentist.workingHours.end}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Days: {dentist.workingDays.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Location:</span>
                    <span>{dentist.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Languages Spoken:</span>
                    <span>{dentist.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Treatments, Available Slots */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
                Professional Biography
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {dentist.bio}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                With {dentist.experienceYears}+ years of clinical leadership, {dentist.name} integrates digital intraoral scanning, computerized occlusal analysis, and minimally invasive techniques to guarantee patient comfort and exceptional biological longevity.
              </p>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 font-display mb-4">
                Treatments Offered by {dentist.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allServices
                  .filter(s => dentist.servicesOffered.includes(s.id))
                  .map(srv => (
                    <div
                      key={srv.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-teal-300 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {srv.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          ~{srv.durationMinutes} min · {srv.priceType === 'consultation_required' ? 'Assessment Req.' : `From PKR ${srv.startingPrice.toLocaleString()}`}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveRoute(`/services/${srv.slug}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-teal-700 hover:underline text-xs font-semibold shrink-0"
                      >
                        Details →
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Direct Booking CTA Banner */}
            <div className="bg-teal-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div>
                <h3 className="text-xl font-bold font-display">
                  Schedule Your Consultation with {dentist.name}
                </h3>
                <p className="text-xs sm:text-sm text-teal-200 mt-1 max-w-md">
                  Guaranteed appointment slots available this week. Zero wait time for confirmed bookings.
                </p>
              </div>
              <button
                onClick={handleBookDoctor}
                className="px-6 py-3 bg-white text-teal-900 font-bold rounded-xl text-xs hover:bg-teal-50 transition-colors shrink-0 shadow-sm"
              >
                Reserve Slot Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
