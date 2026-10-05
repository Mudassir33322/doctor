import React, { useState } from 'react';
import { useApp, DEMO_TOUR_STEPS } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sliders,
  RotateCcw,
  Check,
  UserCheck,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { storageService } from '../../services/storageService';

export const DemoToolbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    activeRoute,
    setActiveRoute,
    demoTourActive,
    setDemoTourActive,
    currentDemoStep,
    goToDemoStep,
    nextDemoStep,
    prevDemoStep,
    setAdminActiveTab,
    addToast,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const rolesList: { label: string; role: UserRole | 'public'; desc: string }[] = [
    { label: 'Public Patient / Guest', role: 'public', desc: 'Browse services, book visits, emergency triage' },
    { label: 'Registered Patient (Omar F.)', role: 'patient', desc: 'View portal, appointments, treatment plan, forms' },
    { label: 'Dentist (Dr. Sarah Ahmed)', role: 'dentist', desc: 'Clinical queue, charts, treatment planning' },
    { label: 'Receptionist / Front Desk', role: 'receptionist', desc: 'Appointments, check-ins, follow-ups, leads' },
    { label: 'Clinic Admin / Manager', role: 'clinic_admin', desc: 'Clinic operations, dentists, services' },
    { label: 'Clinic Accountant', role: 'accountant', desc: 'Invoices, payments (PKR), financial reports' },
    { label: 'Content Manager', role: 'content_manager', desc: 'CMS, blog, reviews, hero & hours editing' },
    { label: 'Super Admin', role: 'super_admin', desc: 'Full unrestricted system & audit access' },
  ];

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (appointments, patients, treatment plans, invoices) to clean initial sample state?')) {
      storageService.resetToSampleData();
      addToast('info', 'Demo data reset', 'Clean sample records restored.');
      window.location.reload();
    }
  };

  const currentStepObj = DEMO_TOUR_STEPS.find(s => s.step === currentDemoStep) || DEMO_TOUR_STEPS[0];

  return (
    <div className="bg-[#0B1329] border-b border-slate-800 text-slate-200 text-xs select-none sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand positioning & guided tour trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px]">
              PRO
            </span>
            <span className="font-semibold text-white tracking-tight">
              Agency Portfolio Demo:
            </span>
            <span className="hidden sm:inline text-slate-400">
              Dental Clinic Digital Management & Patient Booking Platform
            </span>
          </div>

          <button
            onClick={() => {
              if (!demoTourActive) {
                goToDemoStep(1);
              } else {
                setDemoTourActive(false);
              }
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              demoTourActive
                ? 'bg-teal-500 text-slate-950 font-semibold shadow'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{demoTourActive ? `Guided Tour (Step ${currentDemoStep}/14)` : 'Start Client Demo Flow'}</span>
          </button>
        </div>

        {/* Middle: Guided Tour Controls if active */}
        {demoTourActive && (
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-lg border border-teal-500/30">
            <button
              onClick={prevDemoStep}
              disabled={currentDemoStep <= 1}
              className="p-1 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
              title="Previous Step"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-teal-300 font-semibold whitespace-nowrap">
              {currentStepObj.title}
            </span>
            <button
              onClick={nextDemoStep}
              disabled={currentDemoStep >= DEMO_TOUR_STEPS.length}
              className="p-1 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
              title="Next Step"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right: Quick Portals and Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Direct Portal Switcher */}
          <div className="hidden lg:flex items-center bg-slate-900 rounded-md p-0.5 border border-slate-800">
            <button
              onClick={() => {
                setActiveRoute('/');
                setCurrentRole('public');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeRoute === '/' && currentRole === 'public'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Public Site
            </button>
            <button
              onClick={() => {
                setActiveRoute('/patient');
                setCurrentRole('patient');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeRoute === '/patient'
                  ? 'bg-slate-800 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Patient Portal
            </button>
            <button
              onClick={() => {
                setActiveRoute('/dentist');
                setCurrentRole('dentist');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeRoute === '/dentist'
                  ? 'bg-slate-800 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dentist View
            </button>
            <button
              onClick={() => {
                setActiveRoute('/admin');
                setAdminActiveTab('dashboard');
                setCurrentRole('super_admin');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeRoute === '/admin'
                  ? 'bg-teal-500/20 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Portal
            </button>
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium truncate max-w-[120px]">
                {rolesList.find(r => r.role === currentRole)?.label.split(' ')[0] || 'Role'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 text-[11px] text-slate-400 border-b border-slate-800 font-medium">
                  Switch Active Role Persona
                </div>
                {rolesList.map(item => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setCurrentRole(item.role);
                      if (item.role === 'patient') setActiveRoute('/patient');
                      else if (item.role === 'dentist') setActiveRoute('/dentist');
                      else if (item.role === 'public') setActiveRoute('/');
                      else {
                        setActiveRoute('/admin');
                        if (item.role === 'accountant') setAdminActiveTab('billing');
                        else if (item.role === 'content_manager') setAdminActiveTab('cms');
                        else if (item.role === 'receptionist') setAdminActiveTab('appointments');
                        else setAdminActiveTab('dashboard');
                      }
                      setRoleDropdownOpen(false);
                      addToast('info', `Switched Role to ${item.label}`);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-start gap-2 transition-colors ${
                      currentRole === item.role ? 'bg-slate-800/80 text-teal-300' : 'text-slate-300'
                    }`}
                  >
                    <div className="mt-0.5">
                      {currentRole === item.role ? (
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={handleResetData}
            title="Reset demo data to initial state"
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-300 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guided Tour Explainer Bar if active */}
      {demoTourActive && (
        <div className="bg-teal-950/70 border-t border-teal-800/40 px-4 py-1.5 text-xs text-teal-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Tour Insight:</span>
              <span className="text-teal-100">{currentStepObj.description}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] text-teal-300/80">Step {currentDemoStep} of 14</span>
              <button
                onClick={() => setDemoTourActive(false)}
                className="text-[11px] text-teal-400 hover:text-white underline ml-2"
              >
                Exit Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
