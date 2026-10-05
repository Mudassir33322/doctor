import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Service, Dentist, Appointment } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Download,
  Check,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';

export const AppointmentBookingPage: React.FC = () => {
  const {
    preselectedServiceId,
    preselectedDentistId,
    setActiveRoute,
    setCurrentRole,
    setLastBookedAppointmentId,
    addToast,
    cmsConfig,
  } = useApp();

  const services = storageService.getServices().filter(s => s.active);
  const dentists = storageService.getDentists().filter(d => d.status === 'active');

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('Gulberg Main Branch');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [reason, setReason] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync preselection
  useEffect(() => {
    if (preselectedServiceId) {
      const s = services.find(x => x.id === preselectedServiceId || x.slug === preselectedServiceId);
      if (s) {
        setSelectedService(s);
        setStep(2);
      }
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedDentistId) {
      const d = dentists.find(x => x.id === preselectedDentistId || x.slug === preselectedDentistId);
      if (d) {
        setSelectedDentist(d);
        if (selectedService) setStep(3);
      }
    }
  }, [preselectedDentistId]);

  // Standard clinic slots for any day
  const baseSlots = [
    '09:30 AM',
    '10:15 AM',
    '11:00 AM',
    '11:45 AM',
    '02:00 PM',
    '02:45 PM',
    '03:30 PM',
    '04:15 PM',
    '05:00 PM',
    '05:45 PM',
    '06:30 PM',
  ];

  // Calculate available slots preventing double booking
  const availableSlots = baseSlots.map(slot => {
    const isAvail = selectedDentist
      ? storageService.checkSlotAvailable(selectedDentist.id, selectedDate, slot)
      : true;
    return { slot, available: isAvail };
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDentist || !selectedDate || !selectedTimeSlot || !patientName || !patientPhone) {
      addToast('error', 'Incomplete booking form', 'Please check that all required fields are filled.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newApt = storageService.createAppointment({
        patientId: `pat-${Date.now()}`,
        patientName,
        patientPhone,
        patientEmail: patientEmail || `${patientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        isNewPatient,
        dentistId: selectedDentist.id,
        dentistName: selectedDentist.name,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        location: selectedLocation,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        status: 'confirmed',
        reason: reason || `Appointment for ${selectedService.name}`,
        feeEstimated: selectedService.startingPrice,
        paidAmount: 0,
      });

      setConfirmedAppointment(newApt);
      setLastBookedAppointmentId(newApt.id);
      setIsSubmitting(false);
      setStep(7);
      addToast('success', 'Appointment confirmed!', `Booking ID ${newApt.id} reserved.`);
    }, 600);
  };

  const downloadCalendarFile = () => {
    if (!confirmedAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SMILORA Dental Care//Appointment//EN
BEGIN:VEVENT
SUMMARY:Dental Visit: ${confirmedAppointment.serviceName} at SMILORA
DESCRIPTION:With ${confirmedAppointment.dentistName} at ${confirmedAppointment.location}
DTSTART:${confirmedAppointment.date.replace(/-/g, '')}T090000Z
LOCATION:${confirmedAppointment.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SMILORA-${confirmedAppointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Real-Time Online Patient Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Book Your Dental Appointment
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Choose your treatment, select your specialist, and reserve a guaranteed time slot in under 2 minutes.
          </p>
        </div>

        {/* Step Indicator (1 to 7) */}
        {step < 7 && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-8">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
              <span className="text-teal-700 font-semibold">
                Step {step} of 6:{' '}
                {step === 1
                  ? 'Select Service'
                  : step === 2
                  ? 'Select Dentist'
                  : step === 3
                  ? 'Clinic Location'
                  : step === 4
                  ? 'Choose Date'
                  : step === 5
                  ? 'Choose Time Slot'
                  : 'Patient Details'}
              </span>
              <span className="tabular-nums">{Math.round((step / 6) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    1. What dental care do you need?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select a service to view specialized dentists and estimated fees.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
                {services.map(srv => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`text-left p-4 rounded-xl border transition-all text-sm flex flex-col justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-semibold text-slate-900">{srv.name}</div>
                        {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {srv.shortDescription}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~{srv.durationMinutes} min</span>
                        </span>
                        <span className="font-semibold text-teal-700">
                          {srv.priceType === 'consultation_required'
                            ? 'Assessment Req.'
                            : `PKR ${srv.startingPrice.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  <span>Continue to Dentist</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Dentist */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    2. Select your Dental Specialist
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Showing clinicians experienced in {selectedService?.name}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dentists.map(dent => {
                  const isSelected = selectedDentist?.id === dent.id;
                  return (
                    <button
                      key={dent.id}
                      onClick={() => setSelectedDentist(dent)}
                      className={`text-left p-4 rounded-xl border transition-all flex gap-4 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <img
                        src={dent.image}
                        alt={dent.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-semibold text-slate-900 text-sm">{dent.name}</h3>
                          {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                        </div>
                        <div className="text-xs text-teal-700 font-medium truncate mt-0.5">
                          {dent.specialty}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {dent.experienceYears}+ years exp. · {dent.location}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{dent.workingHours.start} - {dent.workingHours.end}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </button>
                <button
                  disabled={!selectedDentist}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  <span>Select Location</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Location */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  3. Select Clinic Branch
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Both locations offer private sterile operatories and digital imaging suites.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Gulberg Main Branch',
                    address: cmsConfig.address,
                    features: 'Complete 3D CBCT imaging, surgical suite, aesthetic laboratory on-site',
                  },
                  {
                    name: 'DHA Phase 5 Branch',
                    address: cmsConfig.branchWestAddress,
                    features: 'Pediatric dental wing, Invisalign studio, free valet parking',
                  },
                ].map(loc => {
                  const isSelected = selectedLocation === loc.name;
                  return (
                    <button
                      key={loc.name}
                      onClick={() => setSelectedLocation(loc.name)}
                      className={`text-left p-5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-teal-600" />
                          <h3 className="font-semibold text-slate-900 text-sm">{loc.name}</h3>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 font-medium">{loc.address}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{loc.features}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Dentist</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-xs"
                >
                  <span>Select Date</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Choose Date */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  4. Choose your Preferred Date
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Practicing days for {selectedDentist?.name}: {selectedDentist?.workingDays.join(', ')}.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />

                <div className="mt-4 p-3 bg-teal-50/70 border border-teal-200/50 rounded-xl text-xs text-teal-800 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    Selected date: <strong>{selectedDate}</strong>. Next you will choose from guaranteed available time slots.
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Location</span>
                </button>
                <button
                  disabled={!selectedDate}
                  onClick={() => setStep(5)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-40 transition-all shadow-xs"
                >
                  <span>Select Time Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Choose Time Slot (Double-Booking Prevented) */}
          {step === 5 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  5. Select an Available Time Slot
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Times shown are calculated live for {selectedDentist?.name} on {selectedDate}.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {availableSlots.map(({ slot, available }) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-center transition-all text-xs font-semibold ${
                        isSelected
                          ? 'border-teal-600 bg-teal-700 text-white shadow-xs'
                          : available
                          ? 'border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-slate-800 bg-white'
                          : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                      }`}
                    >
                      <div>{slot}</div>
                      <div className="text-[10px] font-normal mt-0.5 opacity-80">
                        {available ? 'Available' : 'Booked'}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Date</span>
                </button>
                <button
                  disabled={!selectedTimeSlot}
                  onClick={() => setStep(6)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-40 transition-all shadow-xs"
                >
                  <span>Patient Information</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Patient Information Form */}
          {step === 6 && (
            <form onSubmit={handleConfirmBooking}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  6. Patient Information & Summary
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We will send appointment confirmation and reminders via SMS and email.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Service</span>
                  <strong className="text-slate-900">{selectedService?.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Specialist</span>
                  <strong className="text-slate-900">{selectedDentist?.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date & Time</span>
                  <strong className="text-slate-900">{selectedDate} at {selectedTimeSlot}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Location</span>
                  <strong className="text-slate-900">{selectedLocation}</strong>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Omar Farooq"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={patientPhone}
                      onChange={e => setPatientPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={e => setPatientEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Patient Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsNewPatient(true)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                          isNewPatient
                            ? 'bg-teal-50 border-teal-600 text-teal-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        New Patient
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsNewPatient(false)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                          !isNewPatient
                            ? 'bg-teal-50 border-teal-600 text-teal-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Existing Patient
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chief Dental Complaint / Notes for Doctor (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Mild sensitivity to cold water on upper right tooth, looking for consultation."
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Time</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 7: Instant Confirmation Screen (Section 15) */}
          {step === 7 && confirmedAppointment && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Appointment Request Confirmed!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Your reservation has been recorded in the SMILORA clinic calendar. A confirmation notification has been dispatched.
              </p>

              <div className="mt-8 max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left text-sm space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-500 text-xs">Appointment ID</span>
                  <span className="font-mono font-bold text-teal-800 text-base">
                    {confirmedAppointment.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedAppointment.serviceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dentist</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedAppointment.dentistName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Slot</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {confirmedAppointment.location}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Patient</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedAppointment.patientName} ({confirmedAppointment.patientPhone})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={downloadCalendarFile}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <Download className="w-4 h-4 text-teal-600" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentRole('patient');
                    setActiveRoute('/patient');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-all shadow-xs"
                >
                  <span>View in Patient Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveRoute('/')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-medium"
                >
                  <span>Back to Homepage</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
