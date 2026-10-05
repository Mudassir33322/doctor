export type UserRole =
  | 'super_admin'
  | 'clinic_admin'
  | 'receptionist'
  | 'dentist'
  | 'accountant'
  | 'content_manager'
  | 'patient'
  | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  dentistId?: string;
  patientId?: string;
}

export type AppointmentStatus =
  | 'requested'
  | 'confirmed'
  | 'checked_in'
  | 'in_consultation'
  | 'completed'
  | 'cancelled'
  | 'rescheduled'
  | 'no_show';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  startingPrice: number; // PKR
  priceType: 'starting_from' | 'consultation_required' | 'fixed';
  featured: boolean;
  active: boolean;
  benefits: string[];
  processSteps: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  image?: string;
}

export interface Dentist {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  servicesOffered: string[]; // service ids
  image: string;
  rating: number;
  reviewCount: number;
  workingDays: string[]; // ['Monday', 'Tuesday', ...]
  workingHours: { start: string; end: string };
  location: string;
  featured: boolean;
  status: 'active' | 'on_leave';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  isNewPatient: boolean;
  dentistId: string;
  dentistName: string;
  serviceId: string;
  serviceName: string;
  location: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM"
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: string;
  feeEstimated: number;
  paidAmount: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup?: string;
  allergies?: string[];
  address: string;
  emergencyContact: { name: string; relation: string; phone: string };
  createdAt: string;
  lastVisit?: string;
  nextAppointment?: string;
  totalVisits: number;
  status: 'active' | 'inactive';
}

export type TreatmentPlanStatus = 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface TreatmentPlanItem {
  id: string;
  procedureName: string;
  toothNumber?: string;
  estimatedCost: number;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  title: string;
  diagnosis: string;
  totalCost: number;
  numberOfVisits: number;
  completedVisits: number;
  status: TreatmentPlanStatus;
  items: TreatmentPlanItem[];
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface ClinicalNote {
  id: string;
  appointmentId?: string;
  patientId: string;
  dentistId: string;
  dentistName: string;
  date: string;
  chiefComplaint: string;
  examinationFindings: string;
  treatmentPerformed: string;
  prescription?: string;
  followUpDate?: string;
  notes: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type PaymentMethod = 'Cash' | 'Card' | 'Bank Transfer' | 'Easypaisa' | 'JazzCash';
export type InvoiceStatus = 'pending' | 'partial' | 'paid' | 'cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  appointmentId?: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  referenceNumber: string;
  status: 'completed' | 'refunded';
}

export type FollowUpType =
  | 'treatment_follow_up'
  | 'cleaning_recall'
  | 'consultation_follow_up'
  | 'missed_appointment'
  | 'treatment_continuation';

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  type: FollowUpType;
  dueDate: string;
  dentistId?: string;
  dentistName?: string;
  status: 'pending' | 'contacted' | 'appointment_booked' | 'completed' | 'dismissed';
  notes: string;
  createdAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'appointment_booked' | 'visited' | 'converted' | 'lost';
export type LeadSource = 'website_enquiry' | 'appointment_request' | 'emergency_call' | 'whatsapp' | 'contact_form';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  serviceInterested?: string;
  notes: string;
  createdAt: string;
}

export interface PatientReview {
  id: string;
  patientName: string;
  serviceName: string;
  dentistName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  featured: boolean;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  image?: string;
  tags: string[];
  published: boolean;
}

export interface PatientForm {
  id: string;
  patientId: string;
  formType: 'new_patient_intake' | 'medical_history' | 'dental_history' | 'procedure_consent';
  title: string;
  status: 'submitted' | 'draft' | 'reviewed';
  submittedAt?: string;
  data: Record<string, any>;
}

export interface AuditLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface ClinicCMSConfig {
  clinicName: string;
  tagline: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  branchWestAddress: string;
  openingHours: string;
  heroHeadline: string;
  heroSubheadline: string;
  announcementText: string;
  announcementActive: boolean;
}
