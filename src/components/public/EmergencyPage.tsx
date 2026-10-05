import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageSquare, AlertTriangle, ShieldAlert, Clock, CheckCircle2, Calendar } from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { setActiveRoute, setPreselectedServiceId, cmsConfig } = useApp();

  const emergencyCases = [
    {
      title: 'Knocked-Out Permanent Tooth (Avulsion)',
      action: 'Do NOT touch the tooth root. Gently rinse with milk or saline if dirty. Place back into socket if possible or store inside cold milk. Seek clinic care within 60 minutes.',
      severity: 'Critical (Under 1 hour)',
    },
    {
      title: 'Severe Throbbing Toothache or Abscess',
      action: 'Rinse with warm salt water. Gently floss to dislodge trapped food. Never place aspirin directly against the gum tissue. Call our emergency doctor immediately.',
      severity: 'High Priority (Same Day)',
    },
    {
      title: 'Chipped or Broken Enamel',
      action: 'Collect broken tooth fragments in a clean container with milk. Apply cold compress externally to reduce facial swelling. Avoid chewing on that quadrant.',
      severity: 'Urgent (Within 24 Hours)',
    },
    {
      title: 'Lost Crown or Filling',
      action: 'Keep the crown safe and bring it to your visit. Avoid hard chewing. Temporary dental cement can provide short-term coverage until your dentist visit.',
      severity: 'Moderate Priority',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-rose-900 text-rose-100 py-3 px-4 text-xs font-semibold text-center border-b border-rose-800">
        <span>Emergency Dental Hotline Available 24/7 · Rapid Same-Day Urgent Slots Held Daily</span>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Same-Day Emergency Dental Care</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              Dental Emergency? We're Here to Help.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Dental pain and sudden trauma require immediate professional attention. Our clinic reserves dedicated emergency slots every day to provide fast relief, stop infections, and protect your teeth.
            </p>

            {/* Direct Urgent Hotlines */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${cmsConfig.emergencyPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-rose-700 hover:bg-rose-800 transition-all shadow-md text-sm active:scale-95"
              >
                <Phone className="w-4 h-4 text-rose-200" />
                <span>Call Emergency Line: {cmsConfig.emergencyPhone}</span>
              </a>

              <a
                href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}?text=URGENT%20DENTAL%20EMERGENCY`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Urgent WhatsApp Triage</span>
              </a>

              <button
                onClick={() => {
                  setPreselectedServiceId('srv-emergency');
                  setActiveRoute('/appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-xl font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
              >
                Book Priority Emergency Slot
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Triage Scenarios */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-6">
          Common Dental Emergencies & Immediate Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {emergencyCases.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-base font-display">{item.title}</h3>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 shrink-0">
                  {item.severity}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.action}
              </p>
            </div>
          ))}
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-6 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 space-y-1">
            <h4 className="font-bold">Important Medical Emergency Disclaimer</h4>
            <p className="leading-relaxed">
              For acute life-threatening situations — including uncontrolled hemorrhage, major facial fractures, loss of consciousness, or swelling that impairs breathing or swallowing — please proceed immediately to the nearest hospital trauma emergency room or call 1122.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
