import React from 'react';
import { X, ShieldCheck, MapPin, CheckCircle2, AlertTriangle, Cpu, Ruler } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Campus Meetup &amp; Inspection Safety Guide
              </h2>
              <p className="text-xs text-slate-500">
                Safe, zero-brokerage peer-to-peer exchanges on campus.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="font-semibold text-blue-900 text-xs sm:text-sm mb-1">
              Zero-Brokerage Direct Model
            </h3>
            <p className="text-blue-800 text-xs leading-relaxed">
              CampusTrade never charges transaction fees or commissions. You meet your college peer directly on campus, inspect the item in your own hands, and pay the student directly via UPI or cash.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus Inspection Checklist
            </h3>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <Cpu className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block text-xs">For Calculators &amp; Lab Kits</span>
                <span className="text-slate-600 text-xs">
                  Turn on the calculator, test matrix/integration calculations, verify screen contrast and key sensitivity. For Arduino/Multimeters, test continuity beep and probe wires.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <Ruler className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block text-xs">For Mini Drafters &amp; ED Tools</span>
                <span className="text-slate-600 text-xs">
                  Inspect the locking knob to ensure rulers lock firmly at 90 degrees. Verify acrylic scales have no cracks or missing millimeter marks.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block text-xs">Meet in Public Campus Areas</span>
                <span className="text-slate-600 text-xs">
                  Always arrange meetups during daylight or library hours in well-lit public campus locations like Central Library Lobby, Student Activity Center, or Department Canteens.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
