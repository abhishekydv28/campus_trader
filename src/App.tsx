import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Sparkles, 
  Package, 
  Bookmark, 
  ShieldCheck, 
  Plus, 
  Check, 
  MessageCircle,
  HelpCircle,
  Filter,
  GraduationCap
} from 'lucide-react';
import { CategoryType, ConditionType, Listing, User } from './types';
import { INITIAL_LISTINGS, MOCK_USERS, CURRENT_DEFAULT_USER } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SellModal } from './components/SellModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SafetyModal } from './components/SafetyModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Persistence state
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('campustrade_listings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LISTINGS;
  });

  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campustrade_saved_ids');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['ct-list-101'];
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('campustrade_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return CURRENT_DEFAULT_USER;
  });

  const [campusName, setCampusName] = useState<string>(() => {
    return localStorage.getItem('campustrade_campus') || 'IIT Campus · Main Tech Zone';
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'my-listings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  // Modals state
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('campustrade_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('campustrade_saved_ids', JSON.stringify(savedItemIds));
  }, [savedItemIds]);

  useEffect(() => {
    localStorage.setItem('campustrade_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('campustrade_campus', campusName);
  }, [campusName]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Save Item
  const handleToggleSave = (listingId: string) => {
    setSavedItemIds((prev) => {
      if (prev.includes(listingId)) {
        showToast('Item removed from saved items', 'info');
        return prev.filter((id) => id !== listingId);
      } else {
        showToast('Item saved to your bookmarks!', 'success');
        return [...prev, listingId];
      }
    });
  };

  // Quick WhatsApp Contact Trigger
  const handleQuickWhatsApp = (listing: Listing) => {
    const prefilledText = `Hi ${listing.seller.name.split(' ')[0]}, I saw your listing for "${listing.title}" on CampusTrade. Is it still available?`;
    const cleanPhone = listing.seller.phoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`Opening WhatsApp chat with ${listing.seller.name}...`, 'info');
  };

  // Share Listing
  const handleShareListing = (listing: Listing) => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out ${listing.title} on CampusTrade for ₹${listing.price}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#${listing.id}`);
      showToast('Listing link copied to clipboard!', 'success');
    }
  };

  // Post Listing
  const handleCreateListing = (newListing: Listing) => {
    setListings((prev) => [newListing, ...prev]);
    setActiveTab('all');
    setSelectedCategory('All');
    setSearchQuery('');
    showToast(`"${newListing.title}" published to campus feed!`, 'success');
  };

  // Delete Listing
  const handleDeleteListing = (listingId: string) => {
    setListings((prev) => prev.filter((item) => item.id !== listingId));
    if (selectedListing?.id === listingId) {
      setSelectedListing(null);
    }
    showToast('Listing removed successfully', 'info');
  };

  // Toggle Listing Status (Available <-> Sold)
  const handleToggleStatus = (listingId: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          const nextStatus = item.status === 'Available' ? 'Sold' : 'Available';
          showToast(`Listing marked as ${nextStatus}`, 'info');
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Switch campus prompt
  const handleSwitchCampusPrompt = () => {
    const defaultCampuses = [
      'IIT Campus · Main Tech Zone',
      'BITS Engineering Campus',
      'NIT Campus · Core Hostel Area',
      'College of Engineering & Tech',
      'State Technical University Campus'
    ];
    const currentIndex = defaultCampuses.indexOf(campusName);
    const nextIndex = (currentIndex + 1) % defaultCampuses.length;
    const newCampus = defaultCampuses[nextIndex];
    setCampusName(newCampus);
    showToast(`Switched campus view to: ${newCampus}`, 'info');
  };

  // Filter & Search Logic
  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Filter by Tab
    if (activeTab === 'saved') {
      result = result.filter((item) => savedItemIds.includes(item.id));
    } else if (activeTab === 'my-listings') {
      result = result.filter((item) => item.sellerId === currentUser.id);
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Condition
    if (selectedCondition !== 'All') {
      result = result.filter((item) => item.condition === selectedCondition);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.pickupLocation.toLowerCase().includes(q) ||
          (item.academicSemester && item.academicSemester.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'newest') {
      // Kept in order of created
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [listings, activeTab, savedItemIds, currentUser.id, selectedCategory, selectedCondition, searchQuery, sortBy]);

  const myListingsCount = listings.filter((item) => item.sellerId === currentUser.id).length;

  const categories: CategoryType[] = [
    'All',
    'Calculators',
    'Drawing Tools',
    'Textbooks',
    'Lab & Electronics',
    'Hostel & Misc',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Strict 3-Zone Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedItemIds.length}
        myListingsCount={myListingsCount}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        campusName={campusName}
        onSwitchCampusPrompt={handleSwitchCampusPrompt}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Uncluttered Hero & Search Header */}
        <section className="mb-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                <span>Hand-to-Hand on Campus</span>
                <span aria-hidden="true">·</span>
                <span>Zero Commission</span>
                <span aria-hidden="true">·</span>
                <span>Verified Students</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk'] text-balance">
                Engineering Academic Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Seniors declutter lab equipment, drafters &amp; books. Juniors buy verified gear at fair prices without middlemen.
              </p>
            </div>

            {/* Quick Action & Stats pill (Unboxed, clean) */}
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span className="text-slate-900 font-bold">{listings.filter(l => l.status === 'Available').length} Active Items</span>
              <span>·</span>
              <span>100% Student Verified</span>
            </div>
          </div>

          {/* Unified Search & Discovery Bar */}
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search calculators (e.g. fx-991EX), drafters, B.S. Grewal, Arduino..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40 bg-slate-50/70 border border-transparent focus:border-blue-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Condition Dropdown Controls (Compact to reduce clutter) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Sort selector */}
              <div className="relative flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-8 pr-7 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div className="relative flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="appearance-none pl-8 pr-7 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All Conditions</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Acceptable">Acceptable</option>
                </select>
              </div>
            </div>

          </div>

          {/* Clean Segmented Category Tabs (No candy pill badges) */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            {/* Reset Filter Button if applied */}
            {(selectedCategory !== 'All' || selectedCondition !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedCondition('All');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium whitespace-nowrap cursor-pointer hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Feed Header status for Saved / My Listings / Filter view */}
        {activeTab !== 'all' && (
          <div className="mb-5 flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <div className="flex items-center gap-2">
              {activeTab === 'saved' ? (
                <>
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    Your Saved Bookmarks ({filteredListings.length})
                  </span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    Your Posted Listings ({filteredListings.length})
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="text-xs text-blue-700 font-semibold hover:underline cursor-pointer"
            >
              Back to Full Marketplace
            </button>
          </div>
        )}

        {/* Product Grid with Cursor Hover Enlarge & Pop-up Effect */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ProductCard
                key={listing.id}
                listing={listing}
                currentUser={currentUser}
                isSaved={savedItemIds.includes(listing.id)}
                onToggleSave={handleToggleSave}
                onSelectListing={(item) => setSelectedListing(item)}
                onQuickWhatsApp={handleQuickWhatsApp}
                onDeleteListing={handleDeleteListing}
                onToggleStatus={handleToggleStatus}
                onShare={handleShareListing}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No Listings Found
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              {activeTab === 'saved'
                ? "You haven't bookmarked any items yet. Bookmark listings by tapping the bookmark icon on any card."
                : activeTab === 'my-listings'
                ? "You haven't posted any items for sale yet. Tap 'Sell an Item' to post calculators, books or drafters."
                : "No academic materials matched your search query or selected filter criteria."}
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedCondition('All');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                Post an Item Now
              </button>
            </div>
          </div>
        )}

        {/* Minimal Trust & Logistics Information Footer Strip */}
        <section className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-600 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs mb-0.5">Zero Brokerage &amp; Direct P2P</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  No hidden fees or payment commissions. 100% of money stays with the student.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs mb-0.5">Physical In-Person Verification</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Meet in campus common spots, test the screen or drafter arms in person, then pay.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs mb-0.5">Engineering Specific Catalog</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Categorized by calculators, ED instruments, workshop tools, and semester textbooks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold font-['Space_Grotesk'] text-slate-900">CampusTrade</span>
            <span>·</span>
            <span>Engineering Student P2P Exchange</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSafetyModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Safety Tips
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Switch Demo Persona
            </button>
            <button
              onClick={handleSwitchCampusPrompt}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {campusName.split('·')[0]}
            </button>
          </div>
        </div>
      </footer>

      {/* Product Details & Direct WhatsApp Modal (Flow A) */}
      <ProductModal
        listing={selectedListing}
        currentUser={currentUser}
        isSaved={selectedListing ? savedItemIds.includes(selectedListing.id) : false}
        onClose={() => setSelectedListing(null)}
        onToggleSave={handleToggleSave}
        onShare={handleShareListing}
        onOpenSafetyModal={() => {
          setSelectedListing(null);
          setIsSafetyModalOpen(true);
        }}
      />

      {/* Sell an Item Form Modal (Flow B) */}
      <SellModal
        isOpen={isSellModalOpen}
        currentUser={currentUser}
        onClose={() => setIsSellModalOpen(false)}
        onSubmitListing={handleCreateListing}
      />

      {/* Student Profile & Quick Demo Switcher Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        currentUser={currentUser}
        onClose={() => setIsProfileModalOpen(false)}
        onSelectUser={(user) => {
          setCurrentUser(user);
          showToast(`Switched active profile to ${user.name} (${user.yearOfStudy.split('·')[0]})`, 'info');
        }}
        onUpdateCurrentUser={(updated) => {
          setCurrentUser((prev) => ({ ...prev, ...updated }));
          showToast('Profile updated!', 'success');
        }}
      />

      {/* Safety Guidelines Modal */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      {/* Smooth Non-Intrusive Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
