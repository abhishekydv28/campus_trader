import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Mail, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Award, 
  HelpCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Listing, User } from '../types';

interface ProductModalProps {
  listing: Listing | null;
  currentUser: User;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (listingId: string) => void;
  onShare: (listing: Listing) => void;
  onOpenSafetyModal: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  listing,
  currentUser,
  isSaved,
  onClose,
  onToggleSave,
  onShare,
  onOpenSafetyModal,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!listing) return null;

  const isOwner = currentUser.id === listing.sellerId;

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

  // Formulate pre-filled WhatsApp message as specified in PRD Flow A
  const prefilledText = `Hi ${listing.seller.name.split(' ')[0]}, I saw your listing for "${listing.title}" on CampusTrade. Is it still available? Can we meet up at ${listing.pickupLocation}?`;
  const whatsappUrl = `https://wa.me/${listing.seller.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(prefilledText)}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(listing.seller.phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(prefilledText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center border border-slate-200 shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="w-full md:w-1/2 bg-slate-50 flex flex-col items-center justify-center relative p-6 border-b md:border-b-0 md:border-r border-slate-200/80">
          <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200/70 relative">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {listing.status === 'Sold' && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-wider uppercase bg-rose-600 px-4 py-1.5 rounded-lg shadow-lg">
                  Item Sold
                </span>
              </div>
            )}
          </div>

          {/* Quick Item Attributes */}
          <div className="w-full max-w-md mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex flex-col">
              <span className="text-slate-400 font-medium">Condition</span>
              <span className="font-semibold text-slate-800">{listing.condition}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex flex-col">
              <span className="text-slate-400 font-medium">Category</span>
              <span className="font-semibold text-slate-800 truncate">{listing.category}</span>
            </div>
          </div>

          {/* Safety Micro-Banner */}
          <div className="w-full max-w-md mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-emerald-50/70 border border-emerald-200/60 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Brokerage: Pay in-person via UPI or cash</span>
            </div>
            <button
              onClick={onOpenSafetyModal}
              className="text-emerald-700 underline font-medium hover:text-emerald-900 cursor-pointer"
            >
              Safety Tips
            </button>
          </div>
        </div>

        {/* Right Column: Information & Direct Seller Contact */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 overflow-y-auto flex flex-col justify-between max-h-[85vh] md:max-h-[90vh]">
          <div>
            {/* Category and Sub-semester */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                {listing.category}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onToggleSave(listing.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                  }`}
                  title={isSaved ? 'Saved' : 'Save Item'}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onShare(listing)}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Share Listing"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {listing.title}
            </h2>

            {/* Price section */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {formatPrice(listing.price)}
              </span>
              {listing.originalPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through font-mono">
                  {formatPrice(listing.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Verified Student Seller Profile Card */}
            <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900 text-sm">{listing.seller.name}</span>
                      <span title="Verified Campus Student">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{listing.seller.yearOfStudy}</p>
                  </div>
                </div>
                {listing.seller.rating && (
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs font-mono">
                      ★ {listing.seller.rating}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{listing.seller.dealsCompleted || 4} deals done</p>
                  </div>
                )}
              </div>

              {/* Campus Meetup Spot */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium text-slate-700">Preferred Meetup Spot:</span>
                <span className="font-semibold text-slate-900">{listing.pickupLocation}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Item Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Included Accessories */}
            {listing.includedAccessories && listing.includedAccessories.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  What's Included
                </h3>
                <ul className="space-y-1.5">
                  {listing.includedAccessories.map((acc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Zone: WhatsApp Direct Message (Zero Brokerage Flow) */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            {isOwner ? (
              <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium text-center border border-blue-200">
                This is your listing. You can manage or mark it as sold in the "My Listings" tab.
              </div>
            ) : (
              <>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Contact on WhatsApp (Direct Deal)</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>

                {/* Secondary Contact Actions in clean compact row */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied: {listing.seller.phoneNumber}</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Phone: {listing.seller.phoneNumber}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${listing.seller.email}?subject=${encodeURIComponent(`CampusTrade: ${listing.title}`)}&body=${encodeURIComponent(prefilledText)}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email Seller</span>
                  </a>
                </div>

                {/* Pre-filled Message Peek */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start justify-between gap-2">
                  <div className="italic">
                    "{prefilledText}"
                  </div>
                  <button
                    onClick={handleCopyMessage}
                    className="text-blue-600 hover:text-blue-800 font-medium shrink-0 flex items-center gap-1 cursor-pointer"
                    title="Copy message draft"
                  >
                    {copiedMessage ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMessage ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
