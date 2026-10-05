import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { setActiveRoute } = useApp();

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <button
          onClick={() => setActiveRoute('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 w-fit mb-4">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>{type === 'privacy' ? 'Data Privacy & HIPAA Compliance' : 'Clinic Terms of Service'}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-6">
          {type === 'privacy' ? 'SMILORA Privacy & Clinical Data Policy' : 'Terms of Healthcare Treatment'}
        </h1>

        <div className="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          <p>
            Welcome to SMILORA Dental Care. This statement delineates our commitments regarding patient health privacy, digital appointment management, confidentiality, and electronic records security.
          </p>

          <h3 className="text-base font-bold text-slate-900 font-display pt-2">
            1. Confidentiality of Health Records
          </h3>
          <p>
            All electronic dental radiographs, clinical examination notes, and intraoral photography captured during consultations are stored securely and treated with strict medical confidentiality. Records are never disclosed to third parties without prior informed written patient authorization.
          </p>

          <h3 className="text-base font-bold text-slate-900 font-display pt-2">
            2. Appointment Scheduling & Cancellation Policy
          </h3>
          <p>
            To respect the time of our dental surgical teams and fellow patients, cancellations or reschedule requests must be communicated at least four (4) hours prior to the scheduled appointment slot via the Patient Portal, phone, or WhatsApp.
          </p>

          <h3 className="text-base font-bold text-slate-900 font-display pt-2">
            3. Treatment Consent & Financial Transparency
          </h3>
          <p>
            Prior to the execution of invasive restorative, surgical, or orthodontic procedures, patients are presented with an itemized treatment estimate detailing procedure codes, estimated visits, and fee breakdowns.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-100 text-[11px] text-slate-400">
            Portfolio Demo Notice: This legal page is provided for software demonstration and user journey completion in the agency showcase build.
          </div>
        </div>
      </div>
    </div>
  );
};
