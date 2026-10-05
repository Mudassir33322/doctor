import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  Stethoscope,
  ChevronRight,
  X,
  Search,
  Check,
} from 'lucide-react';
import { Appointment, TreatmentPlan } from '../../types';

export const DentistPortal: React.FC = () => {
  const { addToast } = useApp();
  const currentDentist = storageService.getDentistById('dent-1') || storageService.getDentists()[0];

  const [filterPeriod, setFilterPeriod] = useState<'today' | 'upcoming' | 'all'>('today');
  const [appointments, setAppointments] = useState<Appointment[]>(
    storageService.getAppointments().filter(a => a.dentistId === currentDentist.id)
  );

  // Clinical note modal state
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [examFindings, setExamFindings] = useState('');
  const [treatmentPerformed, setTreatmentPerformed] = useState('');
  const [prescription, setPrescription] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Treatment plan modal state
  const [tpModalOpen, setTpModalOpen] = useState(false);
  const [tpPatientName, setTpPatientName] = useState('Omar Farooq');
  const [tpTitle, setTpTitle] = useState('Anterior Aesthetic Makeover');
  const [tpDiagnosis, setTpDiagnosis] = useState('Enamel wear and incisal chipping');
  const [tpCost, setTpCost] = useState('65000');
  const [tpVisits, setTpVisits] = useState('3');

  const reloadAppointments = () => {
    setAppointments(storageService.getAppointments().filter(a => a.dentistId === currentDentist.id));
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    storageService.updateAppointmentStatus(id, newStatus);
    reloadAppointments();
    addToast('success', `Status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleSaveClinicalNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppointment) return;

    // Mark appointment as completed
    storageService.updateAppointmentStatus(
      activeAppointment.id,
      'completed',
      `Clinical Note: ${treatmentPerformed}`
    );

    // If follow-up requested, create follow-up
    if (followUpDate) {
      storageService.createFollowUp({
        patientId: activeAppointment.patientId,
        patientName: activeAppointment.patientName,
        patientPhone: activeAppointment.patientPhone,
        type: 'treatment_follow_up',
        dueDate: followUpDate,
        dentistId: currentDentist.id,
        dentistName: currentDentist.name,
        status: 'pending',
        notes: `Follow-up for ${activeAppointment.serviceName}: ${treatmentPerformed}`,
      });
    }

    addToast('success', 'Clinical visit documentation saved', 'Patient EHR record updated.');
    setNoteModalOpen(false);
    setActiveAppointment(null);
    reloadAppointments();
  };

  const handleCreateTreatmentPlan = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.createTreatmentPlan({
      patientId: 'pat-1',
      patientName: tpPatientName,
      dentistId: currentDentist.id,
      dentistName: currentDentist.name,
      title: tpTitle,
      diagnosis: tpDiagnosis,
      totalCost: Number(tpCost),
      numberOfVisits: Number(tpVisits),
      completedVisits: 0,
      status: 'proposed',
      items: [
        { id: 'item-1', procedureName: '3D Diagnostic Digital Scan & Mockup', estimatedCost: 10000, status: 'pending' },
        { id: 'item-2', procedureName: 'Tooth Preparation & Temporary Veneers', estimatedCost: 25000, status: 'pending' },
        { id: 'item-3', procedureName: 'Final Porcelain Bonding & Verification', estimatedCost: 30000, status: 'pending' },
      ],
      notes: 'Proposed during routine consultation.',
    });

    addToast('success', 'Treatment plan created!', 'Plan is now visible to patient and reception.');
    setTpModalOpen(false);
  };

  const todayStr = '2026-10-04';
  const todayAppointments = appointments.filter(a => a.date === todayStr);

  const displayedList =
    filterPeriod === 'today'
      ? todayAppointments
      : filterPeriod === 'upcoming'
      ? appointments.filter(a => a.date >= todayStr)
      : appointments;

  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const inConsultationCount = appointments.filter(a => a.status === 'in_consultation').length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Clinician Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentDentist.image}
              alt={currentDentist.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/40 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  {currentDentist.name}
                </h1>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Doctor Operatory View
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {currentDentist.specialty} · {currentDentist.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTpModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-teal-800 bg-teal-50 border border-teal-200 text-xs hover:bg-teal-100 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Treatment Plan</span>
            </button>
          </div>
        </div>

        {/* Doctor KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block mb-1">Today's Patients</span>
            <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
              {todayAppointments.length}
            </div>
            <span className="text-[11px] text-teal-700 font-medium">Scheduled for Oct 04</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block mb-1">In Operatory Now</span>
            <div className="text-2xl font-bold text-teal-700 font-display tabular-nums">
              {inConsultationCount}
            </div>
            <span className="text-[11px] text-slate-500">Currently in chair</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block mb-1">Completed Today</span>
            <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
              {completedCount}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Documented visits</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block mb-1">Total Patient Base</span>
            <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
              {appointments.length}
            </div>
            <span className="text-[11px] text-slate-500">All registered appointments</span>
          </div>
        </div>

        {/* Clinical Patient Schedule Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Operatory Patient Queue & Clinical Workflow
              </h2>
              <p className="text-xs text-slate-500">
                Update patient workflow from Check-In to In-Consultation and Record Clinical Visit Notes.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setFilterPeriod('today')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterPeriod === 'today' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today Only ({todayAppointments.length})
              </button>
              <button
                onClick={() => setFilterPeriod('upcoming')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterPeriod === 'upcoming' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterPeriod('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterPeriod === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Records
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4 font-semibold">Slot & Date</th>
                  <th className="py-3 px-4 font-semibold">Patient Name</th>
                  <th className="py-3 px-4 font-semibold">Treatment</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedList.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 tabular-nums font-semibold text-slate-900">
                      <div>{apt.timeSlot}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{apt.date}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div>{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{apt.patientPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div>{apt.serviceName}</div>
                      {apt.reason && (
                        <div className="text-[10px] text-slate-400 italic line-clamp-1">"{apt.reason}"</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          apt.status === 'in_consultation'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : apt.status === 'checked_in'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : apt.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : apt.status === 'no_show'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {apt.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'checked_in')}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold"
                        >
                          Check In
                        </button>
                      )}

                      {apt.status === 'checked_in' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'in_consultation')}
                          className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 rounded-lg"
                        >
                          Seat in Chair
                        </button>
                      )}

                      {apt.status === 'in_consultation' && (
                        <button
                          onClick={() => {
                            setActiveAppointment(apt);
                            setTreatmentPerformed(`Completed ${apt.serviceName}`);
                            setNoteModalOpen(true);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-2xs"
                        >
                          Finish & Document
                        </button>
                      )}

                      {apt.status === 'completed' && (
                        <span className="text-emerald-700 font-semibold text-[11px]">
                          ✓ Charted
                        </span>
                      )}

                      {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'no_show')}
                          className="text-slate-400 hover:text-rose-600 text-[11px]"
                        >
                          Mark No-Show
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Clinical Notes Creator Modal */}
      {noteModalOpen && activeAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Document Clinical Visit Notes
                </h3>
                <p className="text-xs text-slate-500">
                  Patient: <strong>{activeAppointment.patientName}</strong> · Service: {activeAppointment.serviceName}
                </p>
              </div>
              <button onClick={() => setNoteModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClinicalNotes} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Examination Findings & Diagnosis
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Superficial enamel demineralization on buccal surface #14, healthy periodontal depths 2-3mm."
                  value={examFindings}
                  onChange={e => setExamFindings(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment / Procedure Performed *
                </label>
                <textarea
                  rows={2}
                  required
                  value={treatmentPerformed}
                  onChange={e => setTreatmentPerformed(e.target.value)}
                  placeholder="e.g. Ultrasonic scaling, prophy-jet stain removal, and fluoride varnish application."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prescriptions / Home Care
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sensodyne toothpaste & warm salt rinses"
                    value={prescription}
                    onChange={e => setPrescription(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Follow-Up / Recall Date
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={e => setFollowUpDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNoteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Notes & Complete Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Treatment Plan Modal */}
      {tpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create New Dental Treatment Plan
              </h3>
              <button onClick={() => setTpModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTreatmentPlan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  required
                  value={tpPatientName}
                  onChange={e => setTpPatientName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plan Title
                </label>
                <input
                  type="text"
                  required
                  value={tpTitle}
                  onChange={e => setTpTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diagnosis
                </label>
                <textarea
                  rows={2}
                  required
                  value={tpDiagnosis}
                  onChange={e => setTpDiagnosis(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Estimated Cost (PKR)
                  </label>
                  <input
                    type="number"
                    required
                    value={tpCost}
                    onChange={e => setTpCost(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Planned Visits
                  </label>
                  <input
                    type="number"
                    required
                    value={tpVisits}
                    onChange={e => setTpVisits(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTpModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl"
                >
                  Save Treatment Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
