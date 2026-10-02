import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  DollarSign, 
  Tag, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { CategoryType, ConditionType, Listing, User } from '../types';
import { PRESET_IMAGE_TEMPLATES, CAMPUS_LOCATIONS } from '../data/mockData';

interface SellModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onSubmitListing: (listing: Listing) => void;
}

export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSubmitListing,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Calculators');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState<ConditionType>('Like New');
  const [description, setDescription] = useState('');
  const [pickupLocation, setPickupLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [customPickupLocation, setCustomPickupLocation] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>('calculator');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadedImageData, setUploadedImageData] = useState<string>('');
  const [academicSemester, setAcademicSemester] = useState('Sem 1-2 Common');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageData(reader.result as string);
        setSelectedPresetImage('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const getEffectiveImage = () => {
    if (uploadedImageData) return uploadedImageData;
    if (customImageUrl.trim()) return customImageUrl.trim();
    if (selectedPresetImage === 'drafter') return PRESET_IMAGE_TEMPLATES.drafter;
    if (selectedPresetImage === 'textbooks') return PRESET_IMAGE_TEMPLATES.textbooks;
    if (selectedPresetImage === 'arduino') return PRESET_IMAGE_TEMPLATES.arduino;
    if (selectedPresetImage === 'multimeter') return PRESET_IMAGE_TEMPLATES.multimeter;
    if (selectedPresetImage === 'engineeringKit') return PRESET_IMAGE_TEMPLATES.engineeringKit;
    return PRESET_IMAGE_TEMPLATES.calculator;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a listing title (e.g. Casio fx-991EX)');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Please specify a valid selling price in ₹');
      return;
    }

    const effectiveLocation = customPickupLocation.trim() 
      ? customPickupLocation.trim() 
      : pickupLocation;

    const newListing: Listing = {
      id: `ct-item-${Date.now()}`,
      sellerId: currentUser.id,
      seller: currentUser,
      title: title.trim(),
      description: description.trim() || 'Clean, tested engineering item available for in-person campus handover.',
      price: numPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      condition,
      imageUrl: getEffectiveImage(),
      pickupLocation: effectiveLocation,
      status: 'Available',
      createdAt: 'Just now',
      views: 1,
      saves: 0,
      academicSemester: academicSemester.trim(),
      includedAccessories: ['Original physical item', 'Direct in-person campus inspection']
    };

    onSubmitListing(newListing);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
              Post an Item for Sale
            </h2>
            <p className="text-xs text-slate-500">
              Zero platform fees. Connect directly with juniors on campus.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Item Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Casio fx-991EX ClassWiz or Mini Drafter"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Category & Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as CategoryType;
                  setCategory(cat);
                  if (cat === 'Calculators') setSelectedPresetImage('calculator');
                  else if (cat === 'Drawing Tools') setSelectedPresetImage('drafter');
                  else if (cat === 'Textbooks') setSelectedPresetImage('textbooks');
                  else if (cat === 'Lab & Electronics') setSelectedPresetImage('arduino');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Calculators">Calculators &amp; Electronics</option>
                <option value="Drawing Tools">Drawing Tools (ED)</option>
                <option value="Textbooks">Textbooks &amp; Reference</option>
                <option value="Lab & Electronics">Lab &amp; Microcontrollers</option>
                <option value="Hostel & Misc">Hostel &amp; Misc Items</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Like New">Like New (Mint / Barely used)</option>
                <option value="Good">Good (Working with minor marks)</option>
                <option value="Acceptable">Acceptable (Fully functional)</option>
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Price (₹ INR) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold font-mono text-sm">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 850"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Original Retail MRP (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold font-mono text-sm">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 1600"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Campus Meetup Spot */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Campus Handover Spot <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={pickupLocation}
                onChange={(e) => {
                  setPickupLocation(e.target.value);
                  if (e.target.value !== 'Other') setCustomPickupLocation('');
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
                <option value="Other">Custom Location...</option>
              </select>

              {pickupLocation === 'Other' && (
                <input
                  type="text"
                  placeholder="e.g. Hostel 4 Gate or Nescafe Canteen"
                  value={customPickupLocation}
                  onChange={(e) => setCustomPickupLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              )}
            </div>
          </div>

          {/* Visual Asset / Photo Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Item Visual Presentation
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {[
                { id: 'calculator', label: 'Calculator', img: PRESET_IMAGE_TEMPLATES.calculator },
                { id: 'drafter', label: 'Drafter', img: PRESET_IMAGE_TEMPLATES.drafter },
                { id: 'textbooks', label: 'Textbooks', img: PRESET_IMAGE_TEMPLATES.textbooks },
                { id: 'arduino', label: 'Arduino Kit', img: PRESET_IMAGE_TEMPLATES.arduino },
                { id: 'multimeter', label: 'Multimeter', img: PRESET_IMAGE_TEMPLATES.multimeter },
                { id: 'engineeringKit', label: 'Tool Kit', img: PRESET_IMAGE_TEMPLATES.engineeringKit },
              ].map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => {
                    setSelectedPresetImage(preset.id);
                    setUploadedImageData('');
                  }}
                  className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPresetImage === preset.id && !uploadedImageData
                      ? 'border-blue-600 ring-2 ring-blue-600/30 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-1">
                    <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-700 block truncate">{preset.label}</span>
                </button>
              ))}
            </div>

            {/* Upload or Image URL fallback */}
            <div className="flex flex-col sm:flex-row gap-2 items-center text-xs">
              <label className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-200">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo / Screenshot</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-slate-400 hidden sm:inline">or</span>

              <input
                type="url"
                placeholder="Or paste image URL (https://...)"
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                  setUploadedImageData('');
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description &amp; Specifications
            </label>
            <textarea
              rows={3}
              placeholder="Describe condition, what is included, any warranty, tips for semester exams..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Seller Preview Info */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800">Posting as:</span> {currentUser.name} ({currentUser.yearOfStudy.split('·')[0]})
            </div>
            <span className="font-mono text-emerald-600 font-semibold">WhatsApp: +{currentUser.phoneNumber}</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              Publish Listing (Free)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
