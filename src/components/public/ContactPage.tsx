import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { cmsConfig, addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast('error', 'Please enter your name and phone number.');
      return;
    }

    storageService.addLead({
      name,
      phone,
      email,
      source: 'contact_form',
      status: 'new',
      serviceInterested: service,
      notes: message ? `Contact Form Inquiry: "${message}"` : 'Website contact inquiry',
    });

    setSubmitted(true);
    addToast('success', 'Message sent successfully!', 'Our dental coordinator will contact you shortly.');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Contact SMILORA Dental Care
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about an upcoming procedure, want to schedule a visit, or need emergency assistance? We are here for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Clinic Locations & Hours
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Gulberg Main Branch</strong>
                    <span className="text-slate-600 text-xs">{cmsConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">DHA Phase 5 Branch</strong>
                    <span className="text-slate-600 text-xs">{cmsConfig.branchWestAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Operating Hours</strong>
                    <span className="text-slate-600 text-xs">{cmsConfig.openingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Touchpoints */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={`tel:${cmsConfig.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px]">Reception Desk</span>
                    <strong className="text-slate-900">{cmsConfig.phone}</strong>
                  </div>
                </a>

                <a
                  href={`tel:${cmsConfig.emergencyPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-900 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <div className="text-xs">
                    <span className="text-rose-600 block text-[10px] font-semibold">24/7 Dental Emergency</span>
                    <strong>{cmsConfig.emergencyPhone}</strong>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${cmsConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-900 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <div className="text-xs">
                    <span className="text-emerald-700 block text-[10px] font-semibold">WhatsApp Chat</span>
                    <strong>{cmsConfig.whatsapp}</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your inquiry has been registered in our CRM patient queue. A clinical coordinator will phone or WhatsApp you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h2 className="text-xl font-bold text-slate-900 font-display">
                      Send Us an Inquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill out the form below and we will respond within 2 working hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Omar Farooq"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Treatment of Interest
                      </label>
                      <select
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                      >
                        <option>General Dental Checkup</option>
                        <option>Professional Teeth Cleaning</option>
                        <option>In-Clinic Laser Whitening</option>
                        <option>Invisalign Clear Aligners</option>
                        <option>Dental Implants</option>
                        <option>Root Canal Treatment</option>
                        <option>Porcelain Veneers Makeover</option>
                        <option>Emergency Toothache</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message / Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your dental concerns, preferred consultation timing, or specific questions..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4 text-teal-200" />
                      <span>Send Clinical Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
