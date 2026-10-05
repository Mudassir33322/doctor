import React from 'react';
import { Award, Cpu, HeartHandshake, ShieldCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: Award,
      title: 'Experienced Dentists',
      description: 'Consultant specialists holding UK, European, and FCPS post-graduate credentials with verified clinical track records.',
    },
    {
      icon: Cpu,
      title: 'Modern Technology',
      description: 'Equipped with digital intraoral 3D scanners, surgical microscopes, and painless diode laser therapies.',
    },
    {
      icon: ShieldCheck,
      title: 'Personalized Treatment',
      description: 'Conservative, biology-first treatment plans custom-tailored to your unique facial geometry and oral health needs.',
    },
    {
      icon: HeartHandshake,
      title: 'Patient-First Care',
      description: 'Anxiety-free, gentle chairside manner with transparent pricing, guaranteed appointment times, and zero rush.',
    },
  ];

  return (
    <section className="py-14 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-teal-300 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
