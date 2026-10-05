import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, ChevronDown, Calendar, MessageSquare } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { setActiveRoute, cmsConfig } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('General');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqData: Record<string, { q: string; a: string }[]> = {
    General: [
      {
        q: 'Where are your clinics located in Lahore?',
        a: `We operate two flagship practices: Suite 402, Al-Hafeez Heights, Gulberg III, and Phase 5 Commercial Avenue in DHA. Both branches feature dedicated patient parking and state-of-the-art sterile surgical operatories.`,
      },
      {
        q: 'What are your clinic operating hours?',
        a: `We are open Monday through Saturday from 9:00 AM to 9:00 PM, and Sundays from 11:00 AM to 5:00 PM for scheduled consultations and emergency walk-ins.`,
      },
      {
        q: 'Do you treat patients with severe dental anxiety or dental phobia?',
        a: `Yes, patient comfort is our highest priority. We offer calming ambient lighting, noise-canceling headphones, computer-assisted painless local anesthesia, and gentle tell-show-do communication.`,
      },
    ],
    Appointments: [
      {
        q: 'How far in advance should I book my appointment?',
        a: `For routine examinations and teeth cleanings, 24 to 48 hours notice is typical. However, same-day guaranteed slots are always kept open for urgent dental emergencies and severe pain.`,
      },
      {
        q: 'Can I reschedule or cancel my appointment online?',
        a: `Yes, you can easily reschedule or cancel through your SMILORA Patient Portal or by replying to your confirmation WhatsApp/SMS message at least 4 hours before your slot.`,
      },
      {
        q: 'What happens if I arrive late for my appointment?',
        a: `We offer a 10-minute grace period. If you anticipate delays, please notify our reception desk via phone or WhatsApp so we can adjust our schedule or accommodate you seamlessly.`,
      },
    ],
    Treatments: [
      {
        q: 'Are microscopic root canal treatments painful?',
        a: `No. Under modern computer-regulated local anesthesia, a root canal feels no different than having a routine composite filling placed. It relieves acute infection rather than causing pain.`,
      },
      {
        q: 'Am I a candidate for Invisalign clear aligners?',
        a: `Most mild to complex crowding, spacing, and crossbite cases can be treated effectively with clear aligners. Dr. Ayesha Malik will perform a 3D digital iTero scan to show you a simulated final smile outcome before you begin.`,
      },
      {
        q: 'How long do dental implants last?',
        a: `With proper oral hygiene and routine 6-month checkups, dental implants have a clinical success rate exceeding 98% and routinely last a lifetime.`,
      },
    ],
    Payments: [
      {
        q: 'What payment methods do you accept at the clinic?',
        a: `We accept Cash, all major Credit/Debit Cards (Visa, MasterCard, PayPak), direct Bank Transfers (IBFT/Raast), and mobile wallets including Easypaisa and JazzCash.`,
      },
      {
        q: 'Do you offer installment plans for major dental work?',
        a: `Yes, we provide interest-free 6-to-12-month installment payment schedules for comprehensive treatments like clear aligners, full-arch dental implants, and porcelain smile makeovers.`,
      },
      {
        q: 'Can I get an official invoice for medical insurance reimbursement?',
        a: `Yes, our digital front desk automatically generates detailed itemized invoices stamped with international dental procedure codes for reimbursement through corporate health plans.`,
      },
    ],
    Emergency: [
      {
        q: 'What qualifies as an urgent dental emergency?',
        a: `Severe throbbing tooth pain, uncontrolled gum bleeding, a knocked-out permanent tooth, facial or jaw swelling, or a traumatic tooth fracture qualify as urgent emergencies.`,
      },
      {
        q: 'What should I do if my permanent tooth is completely knocked out?',
        a: `Do not scrub the root. Gently rinse with milk or saline if dirty, place it back into the socket if possible, or keep it submerged in cold milk and reach our emergency clinic within 60 minutes for the highest chance of saving the tooth.`,
      },
    ],
    'New Patients': [
      {
        q: 'What should I bring to my first visit at SMILORA?',
        a: `Please bring a valid photo ID, your list of current medications or allergies, and any recent dental radiographs (X-rays) if available within the past 6 months.`,
      },
      {
        q: 'Can I complete my new patient registration forms online before arriving?',
        a: `Yes! Once you book your appointment, you will receive access to your Patient Portal where you can fill out medical history, dental concerns, and consent forms digitally from home.`,
      },
    ],
  };

  const categories = Object.keys(faqData);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Patient Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to know about our dental treatments, clinic safety protocols, booking, and financing.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqData[activeCategory].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:bg-slate-50/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openIdx === idx ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Still have questions about your smile?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Our friendly dental front desk team is ready to assist you via phone or WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setActiveRoute('/appointment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs"
            >
              <Calendar className="w-4 h-4 text-teal-200" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
