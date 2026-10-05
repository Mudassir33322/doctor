import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  FileText,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
  ChevronRight,
  Plus,
  X,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Appointment, Invoice, TreatmentPlan } from '../../types';

export const PatientPortal: React.FC = () => {
  const { currentUser, setActiveRoute, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'treatment' | 'billing' | 'forms' | 'profile'>('dashboard');

  // Load patient's data
  const currentPatient = storageService.getPatientById('pat-1') || storageService.getPatients()[0];
  const allAppointments = storageService.getAppointments().filter(
    a => a.patientId === currentPatient.id || a.patientName.toLowerCase().includes('omar')
  );
  const treatmentPlans = storageService.getTreatmentPlans().filter(
    tp => tp.patientId === currentPatient.id || tp.patientName.toLowerCase().includes('omar')
  );
  const invoices = storageService.getInvoices().filter(
    i => i.patientId === currentPatient.id || i.patientName.toLowerCase().includes('omar')
  );

  const upcomingAppointments = allAppointments.filter(
    a => a.status === 'confirmed' || a.status === 'requested' || a.status === 'checked_in'
  );
  const pastAppointments = allAppointments.filter(
    a => a.status === 'completed' || a.status === 'cancelled' || a.status === 'no_show'
  );

  // Modal states
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('11:00 AM');

  // Digital forms state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [allergiesText, setAllergiesText] = useState('None reported');
  const [medsText, setMedsText] = useState('Vitamin C daily');
  const [consentSigned, setConsentSigned] = useState(false);

  const handlePayInvoice = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setPaymentModalOpen(true);
  };

  const handleExecutePayment = (method: any) => {
    if (!selectedInvoice) return;
    const unpaid = selectedInvoice.total - selectedInvoice.paidAmount;
    storageService.recordPayment(selectedInvoice.id, unpaid, method);
    addToast('success', 'Payment successful!', `PKR ${unpaid.toLocaleString()} recorded via ${method}.`);
    setPaymentModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleReschedule = () => {
    if (!selectedAppointment || !newDate || !newTime) return;
    storageService.rescheduleAppointment(selectedAppointment.id, newDate, newTime);
    addToast('success', 'Reschedule requested', `Appointment updated to ${newDate} at ${newTime}.`);
    setRescheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment according to clinic policy (min. 4h notice)?')) {
      storageService.updateAppointmentStatus(id, 'cancelled', 'Cancelled by patient via portal');
      addToast('info', 'Appointment cancelled', 'Your appointment slot has been freed.');
    }
  };

  const outstandingBalance = invoices.reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 font-extrabold text-xl flex items-center justify-center font-display border border-teal-200 shrink-0">
              OF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  Welcome, {currentPatient.name}
                </h1>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Active Patient
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                <span>Patient ID: <strong>{currentPatient.id}</strong></span>
                <span>·</span>
                <span>Phone: {currentPatient.phone}</span>
                <span>·</span>
                <span>Blood Group: {currentPatient.bloodGroup}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveRoute('/appointment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 transition-colors text-xs shadow-xs"
            >
              <Calendar className="w-4 h-4 text-teal-200" />
              <span>Book New Visit</span>
            </button>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'dashboard', label: 'Overview Dashboard' },
            { id: 'appointments', label: `My Appointments (${allAppointments.length})` },
            { id: 'treatment', label: `Treatment Plans (${treatmentPlans.length})` },
            { id: 'billing', label: `Invoices & Billing (${invoices.length})` },
            { id: 'forms', label: 'Digital Intake Forms' },
            { id: 'profile', label: 'My Profile & Preferences' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 mb-1">Upcoming Appointments</div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
                  {upcomingAppointments.length}
                </div>
                <div className="text-[11px] text-teal-700 mt-1">
                  {upcomingAppointments[0] ? `Next: ${upcomingAppointments[0].date}` : 'No upcoming visits'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 mb-1">Active Treatment Plan</div>
                <div className="text-2xl font-bold text-slate-900 font-display">
                  {treatmentPlans[0] ? treatmentPlans[0].status.toUpperCase() : 'None'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {treatmentPlans[0]?.title || 'Maintenance Phase'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 mb-1">Outstanding Balance</div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
                  PKR {outstandingBalance.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {outstandingBalance === 0 ? 'All accounts settled' : 'Payment pending'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 mb-1">Total Completed Visits</div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">
                  {currentPatient.totalVisits}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Member since 2025</div>
              </div>
            </div>

            {/* Next Scheduled Appointment Spotlight */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
                Next Confirmed Dental Visit
              </h2>

              {upcomingAppointments.length > 0 ? (
                <div className="bg-teal-50/60 border border-teal-200/70 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {upcomingAppointments[0].date} at {upcomingAppointments[0].timeSlot}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      {upcomingAppointments[0].serviceName}
                    </h3>
                    <p className="text-xs text-slate-600">
                      With Specialist: <strong>{upcomingAppointments[0].dentistName}</strong> · Location: {upcomingAppointments[0].location}
                    </p>
                    <div className="text-[11px] text-slate-500">
                      Appointment ID: <strong className="font-mono">{upcomingAppointments[0].id}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedAppointment(upcomingAppointments[0]);
                        setRescheduleModalOpen(true);
                      }}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors"
                    >
                      Request Reschedule
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(upcomingAppointments[0].id)}
                      className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-colors"
                    >
                      Cancel Visit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No upcoming appointments scheduled.{' '}
                  <button
                    onClick={() => setActiveRoute('/appointment')}
                    className="text-teal-700 font-bold underline ml-1"
                  >
                    Schedule your routine 6-month checkup now →
                  </button>
                </div>
              )}
            </div>

            {/* Active Treatment Plan preview */}
            {treatmentPlans.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-display">
                      Active Treatment Plan: {treatmentPlans[0].title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Supervised by {treatmentPlans[0].dentistName} · Diagnosis: {treatmentPlans[0].diagnosis}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase">
                    {treatmentPlans[0].status}
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {treatmentPlans[0].items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            item.status === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{item.procedureName}</div>
                          {item.toothNumber && (
                            <span className="text-[10px] text-slate-500">Tooth {item.toothNumber}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900 tabular-nums">
                          PKR {item.estimatedCost.toLocaleString()}
                        </div>
                        <span
                          className={`text-[10px] uppercase font-semibold ${
                            item.status === 'completed' ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Appointment History & Bookings
              </h2>
              <button
                onClick={() => setActiveRoute('/appointment')}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl"
              >
                + Book New
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4 font-semibold">Appointment ID</th>
                    <th className="py-3 px-4 font-semibold">Service</th>
                    <th className="py-3 px-4 font-semibold">Dentist</th>
                    <th className="py-3 px-4 font-semibold">Date & Time</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{apt.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">{apt.serviceName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{apt.dentistName}</td>
                      <td className="py-3.5 px-4 tabular-nums text-slate-800">
                        {apt.date} · {apt.timeSlot}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : apt.status === 'confirmed'
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : apt.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {apt.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {apt.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setRescheduleModalOpen(true);
                              }}
                              className="text-teal-700 hover:underline font-semibold"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="text-rose-600 hover:underline font-semibold ml-2"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TREATMENT PLANS */}
        {activeTab === 'treatment' && (
          <div className="space-y-6">
            {treatmentPlans.map(tp => (
              <div key={tp.id} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-700">Plan ID: {tp.id}</span>
                    <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">{tp.title}</h3>
                    <p className="text-xs text-slate-500">Clinician: {tp.dentistName} · Created {tp.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase">
                      {tp.status}
                    </span>
                    <div className="text-sm font-bold text-slate-900 tabular-nums mt-1">
                      Total: PKR {tp.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mb-6 bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-100">
                  <strong>Clinical Diagnosis & Notes:</strong> {tp.diagnosis}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Procedure Milestones
                  </h4>
                  {tp.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            item.status === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{item.procedureName}</div>
                          {item.toothNumber && (
                            <span className="text-[11px] text-slate-500">Tooth Position: {item.toothNumber}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900 tabular-nums">
                          PKR {item.estimatedCost.toLocaleString()}
                        </div>
                        <span
                          className={`text-[10px] uppercase font-bold ${
                            item.status === 'completed' ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: BILLING & INVOICES */}
        {activeTab === 'billing' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Invoices & Payment Receipts
                </h2>
                <p className="text-xs text-slate-500">
                  View itemized dental receipts, print official copies, or settle outstanding fees.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Total Unpaid:</span>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                  PKR {outstandingBalance.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4 font-semibold">Invoice #</th>
                    <th className="py-3 px-4 font-semibold">Treatment Item</th>
                    <th className="py-3 px-4 font-semibold">Issue Date</th>
                    <th className="py-3 px-4 font-semibold">Total Amount</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {inv.items[0]?.description || 'Dental Care'}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-slate-600">{inv.date}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                        PKR {inv.total.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inv.status === 'paid'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {inv.status !== 'paid' && (
                          <button
                            onClick={() => handlePayInvoice(inv)}
                            className="px-3 py-1 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs"
                          >
                            Pay Now
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL INTAKE FORMS */}
        {activeTab === 'forms' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Digital Patient Registration & Medical History
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complete this form before arriving to eliminate waiting-room clipboard paperwork.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-base">
                  Medical Forms Submitted & Verified
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your electronic health record has been updated and synchronized with Dr. Sarah Ahmed's clinical chart.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 text-xs text-emerald-900 underline font-semibold"
                >
                  Update Information Again
                </button>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setFormSubmitted(true);
                  addToast('success', 'Intake forms saved', 'Updated clinical history.');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Medical Conditions
                    </label>
                    <input
                      type="text"
                      defaultValue="None (Healthy)"
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Drug / Material Allergies
                    </label>
                    <input
                      type="text"
                      value={allergiesText}
                      onChange={e => setAllergiesText(e.target.value)}
                      placeholder="e.g. Penicillin, Latex"
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Daily Medications or Supplements
                  </label>
                  <input
                    type="text"
                    value={medsText}
                    onChange={e => setMedsText(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer font-medium text-slate-800">
                    <input
                      type="checkbox"
                      required
                      checked={consentSigned}
                      onChange={e => setConsentSigned(e.target.checked)}
                      className="mt-0.5 rounded-sm text-teal-600 focus:ring-teal-500"
                    />
                    <span>
                      I hereby authorize SMILORA Dental Care to conduct necessary digital examinations, radiographs, and cleanings, and confirm that all medical disclosure information provided is accurate.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Save & Submit Electronic Forms
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 6: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Personal Information & Contacts
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Full Name</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{currentPatient.name}</div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Birth</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{currentPatient.dob}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{currentPatient.phone}</div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{currentPatient.email}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Address</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{currentPatient.address}</div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Emergency Contact</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {currentPatient.emergencyContact.name} ({currentPatient.emergencyContact.relation}) · {currentPatient.emergencyContact.phone}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {paymentModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Online Payment Processing
              </h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Invoice:</span>
                <strong className="font-mono">{selectedInvoice.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Treatment:</span>
                <strong>{selectedInvoice.items[0]?.description}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-sm">
                <span>Amount Due:</span>
                <strong className="text-teal-800 tabular-nums">
                  PKR {(selectedInvoice.total - selectedInvoice.paidAmount).toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-semibold text-slate-600 block">Choose Payment Method:</span>
              {[
                { method: 'Card', label: 'Credit / Debit Card (Visa, MasterCard)' },
                { method: 'Easypaisa', label: 'Easypaisa Mobile Wallet' },
                { method: 'JazzCash', label: 'JazzCash Wallet / QR' },
                { method: 'Bank Transfer', label: 'Direct Bank Transfer (IBFT/Raast)' },
              ].map(opt => (
                <button
                  key={opt.method}
                  onClick={() => handleExecutePayment(opt.method)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setPaymentModalOpen(false)}
              className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Invoice Receipt Viewer Modal */}
      {selectedInvoice && !paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xl font-bold font-display text-slate-900">SMILORA</span>
                <p className="text-[10px] text-teal-700 uppercase font-semibold">Official Clinical Invoice</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1 mb-6">
              <div className="flex justify-between">
                <span>Invoice Number:</span>
                <strong className="font-mono text-slate-900">{selectedInvoice.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Patient Name:</span>
                <strong className="text-slate-900">{selectedInvoice.patientName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Clinician:</span>
                <strong className="text-slate-900">{selectedInvoice.dentistName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedInvoice.date}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-xs">
              <div className="bg-slate-50 p-2.5 font-semibold text-slate-700 flex justify-between border-b border-slate-200">
                <span>Description</span>
                <span>Total</span>
              </div>
              {selectedInvoice.items.map(i => (
                <div key={i.id} className="p-3 flex justify-between text-slate-800">
                  <span>{i.description}</span>
                  <span className="font-bold tabular-nums">PKR {i.total.toLocaleString()}</span>
                </div>
              ))}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="tabular-nums">PKR {selectedInvoice.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Status: <strong className="uppercase text-emerald-700">{selectedInvoice.status}</strong>
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-3">
              Reschedule Appointment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select your new preferred date and time for {selectedAppointment.serviceName}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Time Slot</label>
                <select
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                >
                  <option>09:30 AM</option>
                  <option>10:15 AM</option>
                  <option>11:00 AM</option>
                  <option>11:45 AM</option>
                  <option>02:00 PM</option>
                  <option>03:30 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
