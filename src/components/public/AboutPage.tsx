import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, HeartHandshake, Award, Cpu, Users, ArrowRight, Calendar } from 'lucide-react';
import { DentistsSection } from './DentistsSection';

export const AboutPage: React.FC = () => {
  const { setActiveRoute } = useApp();

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
            About SMILORA
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            A Modern Vision for Compassionate Dental Healthcare
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with the belief that visiting the dentist should feel calming, dignified, and scientifically precise. We combine international specialist training with low-stress, minimally invasive patient care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Our Story & Clinical Philosophy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              SMILORA Dental Care was established to bridge the gap between impersonal, high-stress clinic environments and world-class dental engineering. Too often, patients avoid essential oral care due to fear, outdated noisy equipment, or hidden fees.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We reimagined every touchpoint: from our spa-like reception lounges and ultra-quiet electric handpieces to digital 3D intraoral mapping that lets you see your teeth exactly as your clinician sees them on high-definition displays.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-teal-700 block text-lg font-bold font-display">100%</span>
                <span>Mercury-Free Composite Restorations</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-teal-700 block text-lg font-bold font-display">0-Delay</span>
                <span>Guaranteed Appointment Scheduling</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-4/3 bg-slate-100">
            <img
              src="/assets/images/dental_technology_clinic_1791148510349.jpg"
              alt="High-Tech Dental Operatory at SMILORA"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 font-display text-center mb-8">
            The Four Pillars of SMILORA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Conservative Biology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We preserve natural tooth enamel and pulp whenever biologically possible, avoiding aggressive overtreatment.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Digital Precision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Intraoral scanners, 3D CBCT imaging, and digital smile design eliminate messy impression goo and human guesswork.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Strict Sterilization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hospital-grade autoclave class-B sterilization, pouch tracking barcodes, and sterile waterlines for every patient.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Transparent Integrity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full digital estimates provided prior to starting treatment. Zero unexpected surprise bills at check-out.
              </p>
            </div>
          </div>
        </div>

        {/* Dentists Team Embed */}
        <DentistsSection showHeader={true} />

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Start Your Smile Journey with SMILORA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
            Experience modern, comfortable, pain-free dentistry tailored around you. Same-day appointments available for new patients.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveRoute('/appointment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4 text-teal-200" />
              <span>Book Your First Visit</span>
            </button>
            <button
              onClick={() => {
                setActiveRoute('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
            >
              Explore Treatments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
