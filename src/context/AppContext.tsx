import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ClinicCMSConfig } from '../types';
import { storageService } from '../services/storageService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface DemoStep {
  step: number;
  title: string;
  targetRoute: string;
  adminTab?: string;
  role: UserRole | 'public';
  description: string;
}

export const DEMO_TOUR_STEPS: DemoStep[] = [
  { step: 1, title: '1. Premium Clinic Homepage', targetRoute: '/', role: 'public', description: 'Explore modern healthcare branding, trust signals, emergency call actions, and services.' },
  { step: 2, title: '2. Comprehensive Services', targetRoute: '/services', role: 'public', description: 'Browse all 16 clinical treatment categories with filter tabs and transparent starting pricing.' },
  { step: 3, title: '3. Treatment Detail Page', targetRoute: '/services/teeth-whitening', role: 'public', description: 'Patient-friendly procedure overview, clinical 4-step process, benefits, and direct booking CTA.' },
  { step: 4, title: '4. Multi-Step Booking Flow', targetRoute: '/appointment', role: 'public', description: 'Interactive 7-step booking engine with real-time double-booking prevention.' },
  { step: 5, title: '5. Patient Portal & Records', targetRoute: '/patient', role: 'patient', description: 'Patient dashboard showing confirmed appointments, digital intake forms, and treatment history.' },
  { step: 6, title: '6. Patient Treatment & Invoices', targetRoute: '/patient', role: 'patient', description: 'Inspect recommended treatment plans, procedures timeline, and outstanding balances.' },
  { step: 7, title: '7. Dentist Clinical Portal', targetRoute: '/dentist', role: 'dentist', description: 'Specialist view with today’s schedule, check-in controls, and clinical documentation notes.' },
  { step: 8, title: '8. Clinic Admin Operations', targetRoute: '/admin', adminTab: 'dashboard', role: 'super_admin', description: 'Executive healthcare KPIs: appointments, revenue, no-shows, and treatment trends.' },
  { step: 9, title: '9. Appointment Calendar & Scheduling', targetRoute: '/admin', adminTab: 'appointments', role: 'super_admin', description: 'Day/week view, status transitions (Confirm, Check-In, Complete, Reschedule, No-Show).' },
  { step: 10, title: '10. Comprehensive Patient Directory', targetRoute: '/admin', adminTab: 'patients', role: 'super_admin', description: 'Full EHR profiles, emergency contacts, medical history, invoices, and visit logs.' },
  { step: 11, title: '11. Dental Billing & Payments', targetRoute: '/admin', adminTab: 'billing', role: 'accountant', description: 'Create branded invoices, record payments (Cash, Card, Easypaisa, JazzCash), and print receipts.' },
  { step: 12, title: '12. Recall & Follow-Up Engine', targetRoute: '/admin', adminTab: 'follow-ups', role: 'receptionist', description: 'Automated 6-month hygiene reminders, post-op checks, and missed visit recovery.' },
  { step: 13, title: '13. CRM Patient Lead Pipeline', targetRoute: '/admin', adminTab: 'leads', role: 'clinic_admin', description: 'Lead conversion funnel: Inquiries → Contacted → Booked → Converted.' },
  { step: 14, title: '14. Website CMS & Revenue Reports', targetRoute: '/admin', adminTab: 'cms', role: 'content_manager', description: 'Edit live clinic banners, working hours, services, and view financial performance reports.' },
];

interface AppContextType {
  currentRole: UserRole | 'public';
  currentUser: User | null;
  setCurrentRole: (role: UserRole | 'public') => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  adminActiveTab: string;
  setAdminActiveTab: (tab: string) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  preselectedServiceId: string | null;
  setPreselectedServiceId: (id: string | null) => void;
  preselectedDentistId: string | null;
  setPreselectedDentistId: (id: string | null) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
  removeToast: (id: string) => void;
  cmsConfig: ClinicCMSConfig;
  updateCMSConfig: (cfg: Partial<ClinicCMSConfig>) => void;
  // Demo mode
  demoTourActive: boolean;
  setDemoTourActive: (active: boolean) => void;
  currentDemoStep: number;
  goToDemoStep: (stepNumber: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  lastBookedAppointmentId: string | null;
  setLastBookedAppointmentId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole | 'public'>('public');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>('/');
  const [adminActiveTab, setAdminActiveTab] = useState<string>('dashboard');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedDentistId, setPreselectedDentistId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cmsConfig, setCMSConfig] = useState<ClinicCMSConfig>(storageService.getCMSConfig());
  const [demoTourActive, setDemoTourActive] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);
  const [lastBookedAppointmentId, setLastBookedAppointmentId] = useState<string | null>(null);

  // Sync users based on role
  const setCurrentRole = (role: UserRole | 'public') => {
    setCurrentRoleState(role);
    if (role === 'public') {
      setCurrentUser(null);
    } else {
      const users = storageService.getUsers();
      const matched = users.find(u => u.role === role);
      if (matched) {
        setCurrentUser(matched);
      } else {
        setCurrentUser({
          id: `usr-${role}`,
          name: role === 'patient' ? 'Omar Farooq' : role === 'dentist' ? 'Dr. Sarah Ahmed' : 'Admin User',
          email: `${role}@smiloradental.com`,
          role: role as UserRole,
          patientId: role === 'patient' ? 'pat-1' : undefined,
          dentistId: role === 'dentist' ? 'dent-1' : undefined,
        });
      }
    }
  };

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateCMSConfig = (cfg: Partial<ClinicCMSConfig>) => {
    const updated = storageService.updateCMSConfig(cfg);
    setCMSConfig(updated);
    addToast('success', 'Website settings saved', 'Live CMS changes updated across the clinic site.');
  };

  const goToDemoStep = (stepNumber: number) => {
    const found = DEMO_TOUR_STEPS.find(s => s.step === stepNumber);
    if (found) {
      setCurrentDemoStep(stepNumber);
      setDemoTourActive(true);
      setCurrentRole(found.role);
      setActiveRoute(found.targetRoute);
      if (found.adminTab) {
        setAdminActiveTab(found.adminTab);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextDemoStep = () => {
    if (currentDemoStep < DEMO_TOUR_STEPS.length) {
      goToDemoStep(currentDemoStep + 1);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStep > 1) {
      goToDemoStep(currentDemoStep - 1);
    }
  };

  // Listen to cross-component storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCMSConfig(storageService.getCMSConfig());
    };
    window.addEventListener('smilora-state-change', handleStorageChange);
    return () => window.removeEventListener('smilora-state-change', handleStorageChange);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        setCurrentRole,
        activeRoute,
        setActiveRoute,
        adminActiveTab,
        setAdminActiveTab,
        bookingModalOpen,
        setBookingModalOpen,
        preselectedServiceId,
        setPreselectedServiceId,
        preselectedDentistId,
        setPreselectedDentistId,
        toasts,
        addToast,
        removeToast,
        cmsConfig,
        updateCMSConfig,
        demoTourActive,
        setDemoTourActive,
        currentDemoStep,
        goToDemoStep,
        nextDemoStep,
        prevDemoStep,
        lastBookedAppointmentId,
        setLastBookedAppointmentId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
