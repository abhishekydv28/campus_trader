import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  MoreVertical, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ShieldCheck, 
  Eye,
  Check
} from 'lucide-react';
import { Listing, User } from '../types';

interface ProductCardProps {
  listing: Listing;
  currentUser: User;
  isSaved: boolean;
  onToggleSave: (listingId: string) => void;
  onSelectListing: (listing: Listing) => void;
  onQuickWhatsApp: (listing: Listing) => void;
  onDeleteListing?: (listingId: string) => void;
  onToggleStatus?: (listingId: string) => void;
  onShare: (listing: Listing) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  listing,
  currentUser,
  isSaved,
  onToggleSave,
  onSelectListing,
  onQuickWhatsApp,
  onDeleteListing,
  onToggleStatus,
  onShare,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOwner = currentUser.id === listing.sellerId;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const discountPercent = listing.originalPrice 
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelectListing(listing)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden cursor-pointer will-change-transform"
    >
      {/* Visual Image Showcase with Smooth Zoom */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle Top Floating Bar inside Card: Category & 3-Dot Menu */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
          {/* Category kicker */}
          <span className="text-[11px] font-semibold text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/60">
            {listing.category}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Quick Bookmark Button */}
            <button
              onClick={() => onToggleSave(listing.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-sm ${
                isSaved
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white/95 text-slate-700 hover:text-blue-600 hover:bg-white border border-slate-200/60'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
              aria-label="Bookmark item"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Three Dot Menu to hide non-essential features and reduce cognitive load */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full bg-white/95 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/60 flex items-center justify-center backdrop-blur-md shadow-sm transition-colors cursor-pointer"
                aria-label="Item options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-xs text-slate-700 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onShare(listing);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    Share Listing
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onSelectListing(listing);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    View Full Details
                  </button>

                  {isOwner && onToggleStatus && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onToggleStatus(listing.id);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-indigo-600"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark as {listing.status === 'Available' ? 'Sold' : 'Available'}
                    </button>
                  )}

                  {isOwner && onDeleteListing && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onDeleteListing(listing.id);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 border-t border-slate-100 mt-1 pt-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Listing
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Overlays */}
        {listing.status === 'Sold' && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-slate-900 font-bold text-xs uppercase px-3 py-1 rounded-md tracking-wider shadow-lg">
              Marked as Sold
            </span>
          </div>
        )}
      </div>

      {/* Card Content - Clean, High Scannability, Important Things Only */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata Row: Condition & Posted time */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
            <span className="text-slate-800 font-semibold">{listing.condition}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{listing.createdAt}</span>
            {listing.academicSemester && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="truncate max-w-[120px]">{listing.academicSemester}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
        </div>

        {/* Pricing & Campus Meetup Location */}
        <div className="pt-2 border-t border-slate-100/90 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 font-mono tracking-tight">
                {formatPrice(listing.price)}
              </span>
              {listing.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatPrice(listing.originalPrice)}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Quick Meetup Location & Seller Year */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 gap-1">
            <div className="flex items-center gap-1 truncate text-slate-600" title={listing.pickupLocation}>
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{listing.pickupLocation}</span>
            </div>
            <span className="shrink-0 text-slate-400 font-mono">
              {listing.seller.yearOfStudy.split('·')[0]}
            </span>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onQuickWhatsApp(listing)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Contact on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
