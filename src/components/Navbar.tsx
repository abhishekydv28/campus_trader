import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Bookmark, 
  Package, 
  ShieldCheck, 
  User as UserIcon, 
  ChevronDown,
  Sparkles,
  ArrowRightLeft,
  GraduationCap,
  ExternalLink,
  Info
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User;
  activeTab: 'all' | 'saved' | 'my-listings';
  setActiveTab: (tab: 'all' | 'saved' | 'my-listings') => void;
  savedCount: number;
  myListingsCount: number;
  onOpenSellModal: () => void;
  onOpenSafetyModal: () => void;
  onOpenProfileModal: () => void;
  campusName: string;
  onSwitchCampusPrompt: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  savedCount,
  myListingsCount,
  onOpenSellModal,
  onOpenSafetyModal,
  onOpenProfileModal,
  campusName,
  onSwitchCampusPrompt
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Clean Brand Wordmark & Subtle Campus Location Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className="text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="font-['Space_Grotesk'] tracking-tight">CT</span>
              </div>
              <div>
                <span className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  CampusTrade
                </span>
                <span className="hidden sm:inline-block ml-2 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Zero Brokerage
                </span>
              </div>
            </button>

            {/* Quick Campus Pill Switcher */}
            <button
              onClick={onSwitchCampusPrompt}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-md transition-colors cursor-pointer"
              title="Click to switch campus"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate max-w-[130px] font-medium">{campusName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with active indicator) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore Feed
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'saved'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="text-xs bg-slate-200 text-slate-700 font-mono rounded-full px-1.5 py-0.2">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('my-listings')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'my-listings'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Listings</span>
              {myListingsCount > 0 && (
                <span className="text-xs bg-blue-100 text-blue-700 font-mono font-medium rounded-full px-1.5 py-0.2">
                  {myListingsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Intuitive 3-Dot Profile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Primary CTA: Sell an Item */}
            <button
              onClick={onOpenSellModal}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-sm hover:shadow-blue-500/20 transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Sell an Item</span>
            </button>

            {/* Three-dot & User Menu Wrapper */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 sm:px-2.5 sm:py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl transition-colors cursor-pointer focus:outline-none"
                aria-label="User and site options"
                aria-expanded={menuOpen}
              >
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="font-semibold text-slate-800 block truncate max-w-[90px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate">
                    {currentUser.yearOfStudy.split('·')[0]}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Intuitive Clean Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 text-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Current Account Card */}
                  <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
                    <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500">{currentUser.yearOfStudy}</div>
                    <div className="text-[11px] text-blue-600 font-mono mt-0.5">{currentUser.hostelOrDept}</div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="md:hidden py-1 border-b border-slate-100">
                    <button
                      onClick={() => {
                        setActiveTab('all');
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 ${activeTab === 'all' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'hover:bg-slate-50'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Explore All Feed
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('saved');
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between ${activeTab === 'saved' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-3.5 h-3.5" />
                        Saved Items
                      </div>
                      {savedCount > 0 && (
                        <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded-full font-mono">
                          {savedCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('my-listings');
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between ${activeTab === 'my-listings' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className="w-3.5 h-3.5" />
                        My Active Listings
                      </div>
                      {myListingsCount > 0 && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full font-mono">
                          {myListingsCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Actions & Settings */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenProfileModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                      Switch Student Profile / Test Mode
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenSafetyModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Campus In-Person Safety Guide
                    </button>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onSwitchCampusPrompt();
                      }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 md:hidden"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      Change Campus ({campusName})
                    </button>
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100 px-4 py-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Zero-Commission P2P</span>
                      <span className="font-mono text-emerald-600 font-medium">0% Fee</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
