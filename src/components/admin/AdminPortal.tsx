import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  Stethoscope,
  ClipboardList,
  CreditCard,
  RotateCcw,
  Kanban,
  Star,
  Globe,
  BarChart3,
  Settings,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Printer,
  ChevronRight,
  X,
  Phone,
  Mail,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';
import {
  Appointment,
  Patient,
  Dentist,
  Service,
  TreatmentPlan,
  Invoice,
  PaymentRecord,
  FollowUp,
  Lead,
  PatientReview,
  AuditLog,
} from '../../types';

export const AdminPortal: React.FC = () => {
  const { adminActiveTab, setAdminActiveTab, cmsConfig, updateCMSConfig, addToast, currentUser } = useApp();

  // Reactive state from storage
  const [appointments, setAppointments] = useState<Appointment[]>(storageService.getAppointments());
  const [patients, setPatients] = useState<Patient[]>(storageService.getPatients());
  const [dentists, setDentists] = useState<Dentist[]>(storageService.getDentists());
  const [services, setServices] = useState<Service[]>(storageService.getServices());
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(storageService.getTreatmentPlans());
  const [invoices, setInvoices] = useState<Invoice[]>(storageService.getInvoices());
  const [payments, setPayments] = useState<PaymentRecord[]>(storageService.getPayments());
  const [followUps, setFollowUps] = useState<FollowUp[]>(storageService.getFollowUps());
  const [leads, setLeads] = useState<Lead[]>(storageService.getLeads());
  const [reviews, setReviews] = useState<PatientReview[]>(storageService.getReviews());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(storageService.getAuditLogs());

  // Reload helper
  const reloadData = () => {
    setAppointments(storageService.getAppointments());
    setPatients(storageService.getPatients());
    setDentists(storageService.getDentists());
    setServices(storageService.getServices());
    setTreatmentPlans(storageService.getTreatmentPlans());
    setInvoices(storageService.getInvoices());
    setPayments(storageService.getPayments());
    setFollowUps(storageService.getFollowUps());
    setLeads(storageService.getLeads());
    setReviews(storageService.getReviews());
    setAuditLogs(storageService.getAuditLogs());
  };

  useEffect(() => {
    reloadData();
  }, [adminActiveTab]);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dentistFilter, setDentistFilter] = useState('all');

  // Modals
  const [createAptOpen, setCreateAptOpen] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [selectedPatientModal, setSelectedPatientModal] = useState<Patient | null>(null);
  const [selectedInvoiceView, setSelectedInvoiceView] = useState<Invoice | null>(null);
  const [recordPaymentModalOpen, setRecordPaymentModalOpen] = useState(false);
  const [invoiceToPay, setInvoiceToPay] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethodChoice, setPaymentMethodChoice] = useState<any>('Card');

  // New appointment form state
  const [newAptPatientName, setNewAptPatientName] = useState('');
  const [newAptPhone, setNewAptPhone] = useState('');
  const [newAptServiceId, setNewAptServiceId] = useState(services[0]?.id || '');
  const [newAptDentistId, setNewAptDentistId] = useState(dentists[0]?.id || '');
  const [newAptDate, setNewAptDate] = useState('2026-10-04');
  const [newAptSlot, setNewAptSlot] = useState('11:00 AM');

  // New invoice form state
  const [newInvPatientName, setNewInvPatientName] = useState('Omar Farooq');
  const [newInvDentistName, setNewInvDentistName] = useState(dentists[0]?.name || '');
  const [newInvItem, setNewInvItem] = useState('Laser Teeth Whitening');
  const [newInvAmount, setNewInvAmount] = useState('28000');

  // CMS form state
  const [cmsHeroHeadline, setCmsHeroHeadline] = useState(cmsConfig.heroHeadline);
  const [cmsHeroSubheadline, setCmsHeroSubheadline] = useState(cmsConfig.heroSubheadline);
  const [cmsPhone, setCmsPhone] = useState(cmsConfig.phone);
  const [cmsEmergency, setCmsEmergency] = useState(cmsConfig.emergencyPhone);
  const [cmsWhatsapp, setCmsWhatsapp] = useState(cmsConfig.whatsapp);
  const [cmsHours, setCmsHours] = useState(cmsConfig.openingHours);

  // Metrics calculation
  const todayStr = '2026-10-04';
  const todayApts = appointments.filter(a => a.date === todayStr);
  const pendingRequests = appointments.filter(a => a.status === 'requested');
  const completedToday = todayApts.filter(a => a.status === 'completed');
  const noShows = appointments.filter(a => a.status === 'no_show');
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstandingRevenue = invoices.reduce((sum, i) => sum + (i.total - i.paidAmount), 0);

  // Status changers
  const handleUpdateAptStatus = (id: string, status: any) => {
    storageService.updateAppointmentStatus(id, status);
    reloadData();
    addToast('success', `Appointment status updated to ${status.replace('_', ' ')}`);
  };

  const handleUpdateLeadStatus = (id: string, status: any) => {
    storageService.updateLeadStatus(id, status);
    reloadData();
    addToast('success', `Lead stage changed to ${status}`);
  };

  const handleUpdateReviewStatus = (id: string, status: any, featured?: boolean) => {
    storageService.updateReviewStatus(id, status, featured);
    reloadData();
    addToast('success', 'Review updated');
  };

  const handleUpdateFollowUp = (id: string, status: any) => {
    storageService.updateFollowUpStatus(id, status);
    reloadData();
    addToast('success', 'Follow-up recall updated');
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const srv = services.find(s => s.id === newAptServiceId) || services[0];
    const dent = dentists.find(d => d.id === newAptDentistId) || dentists[0];

    storageService.createAppointment({
      patientId: `pat-${Date.now()}`,
      patientName: newAptPatientName,
      patientPhone: newAptPhone,
      patientEmail: `${newAptPatientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      isNewPatient: true,
      dentistId: dent.id,
      dentistName: dent.name,
      serviceId: srv.id,
      serviceName: srv.name,
      location: dent.location,
      date: newAptDate,
      timeSlot: newAptSlot,
      status: 'confirmed',
      feeEstimated: srv.startingPrice,
      paidAmount: 0,
    });

    addToast('success', 'Appointment scheduled!', `Reserved slot for ${newAptPatientName}`);
    setCreateAptOpen(false);
    reloadData();
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = Number(newInvAmount);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    storageService.createInvoice({
      patientId: 'pat-1',
      patientName: newInvPatientName,
      dentistId: dentists[0]?.id || 'dent-1',
      dentistName: newInvDentistName,
      date: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
      items: [{ id: `ii-${Date.now()}`, description: newInvItem, quantity: 1, unitPrice: subtotal, total: subtotal }],
      subtotal,
      discount: 0,
      tax,
      total,
      paidAmount: 0,
      status: 'pending',
    });

    addToast('success', 'Invoice generated!');
    setCreateInvoiceOpen(false);
    reloadData();
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceToPay) return;
    storageService.recordPayment(invoiceToPay.id, paymentAmount, paymentMethodChoice);
    addToast('success', `Payment of PKR ${paymentAmount.toLocaleString()} recorded.`);
    setRecordPaymentModalOpen(false);
    setInvoiceToPay(null);
    reloadData();
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMSConfig({
      heroHeadline: cmsHeroHeadline,
      heroSubheadline: cmsHeroSubheadline,
      phone: cmsPhone,
      emergencyPhone: cmsEmergency,
      whatsapp: cmsWhatsapp,
      openingHours: cmsHours,
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation (240px - 260px) */}
      <aside className="w-full md:w-64 bg-[#0B1329] border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display">
                SMILORA
              </span>
              <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                Clinic Management Suite
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setAdminActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'dashboard'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'appointments'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>Appointments</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-teal-300 px-2 py-0.5 rounded-full tabular-nums">
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setAdminActiveTab('patients')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'patients'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Patients (EHR)</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full tabular-nums">
                {patients.length}
              </span>
            </button>

            <button
              onClick={() => setAdminActiveTab('dentists')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'dentists'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Dentists & Roster</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'services'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Services & Fees</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('treatment-plans')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'treatment-plans'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-teal-400" />
              <span>Treatment Plans</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'billing'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4 text-teal-400" />
              <span>Billing & Invoices</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('follow-ups')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'follow-ups'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-teal-400" />
                <span>Recalls & Follow-ups</span>
              </div>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded-full tabular-nums">
                12 Due
              </span>
            </button>

            <button
              onClick={() => setAdminActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'leads'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Kanban className="w-4 h-4 text-teal-400" />
                <span>CRM Leads Pipeline</span>
              </div>
              <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800/60 px-2 py-0.5 rounded-full tabular-nums">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setAdminActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'reviews'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Star className="w-4 h-4 text-teal-400" />
              <span>Reviews Manager</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'cms'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-4 h-4 text-teal-400" />
              <span>Website Live CMS</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'reports'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <span>Reports & Analytics</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                adminActiveTab === 'settings'
                  ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4 text-teal-400" />
              <span>Settings & Audit Logs</span>
            </button>
          </nav>
        </div>

        {/* Current user footer badge */}
        <div className="pt-4 border-t border-slate-800/80 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center font-bold text-xs">
            {currentUser?.name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">{currentUser?.name || 'Administrator'}</div>
            <div className="text-[10px] text-teal-400 font-mono truncate">{currentUser?.role || 'Super Admin'}</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#0F172A] p-4 sm:p-8 overflow-y-auto">
        {/* Top contextual action bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Administration Portal / {adminActiveTab.toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display mt-0.5">
              {adminActiveTab === 'dashboard'
                ? 'Clinical Executive Dashboard'
                : adminActiveTab === 'appointments'
                ? 'Appointment Scheduling & Calendar'
                : adminActiveTab === 'patients'
                ? 'Electronic Patient Records (EHR)'
                : adminActiveTab === 'dentists'
                ? 'Dentist Roster & Working Hours'
                : adminActiveTab === 'services'
                ? 'Service Catalog & Pricing'
                : adminActiveTab === 'treatment-plans'
                ? 'Multi-Visit Treatment Plans'
                : adminActiveTab === 'billing'
                ? 'Dental Invoicing & Financial Ledger'
                : adminActiveTab === 'follow-ups'
                ? 'Patient Recall & Hygiene Engine'
                : adminActiveTab === 'leads'
                ? 'CRM Patient Acquisition Pipeline'
                : adminActiveTab === 'reviews'
                ? 'Patient Reviews & Moderation'
                : adminActiveTab === 'cms'
                ? 'Website Content Management System'
                : adminActiveTab === 'reports'
                ? 'Clinical & Financial Analytics'
                : 'Practice Settings & Audit Trail'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {adminActiveTab === 'appointments' && (
              <button
                onClick={() => setCreateAptOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Appointment</span>
              </button>
            )}

            {adminActiveTab === 'billing' && (
              <button
                onClick={() => setCreateInvoiceOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>
            )}
          </div>
        </div>

        {/* SUBMODULE 1: DASHBOARD */}
        {adminActiveTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards (Sections 36 & 37) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#131F37] border border-slate-800 p-5 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-400 block mb-1">Today's Appointments</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                  {todayApts.length}
                </div>
                <span className="text-[11px] text-teal-400 font-medium">
                  {completedToday.length} completed visits today
                </span>
              </div>

              <div className="bg-[#131F37] border border-slate-800 p-5 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-400 block mb-1">Pending Requests</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tabular-nums">
                  {pendingRequests.length}
                </div>
                <span className="text-[11px] text-amber-300 font-medium">Requires front-desk confirmation</span>
              </div>

              <div className="bg-[#131F37] border border-slate-800 p-5 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-400 block mb-1">Collected Revenue (PKR)</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display tabular-nums">
                  PKR {totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-300 font-medium">Recorded clinic receipts</span>
              </div>

              <div className="bg-[#131F37] border border-slate-800 p-5 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-400 block mb-1">Outstanding Balance</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display tabular-nums">
                  PKR {outstandingRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{noShows.length} no-show visits</span>
              </div>
            </div>

            {/* Dashboard Visual Charts (Appointment Trends & Popular Services) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Appointment Trend Bar Graph */}
              <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm font-display">
                    Weekly Appointment Volume
                  </h3>
                  <span className="text-xs text-teal-400 font-mono">Current Week</span>
                </div>

                <div className="h-48 flex items-end gap-3 pt-6 pb-2 px-2">
                  {[
                    { day: 'Mon', count: 18 },
                    { day: 'Tue', count: 24 },
                    { day: 'Wed', count: 21 },
                    { day: 'Thu', count: 28 },
                    { day: 'Fri', count: 26 },
                    { day: 'Sat', count: 32 },
                    { day: 'Sun', count: 14 },
                  ].map((bar, i) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[10px] text-slate-400 font-mono tabular-nums">{bar.count}</div>
                      <div
                        className="w-full bg-teal-500/80 hover:bg-teal-400 rounded-t-md transition-all"
                        style={{ height: `${(bar.count / 35) * 100}%` }}
                      />
                      <div className="text-xs text-slate-400 font-medium">{bar.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Distribution & Volume */}
              <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm font-display">
                    Top Clinical Services Performance
                  </h3>
                  <span className="text-xs text-slate-400">By Appointment Volume</span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Teeth Cleaning & Scaling', count: 86, percent: 85, color: 'bg-teal-500' },
                    { name: 'In-Clinic Teeth Whitening', count: 42, percent: 65, color: 'bg-emerald-500' },
                    { name: 'Microscopic Root Canal', count: 31, percent: 50, color: 'bg-sky-500' },
                    { name: 'Invisalign & Clear Aligners', count: 24, percent: 40, color: 'bg-indigo-500' },
                    { name: '3D Guided Dental Implants', count: 18, percent: 30, color: 'bg-amber-500' },
                  ].map((srv, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span className="font-medium">{srv.name}</span>
                        <span className="tabular-nums font-mono text-slate-400">{srv.count} visits</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`${srv.color} h-full rounded-full`} style={{ width: `${srv.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Live Feed */}
            <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
              <h3 className="font-bold text-white text-sm font-display">
                Real-Time Clinical Activity Log
              </h3>
              <div className="divide-y divide-slate-800 text-xs">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <div>
                        <span className="font-semibold text-slate-200">{log.userName}</span>{' '}
                        <span className="text-slate-400">({log.module}) — {log.details}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBMODULE 2: APPOINTMENTS MANAGEMENT (Section 38) */}
        {adminActiveTab === 'appointments' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search patient name, phone, ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500 w-64"
                />

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300"
                >
                  <option value="all">All Statuses</option>
                  <option value="requested">Requested</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked_in">Checked In</option>
                  <option value="in_consultation">In Consultation</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no_show">No Show</option>
                </select>

                <select
                  value={dentistFilter}
                  onChange={e => setDentistFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300"
                >
                  <option value="all">All Dentists</option>
                  {dentists.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-400">
                Showing{' '}
                <strong className="text-white">
                  {
                    appointments.filter(a => {
                      const matchesSearch =
                        a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.patientPhone.includes(searchQuery);
                      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
                      const matchesDentist = dentistFilter === 'all' || a.dentistId === dentistFilter;
                      return matchesSearch && matchesStatus && matchesDentist;
                    }).length
                  }
                </strong>{' '}
                Appointments
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Appt ID</th>
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Service</th>
                    <th className="py-3 px-3">Dentist</th>
                    <th className="py-3 px-3">Date & Time</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {appointments
                    .filter(a => {
                      const matchesSearch =
                        a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.patientPhone.includes(searchQuery);
                      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
                      const matchesDentist = dentistFilter === 'all' || a.dentistId === dentistFilter;
                      return matchesSearch && matchesStatus && matchesDentist;
                    })
                    .slice(0, 25)
                    .map(apt => (
                      <tr key={apt.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-teal-300">{apt.id}</td>
                        <td className="py-3 px-3 font-medium text-white">
                          <div>{apt.patientName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{apt.patientPhone}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{apt.serviceName}</td>
                        <td className="py-3 px-3 text-slate-400">{apt.dentistName}</td>
                        <td className="py-3 px-3 tabular-nums text-slate-300">
                          {apt.date} · {apt.timeSlot}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              apt.status === 'completed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : apt.status === 'confirmed'
                                ? 'bg-teal-950 text-teal-300 border border-teal-800'
                                : apt.status === 'in_consultation'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : apt.status === 'no_show'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {apt.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                          {apt.status === 'requested' && (
                            <button
                              onClick={() => handleUpdateAptStatus(apt.id, 'confirmed')}
                              className="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-semibold text-[10px]"
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateAptStatus(apt.id, 'checked_in')}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-[10px]"
                            >
                              Check-In
                            </button>
                          )}
                          {apt.status === 'checked_in' && (
                            <button
                              onClick={() => handleUpdateAptStatus(apt.id, 'in_consultation')}
                              className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded font-semibold text-[10px]"
                            >
                              Seat Patient
                            </button>
                          )}
                          {apt.status === 'in_consultation' && (
                            <button
                              onClick={() => handleUpdateAptStatus(apt.id, 'completed')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold text-[10px]"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateAptStatus(apt.id, 'cancelled')}
                              className="px-2 py-1 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded font-semibold text-[10px]"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 3: PATIENTS MANAGEMENT (Section 39) */}
        {adminActiveTab === 'patients' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search by patient name, phone, or blood group..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500 w-72"
              />
              <span className="text-xs text-slate-400">Total Active Patients: {patients.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Patient ID</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Blood Group</th>
                    <th className="py-3 px-3">Total Visits</th>
                    <th className="py-3 px-3">Next Appointment</th>
                    <th className="py-3 px-3 text-right">View EHR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {patients
                    .filter(
                      p =>
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.phone.includes(searchQuery) ||
                        p.id.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 20)
                    .map(pat => (
                      <tr key={pat.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-3 font-mono text-teal-300 font-bold">{pat.id}</td>
                        <td className="py-3.5 px-3 font-semibold text-white">{pat.name}</td>
                        <td className="py-3.5 px-3 text-slate-300">
                          <div>{pat.phone}</div>
                          <div className="text-[10px] text-slate-500">{pat.email}</div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400">{pat.bloodGroup || 'O+'}</td>
                        <td className="py-3.5 px-3 tabular-nums text-slate-300 font-bold">{pat.totalVisits}</td>
                        <td className="py-3.5 px-3 text-slate-400">{pat.nextAppointment || 'None scheduled'}</td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setSelectedPatientModal(pat)}
                            className="px-3 py-1 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded-lg text-xs font-semibold"
                          >
                            Open Chart
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 4: DENTIST MANAGEMENT (Section 40) */}
        {adminActiveTab === 'dentists' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentists.map(dent => (
              <div key={dent.id} className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={dent.image}
                    alt={dent.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm">{dent.name}</h3>
                    <div className="text-xs text-teal-400">{dent.specialty}</div>
                    <div className="text-[10px] text-slate-400">{dent.location}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hours:</span>
                    <span>{dent.workingHours.start} - {dent.workingHours.end}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Days:</span>
                    <span className="truncate max-w-[150px]">{dent.workingDays.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rating:</span>
                    <span>⭐ {dent.rating} ({dent.reviewCount})</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => addToast('info', 'Edit Dentist', 'Profile settings are configured.')}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-semibold"
                  >
                    Edit Hours
                  </button>
                  <button
                    onClick={() => {
                      const updated = {
                        ...dent,
                        status: dent.status === 'active' ? ('on_leave' as const) : ('active' as const),
                      };
                      storageService.updateDentist(updated);
                      reloadData();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      dent.status === 'active'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {dent.status === 'active' ? 'Active' : 'On Leave'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBMODULE 5: SERVICES MANAGEMENT (Section 41) */}
        {adminActiveTab === 'services' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Clinic Treatment Catalog & Price List
              </h2>
              <span className="text-xs text-slate-400">Total Services: {services.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Service Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Base Price</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {services.map(srv => (
                    <tr key={srv.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">{srv.name}</td>
                      <td className="py-3 px-3 text-teal-400">{srv.category}</td>
                      <td className="py-3 px-3 tabular-nums text-slate-300">{srv.durationMinutes} min</td>
                      <td className="py-3 px-3 font-bold text-white tabular-nums">
                        PKR {srv.startingPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            srv.active ? 'text-emerald-400 bg-emerald-950' : 'text-slate-500 bg-slate-800'
                          }`}
                        >
                          {srv.active ? 'ACTIVE' : 'DISABLED'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const updated = { ...srv, active: !srv.active };
                            storageService.updateService(updated);
                            reloadData();
                          }}
                          className="text-teal-400 hover:underline font-semibold text-xs"
                        >
                          {srv.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 6: TREATMENT PLANS (Section 34) */}
        {adminActiveTab === 'treatment-plans' && (
          <div className="space-y-4">
            {treatmentPlans.map(tp => (
              <div key={tp.id} className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-4">
                  <div>
                    <span className="font-mono text-xs text-teal-400 font-bold">{tp.id}</span>
                    <h3 className="text-base font-bold text-white font-display mt-0.5">{tp.title}</h3>
                    <p className="text-xs text-slate-400">
                      Patient: <strong>{tp.patientName}</strong> · Supervising Doctor: {tp.dentistName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800 uppercase">
                      {tp.status}
                    </span>
                    <div className="text-sm font-bold text-emerald-400 tabular-nums mt-1">
                      Total Fee: PKR {tp.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 mb-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <strong>Clinical Diagnosis:</strong> {tp.diagnosis}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {tp.items.map((it, idx) => (
                    <div key={it.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="font-semibold text-slate-200">{it.procedureName}</div>
                      <div className="text-teal-400 font-bold tabular-nums mt-1">
                        PKR {it.estimatedCost.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">{it.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBMODULE 7: BILLING & INVOICES (Sections 43 & 44) */}
        {adminActiveTab === 'billing' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Patient Invoicing & Collections Ledger
                </h3>
                <p className="text-xs text-slate-400">Total collected: PKR {totalRevenue.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreateInvoiceOpen(true)}
                  className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
                >
                  + Generate Invoice
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Invoice #</th>
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Treatment Item</th>
                    <th className="py-3 px-3">Total Amount</th>
                    <th className="py-3 px-3">Paid Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invoices.slice(0, 20).map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-mono font-bold text-teal-300">{inv.invoiceNumber}</td>
                      <td className="py-3 px-3 font-medium text-white">{inv.patientName}</td>
                      <td className="py-3 px-3 text-slate-300">{inv.items[0]?.description}</td>
                      <td className="py-3 px-3 font-bold text-white tabular-nums">
                        PKR {inv.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-emerald-400 font-bold tabular-nums">
                        PKR {inv.paidAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            inv.status === 'paid'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        {inv.status !== 'paid' && (
                          <button
                            onClick={() => {
                              setInvoiceToPay(inv);
                              setPaymentAmount(inv.total - inv.paidAmount);
                              setRecordPaymentModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[10px] font-bold"
                          >
                            Record Payment
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedInvoiceView(inv)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                        >
                          Print Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 8: RECALLS & FOLLOW-UPS (Section 45) */}
        {adminActiveTab === 'follow-ups' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Automated Patient Recalls & Hygiene Follow-ups
                </h3>
                <p className="text-xs text-slate-400">
                  Bring patients back for routine 6-month scale & polish, unfinished root canal crowns, and post-op checks.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Follow-up Type</th>
                    <th className="py-3 px-3">Due Date</th>
                    <th className="py-3 px-3">Doctor</th>
                    <th className="py-3 px-3">Notes</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {followUps.map(fu => (
                    <tr key={fu.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">
                        <div>{fu.patientName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{fu.patientPhone}</div>
                      </td>
                      <td className="py-3 px-3 text-teal-300 font-medium">
                        {fu.type.replace(/_/g, ' ').toUpperCase()}
                      </td>
                      <td className="py-3 px-3 tabular-nums text-slate-300">{fu.dueDate}</td>
                      <td className="py-3 px-3 text-slate-400">{fu.dentistName || 'Clinic Staff'}</td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs truncate">{fu.notes}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            fu.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'bg-amber-950 text-amber-300'
                          }`}
                        >
                          {fu.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {fu.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateFollowUp(fu.id, 'completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold"
                          >
                            Mark Recalled
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 9: CRM LEADS PIPELINE (Section 47) */}
        {adminActiveTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Patient Acquisition Funnel
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Leads captured from Website Inquiries, Contact Form, and Emergency Triage.
              </p>

              {/* Kanban-style stage counters */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-8">
                {['new', 'contacted', 'appointment_booked', 'visited', 'converted', 'lost'].map(stage => {
                  const count = leads.filter(l => l.status === stage).length;
                  return (
                    <div key={stage} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                        {stage.replace('_', ' ')}
                      </span>
                      <div className="text-xl font-bold text-teal-400 tabular-nums mt-1">{count}</div>
                    </div>
                  );
                })}
              </div>

              {/* Leads Table with stage selectors */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-3 px-3">Lead Name</th>
                      <th className="py-3 px-3">Source</th>
                      <th className="py-3 px-3">Service Interested</th>
                      <th className="py-3 px-3">Notes</th>
                      <th className="py-3 px-3">Pipeline Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-semibold text-white">
                          <div>{lead.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{lead.phone}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {lead.source.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-3 text-teal-300 font-medium">{lead.serviceInterested}</td>
                        <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs truncate">{lead.notes}</td>
                        <td className="py-3 px-3">
                          <select
                            value={lead.status}
                            onChange={e => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="appointment_booked">Appointment Booked</option>
                            <option value="visited">Visited</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBMODULE 10: REVIEWS MODERATION (Section 48) */}
        {adminActiveTab === 'reviews' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Patient Testimonials & Reviews Moderation
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Service & Doctor</th>
                    <th className="py-3 px-3">Rating</th>
                    <th className="py-3 px-3">Feedback</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {reviews.map(rev => (
                    <tr key={rev.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">{rev.patientName}</td>
                      <td className="py-3 px-3 text-slate-300">
                        <div>{rev.serviceName}</div>
                        <div className="text-[10px] text-slate-500">{rev.dentistName}</div>
                      </td>
                      <td className="py-3 px-3 text-amber-400">⭐ {rev.rating}/5</td>
                      <td className="py-3 px-3 text-slate-400 max-w-sm truncate italic">"{rev.comment}"</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            rev.status === 'approved'
                              ? 'bg-emerald-950 text-emerald-300'
                              : rev.status === 'pending'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {rev.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'approved', true)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                            className="px-2 py-1 bg-rose-900 hover:bg-rose-800 text-white rounded text-[10px]"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBMODULE 11: WEBSITE LIVE CMS (Section 49) */}
        {adminActiveTab === 'cms' && (
          <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Website Live Content Management System (CMS)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Edit clinic copy, hero headlines, phone numbers, and working hours without developer intervention.
              </p>
            </div>

            <form onSubmit={handleSaveCMS} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Homepage Hero Headline
                </label>
                <input
                  type="text"
                  value={cmsHeroHeadline}
                  onChange={e => setCmsHeroHeadline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Homepage Supporting Text
                </label>
                <textarea
                  rows={2}
                  value={cmsHeroSubheadline}
                  onChange={e => setCmsHeroSubheadline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Reception Phone</label>
                  <input
                    type="text"
                    value={cmsPhone}
                    onChange={e => setCmsPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Emergency 24/7 Phone</label>
                  <input
                    type="text"
                    value={cmsEmergency}
                    onChange={e => setCmsEmergency(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Hotline</label>
                  <input
                    type="text"
                    value={cmsWhatsapp}
                    onChange={e => setCmsWhatsapp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Working Hours Text</label>
                <input
                  type="text"
                  value={cmsHours}
                  onChange={e => setCmsHours(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-xs transition-colors"
                >
                  Publish Live CMS Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SUBMODULE 12: REPORTS & ANALYTICS (Section 52) */}
        {adminActiveTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Appointment Completion Rate</span>
                <div className="text-3xl font-extrabold text-teal-400 font-display tabular-nums">91.4%</div>
                <p className="text-xs text-slate-500">Based on 80 scheduled visits this period.</p>
              </div>

              <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Average Revenue Per Patient</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-display tabular-nums">
                  PKR 28,400
                </div>
                <p className="text-xs text-slate-500">Calculated across restorative & cosmetic plans.</p>
              </div>

              <div className="bg-[#131F37] border border-slate-800 p-6 rounded-2xl shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Lead-to-Booking Conversion</span>
                <div className="text-3xl font-extrabold text-indigo-400 font-display tabular-nums">45.0%</div>
                <p className="text-xs text-slate-500">From digital website channels into confirmed visits.</p>
              </div>
            </div>

            {/* Performance breakdown table */}
            <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Dentist Clinical Production Breakdown
              </h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5">Doctor</th>
                      <th className="py-2.5">Specialty</th>
                      <th className="py-2.5">Scheduled</th>
                      <th className="py-2.5">Completed</th>
                      <th className="py-2.5 text-right">Production (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {dentists.map((d, i) => (
                      <tr key={d.id} className="hover:bg-slate-800/40">
                        <td className="py-3 font-semibold text-white">{d.name}</td>
                        <td className="py-3 text-slate-400">{d.specialty}</td>
                        <td className="py-3 tabular-nums text-slate-300">{(i + 1) * 12}</td>
                        <td className="py-3 tabular-nums text-emerald-400 font-semibold">{(i + 1) * 11}</td>
                        <td className="py-3 text-right font-mono font-bold text-white tabular-nums">
                          PKR {((i + 1) * 185000).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBMODULE 13: SETTINGS & AUDIT LOGS (Sections 54 & 55) */}
        {adminActiveTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Clinic Operational Policies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">Appointment Slot Duration</span>
                  <div className="font-bold text-white">45 Minutes (Default)</div>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">Double-Booking Prevention</span>
                  <div className="font-bold text-teal-400">Enforced & Active</div>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">Cancellation Policy Notice</span>
                  <div className="font-bold text-white">Minimum 4 Hours</div>
                </div>
              </div>
            </div>

            <div className="bg-[#131F37] border border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                System Security & Activity Audit Log
              </h3>
              <div className="divide-y divide-slate-800 text-xs">
                {auditLogs.map(log => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-white">{log.userName}</span>{' '}
                      <span className="text-slate-500 font-mono">[{log.userRole}]</span> —{' '}
                      <span className="text-teal-300">{log.action}:</span>{' '}
                      <span className="text-slate-300">{log.details}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE APPOINTMENT MODAL */}
      {createAptOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#131F37] text-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-700 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold font-display">Create Appointment (Admin)</h3>
              <button onClick={() => setCreateAptOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={newAptPatientName}
                  onChange={e => setNewAptPatientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Patient Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={newAptPhone}
                  onChange={e => setNewAptPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Treatment Service</label>
                  <select
                    value={newAptServiceId}
                    onChange={e => setNewAptServiceId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-slate-200"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Specialist</label>
                  <select
                    value={newAptDentistId}
                    onChange={e => setNewAptDentistId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-slate-200"
                  >
                    {dentists.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={newAptDate}
                    onChange={e => setNewAptDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Time Slot</label>
                  <select
                    value={newAptSlot}
                    onChange={e => setNewAptSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-slate-200"
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

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateAptOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {createInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#131F37] text-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-700 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold font-display">Generate Clinical Invoice</h3>
              <button onClick={() => setCreateInvoiceOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={newInvPatientName}
                  onChange={e => setNewInvPatientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Attending Clinician</label>
                <select
                  value={newInvDentistName}
                  onChange={e => setNewInvDentistName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {dentists.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Treatment Description</label>
                <input
                  type="text"
                  required
                  value={newInvItem}
                  onChange={e => setNewInvItem(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Subtotal Fee (PKR)</label>
                <input
                  type="number"
                  required
                  value={newInvAmount}
                  onChange={e => setNewInvAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateInvoiceOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD PAYMENT MODAL */}
      {recordPaymentModalOpen && invoiceToPay && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#131F37] text-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-700">
            <h3 className="text-base font-bold font-display mb-3">Record Patient Payment</h3>
            <p className="text-xs text-slate-400 mb-4">
              Invoice #{invoiceToPay.invoiceNumber} for {invoiceToPay.patientName}
            </p>

            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Amount Paid (PKR)</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Payment Method</label>
                <select
                  value={paymentMethodChoice}
                  onChange={e => setPaymentMethodChoice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Cash">Cash at Front Desk</option>
                  <option value="Card">Credit / Debit Card</option>
                  <option value="Easypaisa">Easypaisa QR</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="Bank Transfer">Bank Transfer (IBFT/Raast)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setRecordPaymentModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl"
                >
                  Save & Reconcile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PATIENT EHR MODAL */}
      {selectedPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#131F37] text-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-xl font-bold font-display">{selectedPatientModal.name}</h3>
                <span className="text-xs text-teal-400 font-mono">Patient EHR: {selectedPatientModal.id}</span>
              </div>
              <button onClick={() => setSelectedPatientModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <span className="font-semibold">{selectedPatientModal.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Blood Group</span>
                  <span className="font-semibold">{selectedPatientModal.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">DOB</span>
                  <span className="font-semibold">{selectedPatientModal.dob}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Visits</span>
                  <span className="font-semibold">{selectedPatientModal.totalVisits}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Residential Address:</span>
                <p className="text-slate-200">{selectedPatientModal.address}</p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Emergency Contact:</span>
                <p className="text-slate-200">
                  {selectedPatientModal.emergencyContact.name} ({selectedPatientModal.emergencyContact.relation}) · {selectedPatientModal.emergencyContact.phone}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-400 font-semibold block mb-2">Recent Dental Visits for this Patient:</span>
                <div className="space-y-2">
                  {appointments
                    .filter(a => a.patientName === selectedPatientModal.name)
                    .map(a => (
                      <div key={a.id} className="p-2.5 bg-slate-900 rounded-lg flex items-center justify-between">
                        <div>
                          <strong className="text-slate-200">{a.serviceName}</strong>
                          <div className="text-[10px] text-slate-400">Dr. {a.dentistName} · {a.date} at {a.timeSlot}</div>
                        </div>
                        <span className="text-[10px] font-bold uppercase text-teal-400">{a.status}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE VIEW */}
      {selectedInvoiceView && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-2xl font-extrabold font-display text-slate-900">SMILORA</span>
                <p className="text-xs text-teal-700 font-semibold uppercase">Official Dental Practice Invoice</p>
              </div>
              <button onClick={() => setSelectedInvoiceView(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1 mb-6">
              <div className="flex justify-between">
                <span>Invoice:</span>
                <strong className="font-mono text-slate-900">{selectedInvoiceView.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Patient:</span>
                <strong className="text-slate-900">{selectedInvoiceView.patientName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Doctor:</span>
                <strong className="text-slate-900">{selectedInvoiceView.dentistName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{selectedInvoiceView.date}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-xs">
              <div className="bg-slate-50 p-2.5 font-semibold text-slate-700 flex justify-between border-b border-slate-200">
                <span>Procedure Item</span>
                <span>Fee</span>
              </div>
              {selectedInvoiceView.items.map(i => (
                <div key={i.id} className="p-3 flex justify-between text-slate-800">
                  <span>{i.description}</span>
                  <span className="font-bold tabular-nums">PKR {i.total.toLocaleString()}</span>
                </div>
              ))}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="tabular-nums">PKR {selectedInvoiceView.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold uppercase text-emerald-700">
                Status: {selectedInvoiceView.status}
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
