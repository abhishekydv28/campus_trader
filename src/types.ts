export type CategoryType = 
  | 'All'
  | 'Calculators'
  | 'Drawing Tools'
  | 'Textbooks'
  | 'Lab & Electronics'
  | 'Hostel & Misc';

export type ConditionType = 'Like New' | 'Good' | 'Acceptable';

export type ListingStatus = 'Available' | 'Sold';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string; // e.g. "+919876543210" or "9876543210"
  yearOfStudy: string; // e.g. "4th Year · Mechanical"
  hostelOrDept: string; // e.g. "Hostel 7 / Room 312"
  avatarUrl?: string;
  rating?: number;
  dealsCompleted?: number;
}

export interface Listing {
  id: string;
  sellerId: string;
  seller: User;
  title: string;
  description: string;
  price: number; // in INR
  originalPrice?: number;
  category: CategoryType;
  condition: ConditionType;
  imageUrl: string;
  pickupLocation: string; // Campus safe meetup spot
  status: ListingStatus;
  createdAt: string;
  views: number;
  saves: number;
  academicSemester?: string; // e.g. "Sem 1-2 Common", "Sem 4 Mech"
  includedAccessories?: string[];
}
