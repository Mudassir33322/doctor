import {
  Appointment,
  Dentist,
  Patient,
  Service,
  TreatmentPlan,
  Invoice,
  PaymentRecord,
  FollowUp,
  Lead,
  PatientReview,
  BlogPost,
  ClinicCMSConfig,
  AuditLog,
  User,
  AppointmentStatus,
  LeadStatus,
  TreatmentPlanStatus,
} from '../types';
import {
  initialCMSConfig,
  defaultUsers,
  sampleDentists,
  sampleServices,
  samplePatients,
  sampleAppointments,
  sampleTreatmentPlans,
  sampleInvoices,
  samplePayments,
  sampleFollowUps,
  sampleLeads,
  sampleReviews,
  sampleBlogPosts,
  sampleAuditLogs,
} from '../data/mockData';

const STORAGE_KEYS = {
  CMS: 'smilora_cms',
  USERS: 'smilora_users',
  DENTISTS: 'smilora_dentists',
  SERVICES: 'smilora_services',
  PATIENTS: 'smilora_patients',
  APPOINTMENTS: 'smilora_appointments',
  TREATMENT_PLANS: 'smilora_treatment_plans',
  INVOICES: 'smilora_invoices',
  PAYMENTS: 'smilora_payments',
  FOLLOW_UPS: 'smilora_follow_ups',
  LEADS: 'smilora_leads',
  REVIEWS: 'smilora_reviews',
  BLOG: 'smilora_blog',
  AUDIT_LOGS: 'smilora_audit_logs',
};

// Event emitter helper for instant multi-component reactivity
const emitStorageChange = (key: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('smilora-state-change', { detail: { key } }));
  }
};

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    emitStorageChange(key);
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const storageService = {
  // Reset all to sample defaults
  resetToSampleData() {
    setStoredItem(STORAGE_KEYS.CMS, initialCMSConfig);
    setStoredItem(STORAGE_KEYS.USERS, defaultUsers);
    setStoredItem(STORAGE_KEYS.DENTISTS, sampleDentists);
    setStoredItem(STORAGE_KEYS.SERVICES, sampleServices);
    setStoredItem(STORAGE_KEYS.PATIENTS, samplePatients);
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, sampleAppointments);
    setStoredItem(STORAGE_KEYS.TREATMENT_PLANS, sampleTreatmentPlans);
    setStoredItem(STORAGE_KEYS.INVOICES, sampleInvoices);
    setStoredItem(STORAGE_KEYS.PAYMENTS, samplePayments);
    setStoredItem(STORAGE_KEYS.FOLLOW_UPS, sampleFollowUps);
    setStoredItem(STORAGE_KEYS.LEADS, sampleLeads);
    setStoredItem(STORAGE_KEYS.REVIEWS, sampleReviews);
    setStoredItem(STORAGE_KEYS.BLOG, sampleBlogPosts);
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, sampleAuditLogs);
  },

  // Audit Log
  getAuditLogs(): AuditLog[] {
    return getStoredItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, sampleAuditLogs);
  },
  logAction(userName: string, userRole: any, action: string, module: string, details: string) {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userName,
      userRole,
      action,
      module,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs]);
  },

  // CMS
  getCMSConfig(): ClinicCMSConfig {
    return getStoredItem<ClinicCMSConfig>(STORAGE_KEYS.CMS, initialCMSConfig);
  },
  updateCMSConfig(config: Partial<ClinicCMSConfig>): ClinicCMSConfig {
    const current = this.getCMSConfig();
    const updated = { ...current, ...config };
    setStoredItem(STORAGE_KEYS.CMS, updated);
    this.logAction('System CMS', 'super_admin', 'CMS_UPDATED', 'CMS', 'Clinic CMS details updated.');
    return updated;
  },

  // Users
  getUsers(): User[] {
    return getStoredItem<User[]>(STORAGE_KEYS.USERS, defaultUsers);
  },

  // Dentists
  getDentists(): Dentist[] {
    return getStoredItem<Dentist[]>(STORAGE_KEYS.DENTISTS, sampleDentists);
  },
  getDentistById(id: string): Dentist | undefined {
    return this.getDentists().find(d => d.id === id || d.slug === id);
  },
  updateDentist(dentist: Dentist): void {
    const list = this.getDentists().map(d => (d.id === dentist.id ? dentist : d));
    setStoredItem(STORAGE_KEYS.DENTISTS, list);
    this.logAction('Admin', 'clinic_admin', 'DENTIST_UPDATED', 'Dentists', `Updated profile of ${dentist.name}`);
  },
  addDentist(dentist: Dentist): void {
    const list = [dentist, ...this.getDentists()];
    setStoredItem(STORAGE_KEYS.DENTISTS, list);
    this.logAction('Admin', 'clinic_admin', 'DENTIST_ADDED', 'Dentists', `Added new dentist ${dentist.name}`);
  },

  // Services
  getServices(): Service[] {
    return getStoredItem<Service[]>(STORAGE_KEYS.SERVICES, sampleServices);
  },
  getServiceBySlug(slug: string): Service | undefined {
    return this.getServices().find(s => s.slug === slug || s.id === slug);
  },
  updateService(service: Service): void {
    const list = this.getServices().map(s => (s.id === service.id ? service : s));
    setStoredItem(STORAGE_KEYS.SERVICES, list);
    this.logAction('Admin', 'clinic_admin', 'SERVICE_UPDATED', 'Services', `Updated service ${service.name}`);
  },

  // Patients
  getPatients(): Patient[] {
    return getStoredItem<Patient[]>(STORAGE_KEYS.PATIENTS, samplePatients);
  },
  getPatientById(id: string): Patient | undefined {
    return this.getPatients().find(p => p.id === id);
  },
  savePatient(patient: Patient): void {
    const list = this.getPatients();
    const existingIndex = list.findIndex(p => p.id === patient.id);
    if (existingIndex >= 0) {
      list[existingIndex] = patient;
    } else {
      list.unshift(patient);
    }
    setStoredItem(STORAGE_KEYS.PATIENTS, list);
  },

  // Appointments
  getAppointments(): Appointment[] {
    return getStoredItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, sampleAppointments);
  },
  getAppointmentById(id: string): Appointment | undefined {
    return this.getAppointments().find(a => a.id === id);
  },
  createAppointment(aptData: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const list = this.getAppointments();
    const id = `apt-${1000 + list.length + 1}`;
    const newApt: Appointment = {
      ...aptData,
      id,
      createdAt: new Date().toISOString(),
    };
    const updated = [newApt, ...list];
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, updated);

    // Also link or register patient if not already in system
    const existingPatient = this.getPatients().find(p => p.email.toLowerCase() === newApt.patientEmail.toLowerCase() || p.phone === newApt.patientPhone);
    if (!existingPatient) {
      const newPat: Patient = {
        id: `pat-${Date.now().toString().slice(-4)}`,
        name: newApt.patientName,
        email: newApt.patientEmail,
        phone: newApt.patientPhone,
        gender: 'Other',
        dob: '1995-01-01',
        address: 'Lahore, Pakistan',
        emergencyContact: { name: 'Emergency Contact', relation: 'Family', phone: newApt.patientPhone },
        createdAt: new Date().toISOString().slice(0, 10),
        nextAppointment: newApt.date,
        totalVisits: 1,
        status: 'active',
      };
      this.savePatient(newPat);
    }

    this.logAction(
      newApt.patientName,
      'patient',
      'APPOINTMENT_BOOKED',
      'Appointments',
      `Booked ${newApt.serviceName} with ${newApt.dentistName} on ${newApt.date} at ${newApt.timeSlot}`
    );

    return newApt;
  },
  updateAppointmentStatus(id: string, status: AppointmentStatus, notes?: string): void {
    const list = this.getAppointments().map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          notes: notes ? `${a.notes ? a.notes + ' | ' : ''}${notes}` : a.notes,
        };
      }
      return a;
    });
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, list);
    this.logAction('Staff', 'receptionist', 'APPOINTMENT_STATUS_CHANGE', 'Appointments', `Appointment ${id} changed to ${status}`);
  },
  rescheduleAppointment(id: string, newDate: string, newTime: string): void {
    const list = this.getAppointments().map(a => {
      if (a.id === id) {
        return {
          ...a,
          date: newDate,
          timeSlot: newTime,
          status: 'rescheduled' as AppointmentStatus,
        };
      }
      return a;
    });
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, list);
    this.logAction('Patient/Staff', 'clinic_admin', 'APPOINTMENT_RESCHEDULED', 'Appointments', `Appointment ${id} rescheduled to ${newDate} ${newTime}`);
  },

  // Check double-booking slot availability
  checkSlotAvailable(dentistId: string, date: string, timeSlot: string, excludeId?: string): boolean {
    const appointments = this.getAppointments();
    const conflict = appointments.find(
      a =>
        a.dentistId === dentistId &&
        a.date === date &&
        a.timeSlot === timeSlot &&
        a.id !== excludeId &&
        a.status !== 'cancelled'
    );
    return !conflict;
  },

  // Treatment Plans
  getTreatmentPlans(): TreatmentPlan[] {
    return getStoredItem<TreatmentPlan[]>(STORAGE_KEYS.TREATMENT_PLANS, sampleTreatmentPlans);
  },
  createTreatmentPlan(plan: Omit<TreatmentPlan, 'id' | 'createdAt' | 'updatedAt'>): TreatmentPlan {
    const list = this.getTreatmentPlans();
    const newPlan: TreatmentPlan = {
      ...plan,
      id: `tp-${500 + list.length + 1}`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setStoredItem(STORAGE_KEYS.TREATMENT_PLANS, [newPlan, ...list]);
    this.logAction(plan.dentistName, 'dentist', 'TREATMENT_PLAN_CREATED', 'Treatment Plans', `Created plan "${plan.title}" for ${plan.patientName}`);
    return newPlan;
  },
  updateTreatmentPlanStatus(id: string, status: TreatmentPlanStatus): void {
    const list = this.getTreatmentPlans().map(p => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString().slice(0, 10) } : p));
    setStoredItem(STORAGE_KEYS.TREATMENT_PLANS, list);
  },

  // Invoices & Billing
  getInvoices(): Invoice[] {
    return getStoredItem<Invoice[]>(STORAGE_KEYS.INVOICES, sampleInvoices);
  },
  createInvoice(invoice: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice {
    const list = this.getInvoices();
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${2000 + list.length + 1}`,
      invoiceNumber: `SML-2026-${(100 + list.length + 1).toString()}`,
    };
    setStoredItem(STORAGE_KEYS.INVOICES, [newInvoice, ...list]);
    this.logAction('Accounts', 'accountant', 'INVOICE_CREATED', 'Billing', `Generated invoice ${newInvoice.invoiceNumber} for ${invoice.patientName}`);
    return newInvoice;
  },
  recordPayment(invoiceId: string, amount: number, method: any): PaymentRecord {
    const invoices = this.getInvoices();
    let updatedInvoice: Invoice | undefined;

    const updatedInvoices = invoices.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = (inv.paidAmount || 0) + amount;
        const newStatus = newPaid >= inv.total ? 'paid' : 'partial';
        updatedInvoice = {
          ...inv,
          paidAmount: newPaid,
          status: newStatus as any,
          paymentMethod: method,
          paymentDate: new Date().toISOString().slice(0, 10),
        };
        return updatedInvoice;
      }
      return inv;
    });

    setStoredItem(STORAGE_KEYS.INVOICES, updatedInvoices);

    const payments = this.getPayments();
    const newPayment: PaymentRecord = {
      id: `pay-${3000 + payments.length + 1}`,
      invoiceId,
      invoiceNumber: updatedInvoice?.invoiceNumber || invoiceId,
      patientId: updatedInvoice?.patientId || 'unknown',
      patientName: updatedInvoice?.patientName || 'Guest Patient',
      amount,
      method,
      date: new Date().toISOString().slice(0, 10),
      referenceNumber: `TXN-${Math.floor(800000 + Math.random() * 190000)}`,
      status: 'completed',
    };

    setStoredItem(STORAGE_KEYS.PAYMENTS, [newPayment, ...payments]);
    this.logAction('Accounts', 'accountant', 'PAYMENT_RECORDED', 'Billing', `Recorded PKR ${amount.toLocaleString()} payment via ${method} for ${newPayment.invoiceNumber}`);
    return newPayment;
  },
  getPayments(): PaymentRecord[] {
    return getStoredItem<PaymentRecord[]>(STORAGE_KEYS.PAYMENTS, samplePayments);
  },

  // Follow-ups & Recalls
  getFollowUps(): FollowUp[] {
    return getStoredItem<FollowUp[]>(STORAGE_KEYS.FOLLOW_UPS, sampleFollowUps);
  },
  updateFollowUpStatus(id: string, status: FollowUp['status']): void {
    const list = this.getFollowUps().map(f => (f.id === id ? { ...f, status } : f));
    setStoredItem(STORAGE_KEYS.FOLLOW_UPS, list);
    this.logAction('FrontDesk', 'receptionist', 'FOLLOW_UP_UPDATED', 'Follow-ups', `Updated follow-up ${id} status to ${status}`);
  },
  createFollowUp(fu: Omit<FollowUp, 'id' | 'createdAt'>): FollowUp {
    const list = this.getFollowUps();
    const newFu: FollowUp = {
      ...fu,
      id: `fu-${400 + list.length + 1}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setStoredItem(STORAGE_KEYS.FOLLOW_UPS, [newFu, ...list]);
    return newFu;
  },

  // Leads & CRM
  getLeads(): Lead[] {
    return getStoredItem<Lead[]>(STORAGE_KEYS.LEADS, sampleLeads);
  },
  addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
    const list = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead-${600 + list.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    setStoredItem(STORAGE_KEYS.LEADS, [newLead, ...list]);
    this.logAction('CRM', 'receptionist', 'LEAD_CAPTURED', 'CRM Leads', `New lead from ${newLead.name} (${newLead.source})`);
    return newLead;
  },
  updateLeadStatus(id: string, status: LeadStatus): void {
    const list = this.getLeads().map(l => (l.id === id ? { ...l, status } : l));
    setStoredItem(STORAGE_KEYS.LEADS, list);
  },

  // Reviews
  getReviews(): PatientReview[] {
    return getStoredItem<PatientReview[]>(STORAGE_KEYS.REVIEWS, sampleReviews);
  },
  addReview(review: Omit<PatientReview, 'id' | 'date' | 'status'>): PatientReview {
    const list = this.getReviews();
    const newReview: PatientReview = {
      ...review,
      id: `rev-${list.length + 1}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    setStoredItem(STORAGE_KEYS.REVIEWS, [newReview, ...list]);
    return newReview;
  },
  updateReviewStatus(id: string, status: PatientReview['status'], featured?: boolean): void {
    const list = this.getReviews().map(r => (r.id === id ? { ...r, status, featured: featured !== undefined ? featured : r.featured } : r));
    setStoredItem(STORAGE_KEYS.REVIEWS, list);
  },

  // Blog
  getBlogPosts(): BlogPost[] {
    return getStoredItem<BlogPost[]>(STORAGE_KEYS.BLOG, sampleBlogPosts);
  },
  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find(b => b.slug === slug || b.id === slug);
  },
  saveBlogPost(post: BlogPost): void {
    const list = this.getBlogPosts();
    const idx = list.findIndex(b => b.id === post.id);
    if (idx >= 0) {
      list[idx] = post;
    } else {
      list.unshift(post);
    }
    setStoredItem(STORAGE_KEYS.BLOG, list);
    this.logAction('Editor', 'content_manager', 'BLOG_SAVED', 'Blog', `Saved article: ${post.title}`);
  },
};
