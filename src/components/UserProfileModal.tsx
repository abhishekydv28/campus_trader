import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  GraduationCap, 
  Phone, 
  Mail, 
  Building, 
  Check, 
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { User } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onSelectUser: (user: User) => void;
  onUpdateCurrentUser: (updated: Partial<User>) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSelectUser,
  onUpdateCurrentUser,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [yearOfStudy, setYearOfStudy] = useState(currentUser.yearOfStudy);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [hostelOrDept, setHostelOrDept] = useState(currentUser.hostelOrDept);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCurrentUser({
      name: name.trim(),
      yearOfStudy: yearOfStudy.trim(),
      phoneNumber: phoneNumber.trim(),
      hostelOrDept: hostelOrDept.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
              Campus Student Profile &amp; Switcher
            </h2>
            <p className="text-xs text-slate-500">
              Switch role between Senior Seller or Junior Buyer for demo testing.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Quick Profile Switcher for Hackathon Judges & Users */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Role Switch (Demo Personas)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MOCK_USERS.map((user) => {
                const isActive = currentUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      onSelectUser(user);
                      setName(user.name);
                      setYearOfStudy(user.yearOfStudy);
                      setPhoneNumber(user.phoneNumber);
                      setHostelOrDept(user.hostelOrDept);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      {isActive && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="mt-2">
                      <div className="font-semibold text-slate-900 text-xs truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.yearOfStudy}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Edit Current Profile Details Form */}
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Edit Active Profile Details
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Year of Study &amp; Department
              </label>
              <input
                type="text"
                placeholder="e.g. 4th Year · Mechanical Engineering"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 919876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hostel / Academic Block
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hostel 9, Room 204"
                  value={hostelOrDept}
                  onChange={(e) => setHostelOrDept(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                {savedSuccess ? 'Saved!' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
