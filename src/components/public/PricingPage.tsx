import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  ShieldCheck,
  Calendar,
  CreditCard,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setActiveRoute, setPreselectedServiceId } = useApp();
  const services = storageService.getServices();

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'Preventive & Diagnostics', label: 'Preventive & Hygiene' },
    { id: 'Cosmetic Dentistry', label: 'Cosmetic & Makeover' },
    { id: 'Orthodontics', label: 'Aligners & Braces' },
    { id: 'Endodontics', label: 'Root Canal' },
    { id: 'Implantology', label: 'Implants & Surgery' },
  ];

  const filtered = services.filter(s => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  const paymentOptions = [
    { title: 'Credit & Debit Cards', desc: 'Visa, MasterCard, PayPak accepted with instant POS receipts.' },
    { title: 'Digital Wallets', desc: 'Instant QR payment via Easypaisa and JazzCash at reception.' },
    { title: 'Direct Bank Transfer', desc: 'Online Raast / IBFT transfers with digital reconciliation.' },
    { title: '0% Installment Plans', desc: 'Available for Invisalign and multi-unit dental implants over 6–12 months.' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/60 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Honest & Transparent Dental Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Treatment Pricing & Packages
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            We believe in upfront pricing with zero hidden surcharges. All procedures include strict medical-grade autoclave sterilization and digital radiographs.
          </p>
          <div className="mt-3 text-xs text-slate-500 font-medium bg-slate-100 py-1.5 px-3 rounded-lg inline-block">
            * Final treatment fees depend on individual anatomical assessment and 3D digital diagnosis.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(srv => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-teal-400 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-teal-700 uppercase mb-2">
                  <span>{srv.category}</span>
                  <span className="text-slate-400 font-normal">~{srv.durationMinutes} min</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  {srv.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {srv.shortDescription}
                </p>

                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {srv.priceType === 'consultation_required' ? 'Fee Estimate' : 'Starting From'}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums mt-0.5">
                    {srv.priceType === 'consultation_required'
                      ? 'Consultation Required'
                      : `PKR ${srv.startingPrice.toLocaleString()}`}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Includes diagnostic consultation & digital sensors
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  {srv.benefits.slice(0, 3).map((b, bIdx) => (
                    <div key={bIdx} className="text-xs text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveRoute(`/services/${srv.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    setPreselectedServiceId(srv.id);
                    setActiveRoute('/appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors text-center shadow-xs"
                >
                  Book Visit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods & Insurance Support */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Payment Flexibility & Insurance Reimbursement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We provide itemized receipts with standard dental procedure codes for submission to corporate healthcare plans and private insurers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentOptions.map((opt, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                <CreditCard className="w-5 h-5 text-teal-700 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">{opt.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
