import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { setActiveRoute, setPreselectedServiceId } = useApp();
  const service = storageService.getServiceBySlug(slug) || storageService.getServices()[0];
  const allServices = storageService.getServices().filter(s => s.id !== service.id);

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!service) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <button
          onClick={() => setActiveRoute('/services')}
          className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm"
        >
          Back to Services
        </button>
      </div>
    );
  }

  const handleBookThisService = () => {
    setPreselectedServiceId(service.id);
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
          <button onClick={() => setActiveRoute('/services')} className="hover:text-slate-900">
            Services
          </button>
          <span>/</span>
          <span className="text-teal-800 font-semibold truncate">{service.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              {service.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.shortDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>
                  Duration: <strong>~{service.durationMinutes} Minutes</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>
                  Pricing:{' '}
                  <strong>
                    {service.priceType === 'consultation_required'
                      ? 'Consultation Required'
                      : `Starting from PKR ${service.startingPrice.toLocaleString()}`}
                  </strong>
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleBookThisService}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-xs text-sm"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book This Treatment</span>
              </button>
              <button
                onClick={() => {
                  setActiveRoute('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
                Treatment Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display mb-4">
                Key Patient Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Treatment Process */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 font-display mb-1">
                Clinical Treatment Process
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                What to expect during your appointment at SMILORA Dental Care.
              </p>

              <div className="space-y-6">
                {service.processSteps.map((stepItem, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {stepItem.step}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{stepItem.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is it for? */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-base font-bold text-slate-900 font-display mb-2">
                Who Is This Treatment Designed For?
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                This clinical procedure is suitable for adult patients or teens seeking long-lasting oral wellness, functional comfort, or aesthetic smile enhancement. Before beginning any procedure, our specialists conduct a 3D digital diagnosis to verify that your underlying bone, enamel, and gum tissues are primed for optimal results.
              </p>
            </div>

            {/* Service-Specific FAQs */}
            {service.faqs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            openFaqIdx === idx ? 'rotate-180 text-teal-700' : ''
                          }`}
                        />
                      </button>
                      {openFaqIdx === idx && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Booking Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Ready for Your Smile Assessment?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reserve your slot with our specialist. Same-day appointments available for urgent situations.
              </p>

              <div className="p-3.5 bg-teal-50/70 border border-teal-200/50 rounded-xl text-xs text-teal-900 space-y-1">
                <div className="font-semibold">Transparent Healthcare Policy</div>
                <div className="text-[11px] text-teal-800">
                  {service.priceType === 'consultation_required'
                    ? 'Fees finalized following physical 3D diagnostic assessment.'
                    : `Base fee starts from PKR ${service.startingPrice.toLocaleString()}. Includes complete sterilization protocol.`}
                </div>
              </div>

              <button
                onClick={handleBookThisService}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book Appointment Online</span>
              </button>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-700 mb-2">Related Treatments:</div>
                <div className="space-y-2">
                  {allServices.slice(0, 4).map(rel => (
                    <button
                      key={rel.id}
                      onClick={() => {
                        setActiveRoute(`/services/${rel.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full text-left text-xs text-slate-600 hover:text-teal-700 flex items-center justify-between py-1 group"
                    >
                      <span className="truncate">{rel.name}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
