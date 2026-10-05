import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Star, CheckCircle, Plus, Sparkles, MessageSquare, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { addToast } = useApp();
  const reviews = storageService.getReviews().filter(r => r.status === 'approved');

  const [modalOpen, setModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [serviceName, setServiceName] = useState('In-Clinic Laser Teeth Whitening');
  const [dentistName, setDentistName] = useState('Dr. Sarah Ahmed');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const services = storageService.getServices();
  const dentists = storageService.getDentists();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !comment) {
      addToast('error', 'Please fill in your name and feedback.');
      return;
    }

    storageService.addReview({
      patientName,
      serviceName,
      dentistName,
      rating,
      comment,
      featured: false,
    });

    addToast('success', 'Review submitted!', 'Thank you! Your feedback has been sent for admin review.');
    setModalOpen(false);
    setPatientName('');
    setComment('');
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              Patient Experiences
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Trusted by Over 15,000 Happy Smiles
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Real reflections from patients who experienced our gentle techniques, modern operatories, and compassionate care.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xl font-extrabold text-slate-900 font-display tabular-nums">
                4.95 / 5.0
              </div>
              <div className="text-[10px] text-slate-500">Verified Patient Rating</div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 tabular-nums">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{rev.patientName}</div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[170px]">
                    {rev.serviceName}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
                  <CheckCircle className="w-3 h-3 text-teal-600" />
                  <span>Verified Patient</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Demo data notice: Testimonials are illustrative patient entries for agency portfolio presentation.
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Share Your SMILORA Experience
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name (or Initials) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omar F."
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Treatment Received
                  </label>
                  <select
                    value={serviceName}
                    onChange={e => setServiceName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attending Dentist
                  </label>
                  <select
                    value={dentistName}
                    onChange={e => setDentistName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  >
                    {dentists.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(starVal => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 ml-2">{rating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about your visit, doctor's gentleness, and results..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
