import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface CaseItem {
  id: string;
  category: string;
  title: string;
  treatment: string;
  duration: string;
  dentistName: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterGallery: React.FC = () => {
  const { setActiveRoute } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<Record<string, number>>({
    'case-1': 50,
    'case-2': 50,
    'case-3': 50,
    'case-4': 50,
  });

  const categories = [
    { id: 'all', label: 'All Cases' },
    { id: 'Whitening', label: 'Teeth Whitening' },
    { id: 'Cosmetic', label: 'Porcelain Veneers' },
    { id: 'Orthodontics', label: 'Clear Aligners' },
    { id: 'Restorative', label: 'Implants & Crowns' },
  ];

  const cases: CaseItem[] = [
    {
      id: 'case-1',
      category: 'Whitening',
      title: 'In-Clinic Cold-Light Enamel Whitening',
      treatment: 'In-Clinic Laser Teeth Whitening (3 Cycles)',
      duration: '60 Minutes',
      dentistName: 'Dr. Sarah Ahmed',
      description: 'Severe tobacco and coffee discoloration lifted by 7 shades using gentle cold-light photoactivation with zero nerve sensitivity.',
      beforeLabel: 'Baseline Shade A3.5',
      afterLabel: 'Post-Treatment Shade B1',
      beforeImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
      afterImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
    },
    {
      id: 'case-2',
      category: 'Cosmetic',
      title: 'Aesthetic Porcelain Smile Makeover (6 Units)',
      treatment: 'Micro-Thin E.max Ceramic Veneers',
      duration: '2 Clinical Visits',
      dentistName: 'Dr. Sarah Ahmed',
      description: 'Corrected central diastema (gap), uneven incisal wear, and intrinsic enamel fluorosis staining with ultra-conservative veneer preparations.',
      beforeLabel: 'Pre-Op Diastema & Wear',
      afterLabel: 'Handcrafted Ceramic Symmetry',
      beforeImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
      afterImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
    },
    {
      id: 'case-3',
      category: 'Orthodontics',
      title: 'Adult Crowding Correction via Clear Aligners',
      treatment: 'Invisalign Full Aligner Series',
      duration: '8 Months',
      dentistName: 'Dr. Ayesha Malik',
      description: 'Resolved severe lower anterior crowding and aligned the upper arch smile line without metal brackets or tooth extractions.',
      beforeLabel: 'Severe Lower Crowding',
      afterLabel: 'Harmonic Arch Alignment',
      beforeImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
      afterImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
    },
    {
      id: 'case-4',
      category: 'Restorative',
      title: 'Single-Tooth 3D Guided Implant & Zirconia Crown',
      treatment: 'Titanium Implant + Custom Abutment',
      duration: '10 Weeks Healing',
      dentistName: 'Dr. Hamza Khan',
      description: 'Restored fractured upper right central incisor with computer-guided surgical implant and layered zirconia aesthetic crown.',
      beforeLabel: 'Missing Fractured Incisor',
      afterLabel: 'Lifelike Zirconia Crown',
      beforeImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
      afterImage: '/src/assets/images/dental_smile_portrait_1791148478469.jpg',
    },
  ];

  const filtered = cases.filter(c => activeCategory === 'all' || c.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Documented Smile Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Real Results. Confident Smiles.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Explore authentic transformation cases treated by our dental specialists using modern conservative techniques.
          </p>
          <div className="mt-2 text-[11px] text-slate-400 font-medium">
            (Demo Portfolio Notice: Images and clinical case summaries are illustrative simulation cases)
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(item => {
            const pos = sliderPosition[item.id] ?? 50;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                {/* Interactive Split Comparison Visual */}
                <div className="relative aspect-16/10 overflow-hidden select-none bg-slate-900">
                  {/* Before side (underneath or left) */}
                  <img
                    src={item.beforeImage}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Simulated filtered Before image for difference demonstration */}
                  <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-white"
                    style={{ width: `${pos}%` }}
                  >
                    <img
                      src={item.afterImage}
                      alt="Before Transformation"
                      className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-150"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      {item.beforeLabel}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 bg-teal-800/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {item.afterLabel}
                  </div>

                  {/* Interactive Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={e =>
                      setSliderPosition(prev => ({
                        ...prev,
                        [item.id]: Number(e.target.value),
                      }))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Drag to compare before and after"
                  />

                  {/* Slider Divider Visual Line & Handle */}
                  <div
                    className="absolute top-0 bottom-0 pointer-events-none z-10 flex items-center justify-center -ml-3"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white shadow-lg border-2 border-teal-600 flex items-center justify-center text-[10px] font-bold text-teal-800">
                      ↔
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-teal-700 font-semibold mb-1">
                    <span>{item.treatment}</span>
                    <span className="text-slate-400 font-normal">{item.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span>Doctor: <strong>{item.dentistName}</strong></span>
                    <span className="text-teal-700 font-semibold cursor-pointer" onClick={() => setActiveRoute('/appointment')}>
                      Consult Doctor →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
