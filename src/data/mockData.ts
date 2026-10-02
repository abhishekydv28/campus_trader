import { User, Listing } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    phoneNumber: '919876543210',
    yearOfStudy: '4th Year · Mechanical Engg',
    hostelOrDept: 'Hostel 9, Room B-204',
    rating: 4.9,
    dealsCompleted: 8,
  },
  {
    id: 'user-priya',
    name: 'Priya Patel',
    email: 'priya.patel@campus.edu',
    phoneNumber: '919812345678',
    yearOfStudy: '3rd Year · Electronics & Comm',
    hostelOrDept: 'Hostel 3, Room 118',
    rating: 5.0,
    dealsCompleted: 5,
  },
  {
    id: 'user-rohan',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@campus.edu',
    phoneNumber: '919823456789',
    yearOfStudy: 'Final Year · Computer Science',
    hostelOrDept: 'Main Academic Block / Mech Lab',
    rating: 4.8,
    dealsCompleted: 12,
  },
  {
    id: 'user-ananya',
    name: 'Ananya Roy',
    email: 'ananya.roy@campus.edu',
    phoneNumber: '919834567890',
    yearOfStudy: '3rd Year · Civil Engg',
    hostelOrDept: 'Girls Hostel 2, Room 402',
    rating: 4.9,
    dealsCompleted: 4,
  }
];

export const CURRENT_DEFAULT_USER = MOCK_USERS[0];

// High quality curated SVG image illustrations for each category to guarantee zero broken images and instant load
export const PRESET_IMAGE_TEMPLATES = {
  calculator: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <defs>
        <linearGradient id="calcBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#A7F3D0"/>
          <stop offset="100%" stop-color="#6EE7B7"/>
        </linearGradient>
        <linearGradient id="metalKey" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="#F1F5F9"/>
      <!-- Grid Paper background -->
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" stroke-width="1"/>
      </pattern>
      <rect width="600" height="450" fill="url(#grid)" />
      
      <!-- Calculator Body -->
      <g transform="translate(180, 40)">
        <rect x="0" y="0" width="240" height="370" rx="24" fill="url(#calcBg)" filter="drop-shadow(0px 20px 25px rgba(15,23,42,0.25))"/>
        <!-- Brand banner -->
        <text x="30" y="38" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">CASIO · CLASSWIZ</text>
        <text x="140" y="38" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="10" font-weight="600">fx-991EX</text>
        <rect x="175" y="24" width="38" height="18" rx="3" fill="#334155" stroke="#475569" stroke-width="1"/>
        <text x="181" y="37" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="8">SOLAR</text>

        <!-- LCD Screen -->
        <rect x="25" y="52" width="190" height="68" rx="8" fill="url(#screenGrad)" stroke="#047857" stroke-width="2"/>
        <text x="35" y="78" fill="#064E3B" font-family="monospace" font-size="14" font-weight="bold">∫(3x² + 2x - 4)dx</text>
        <text x="120" y="106" fill="#064E3B" font-family="monospace" font-size="20" font-weight="bold">= 42.857</text>

        <!-- Functional Keys -->
        <g transform="translate(25, 135)">
          <!-- Top nav row -->
          <circle cx="20" cy="12" r="10" fill="#E11D48"/>
          <circle cx="55" cy="12" r="10" fill="#3B82F6"/>
          <ellipse cx="95" cy="12" rx="20" ry="12" fill="#0284C7"/>
          <circle cx="135" cy="12" r="10" fill="#475569"/>
          <circle cx="170" cy="12" r="10" fill="#475569"/>

          <!-- Key matrix rows -->
          <rect x="5" y="35" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="42" y="35" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="80" y="35" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="118" y="35" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="155" y="35" width="30" height="18" rx="4" fill="url(#metalKey)"/>

          <rect x="5" y="62" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="42" y="62" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="80" y="62" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="118" y="62" width="30" height="18" rx="4" fill="url(#metalKey)"/>
          <rect x="155" y="62" width="30" height="18" rx="4" fill="url(#metalKey)"/>

          <!-- Numeric Numpad -->
          <rect x="10" y="94" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="24" y="112" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">7</text>
          <rect x="54" y="94" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="68" y="112" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">8</text>
          <rect x="98" y="94" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="112" y="112" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">9</text>
          <rect x="142" y="94" width="38" height="26" rx="6" fill="#EA580C"/>
          <text x="152" y="112" fill="#FFF" font-family="system-ui" font-weight="bold" font-size="12">DEL</text>

          <rect x="10" y="128" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="24" y="146" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">4</text>
          <rect x="54" y="128" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="68" y="146" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">5</text>
          <rect x="98" y="128" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="112" y="146" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">6</text>
          <rect x="142" y="128" width="38" height="26" rx="6" fill="#E11D48"/>
          <text x="153" y="146" fill="#FFF" font-family="system-ui" font-weight="bold" font-size="12">AC</text>

          <rect x="10" y="162" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="24" y="180" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">1</text>
          <rect x="54" y="162" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="68" y="180" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">2</text>
          <rect x="98" y="162" width="36" height="26" rx="6" fill="#F8FAFC"/>
          <text x="112" y="180" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">3</text>
          <rect x="142" y="162" width="38" height="26" rx="6" fill="#3B82F6"/>
          <text x="156" y="180" fill="#FFF" font-family="system-ui" font-weight="bold" font-size="15">×</text>

          <rect x="10" y="194" width="36" height="24" rx="6" fill="#F8FAFC"/>
          <text x="24" y="211" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">0</text>
          <rect x="54" y="194" width="36" height="24" rx="6" fill="#F8FAFC"/>
          <text x="70" y="211" fill="#0F172A" font-family="system-ui" font-weight="bold" font-size="14">·</text>
          <rect x="98" y="194" width="82" height="24" rx="6" fill="#2563EB"/>
          <text x="134" y="211" fill="#FFF" font-family="system-ui" font-weight="bold" font-size="16">=</text>
        </g>
      </g>
    </svg>
  `)}`,

  drafter: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <defs>
        <linearGradient id="drafterBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F8FAFC"/>
          <stop offset="100%" stop-color="#E2E8F0"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#drafterBg)"/>
      <!-- Blueprint drafting sheet -->
      <rect x="40" y="30" width="520" height="390" rx="8" fill="#1E3A8A" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.15))"/>
      <!-- Blueprint Grid lines -->
      <pattern id="bpGrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#2563EB" stroke-width="0.75" stroke-opacity="0.6"/>
      </pattern>
      <rect x="40" y="30" width="520" height="390" fill="url(#bpGrid)" rx="8"/>
      <!-- Technical title block on sheet -->
      <rect x="360" y="340" width="180" height="65" fill="#172554" stroke="#60A5FA" stroke-width="1"/>
      <text x="370" y="360" fill="#93C5FD" font-family="monospace" font-size="10">COLLEGE OF ENGINEERING</text>
      <text x="370" y="378" fill="#FFFFFF" font-family="monospace" font-size="12" font-weight="bold">MACHINE DRAWING - ED-01</text>
      <text x="370" y="394" fill="#60A5FA" font-family="monospace" font-size="9">SCALE: 1:1 · ISOMETRIC</text>

      <!-- Mini Drafter Clamp on Edge -->
      <rect x="60" y="30" width="45" height="55" rx="6" fill="#334155" stroke="#0F172A" stroke-width="2"/>
      <circle cx="82" cy="55" r="10" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <circle cx="82" cy="55" r="4" fill="#0F172A"/>

      <!-- Parallel Arm 1 -->
      <line x1="82" y1="55" x2="220" y2="160" stroke="#0284C7" stroke-width="10" stroke-linecap="round"/>
      <line x1="94" y1="65" x2="232" y2="170" stroke="#0369A1" stroke-width="10" stroke-linecap="round"/>
      <circle cx="226" cy="165" r="14" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>

      <!-- Parallel Arm 2 -->
      <line x1="226" y1="165" x2="310" y2="210" stroke="#0284C7" stroke-width="10" stroke-linecap="round"/>
      <line x1="234" y1="175" x2="318" y2="220" stroke="#0369A1" stroke-width="10" stroke-linecap="round"/>

      <!-- Protractor Head -->
      <circle cx="314" cy="215" r="32" fill="#E2E8F0" stroke="#0F172A" stroke-width="3"/>
      <circle cx="314" cy="215" r="18" fill="#F8FAFC" stroke="#64748B" stroke-width="1"/>
      <circle cx="314" cy="215" r="5" fill="#EF4444"/>
      
      <!-- Scaled Rulers (L-shape) -->
      <!-- Horizontal Ruler with markings -->
      <rect x="314" y="207" width="170" height="24" rx="2" fill="rgba(255,255,255,0.85)" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="330" y1="207" x2="330" y2="217" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="350" y1="207" x2="350" y2="214" stroke="#0F172A" stroke-width="1"/>
      <line x1="370" y1="207" x2="370" y2="217" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="390" y1="207" x2="390" y2="214" stroke="#0F172A" stroke-width="1"/>
      <line x1="410" y1="207" x2="410" y2="217" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="430" y1="207" x2="430" y2="214" stroke="#0F172A" stroke-width="1"/>
      <line x1="450" y1="207" x2="450" y2="217" stroke="#0F172A" stroke-width="1.5"/>

      <!-- Vertical Ruler -->
      <rect x="302" y="215" width="24" height="150" rx="2" fill="rgba(255,255,255,0.85)" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="316" y1="235" x2="326" y2="235" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="319" y1="255" x2="326" y2="255" stroke="#0F172A" stroke-width="1"/>
      <line x1="316" y1="275" x2="326" y2="275" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="319" y1="295" x2="326" y2="295" stroke="#0F172A" stroke-width="1"/>
      <line x1="316" y1="315" x2="326" y2="315" stroke="#0F172A" stroke-width="1.5"/>
      <line x1="319" y1="335" x2="326" y2="335" stroke="#0F172A" stroke-width="1"/>
    </svg>
  `)}`,

  textbooks: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <rect width="600" height="450" fill="#F8FAFC"/>
      <!-- Desk wood grain tone -->
      <rect x="0" y="320" width="600" height="130" fill="#E2E8F0"/>
      <line x1="0" y1="320" x2="600" y2="320" stroke="#CBD5E1" stroke-width="2"/>

      <!-- Stack of Books -->
      <!-- Book 1 (Bottom) -->
      <g transform="translate(120, 250)">
        <rect x="0" y="0" width="360" height="55" rx="6" fill="#1E293B" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.15))"/>
        <rect x="0" y="8" width="40" height="40" fill="#0F172A"/>
        <line x1="45" y1="0" x2="45" y2="55" stroke="#334155" stroke-width="3"/>
        <text x="70" y="34" fill="#F1F5F9" font-family="system-ui, sans-serif" font-weight="700" font-size="16">HIGHER ENGINEERING MATHEMATICS · B.S. GREWAL</text>
        <rect x="350" y="5" width="8" height="45" fill="#E2E8F0"/>
      </g>

      <!-- Book 2 (Middle) -->
      <g transform="translate(145, 185)">
        <rect x="0" y="0" width="310" height="50" rx="6" fill="#0369A1" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.12))"/>
        <rect x="0" y="6" width="35" height="38" fill="#075985"/>
        <line x1="40" y1="0" x2="40" y2="50" stroke="#38BDF8" stroke-width="2"/>
        <text x="60" y="31" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="15">THERMODYNAMICS: AN ENGINEERING APPROACH</text>
        <rect x="300" y="5" width="8" height="40" fill="#E2E8F0"/>
      </g>

      <!-- Book 3 (Top) -->
      <g transform="translate(170, 125)">
        <rect x="0" y="0" width="260" height="46" rx="6" fill="#0D9488" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.12))"/>
        <line x1="35" y1="0" x2="35" y2="46" stroke="#5EEAD4" stroke-width="2"/>
        <text x="50" y="28" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14">DATA STRUCTURES &amp; ALGORITHMS IN C++</text>
        <rect x="250" y="5" width="8" height="36" fill="#F0FDFA"/>
      </g>
      
      <!-- Bookmark ribbon -->
      <path d="M 230 120 L 230 160 L 240 150 L 250 160 L 250 120 Z" fill="#EF4444"/>
    </svg>
  `)}`,

  arduino: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <rect width="600" height="450" fill="#0F172A"/>
      <!-- ESD Work Mat texture -->
      <pattern id="esdGrid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1E293B" stroke-width="1"/>
      </pattern>
      <rect width="600" height="450" fill="url(#esdGrid)"/>

      <!-- Breadboard on left -->
      <rect x="70" y="70" width="160" height="310" rx="8" fill="#F8FAFC" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.4))"/>
      <line x1="85" y1="80" x2="85" y2="370" stroke="#EF4444" stroke-width="2"/>
      <line x1="95" y1="80" x2="95" y2="370" stroke="#3B82F6" stroke-width="2"/>
      <line x1="205" y1="80" x2="205" y2="370" stroke="#3B82F6" stroke-width="2"/>
      <line x1="215" y1="80" x2="215" y2="370" stroke="#EF4444" stroke-width="2"/>

      <!-- Arduino PCB on right -->
      <g transform="translate(260, 75)">
        <rect x="0" y="0" width="270" height="290" rx="12" fill="#008184" stroke="#005C5E" stroke-width="3" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.5))"/>
        <!-- USB Port -->
        <rect x="-15" y="25" width="45" height="40" rx="4" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
        <!-- DC Barrel Jack -->
        <rect x="-15" y="210" width="45" height="50" rx="4" fill="#0F172A"/>

        <!-- Microcontroller Chip ATmega328P -->
        <rect x="130" y="100" width="110" height="40" rx="4" fill="#18181B" stroke="#27272A" stroke-width="1.5"/>
        <text x="140" y="125" fill="#E4E4E7" font-family="monospace" font-size="11" font-weight="bold">ATMEGA328P</text>

        <!-- Header Pins Top & Bottom -->
        <rect x="70" y="6" width="180" height="16" fill="#18181B"/>
        <rect x="70" y="268" width="180" height="16" fill="#18181B"/>

        <!-- Arduino Logo -->
        <circle cx="80" cy="120" r="14" fill="#FFFFFF" fill-opacity="0.9"/>
        <text x="73" y="125" fill="#008184" font-family="sans-serif" font-weight="bold" font-size="16">∞</text>
        <text x="60" y="155" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="16">UNO</text>
        <text x="60" y="172" fill="#A5F3FC" font-family="sans-serif" font-size="10">R3 · DEV BOARD</text>
      </g>

      <!-- Jumper wires connecting -->
      <path d="M 180 150 Q 230 110 320 180" fill="none" stroke="#E11D48" stroke-width="4" stroke-linecap="round"/>
      <path d="M 170 200 Q 220 250 310 230" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
      <path d="M 190 280 Q 240 330 350 270" fill="none" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `)}`,

  multimeter: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <rect width="600" height="450" fill="#F1F5F9"/>
      <g transform="translate(180, 30)">
        <!-- Rubber Holster (Yellow) -->
        <rect x="0" y="0" width="240" height="390" rx="28" fill="#FACC15" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.2))"/>
        <!-- Inner Body (Dark Gray) -->
        <rect x="14" y="14" width="212" height="362" rx="20" fill="#1E293B"/>

        <!-- Backlit Display -->
        <rect x="30" y="35" width="180" height="85" rx="8" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
        <text x="50" y="65" fill="#0F766E" font-family="monospace" font-size="12">AUTO RANGE · DC V</text>
        <text x="55" y="105" fill="#042F2E" font-family="monospace" font-size="34" font-weight="bold">5.02</text>
        <text x="175" y="105" fill="#0F766E" font-family="sans-serif" font-size="20" font-weight="bold">V</text>

        <!-- Rotary Dial -->
        <circle cx="120" cy="205" r="54" fill="#0F172A" stroke="#334155" stroke-width="3"/>
        <circle cx="120" cy="205" r="42" fill="#334155"/>
        <!-- Dial knob indicator -->
        <rect x="117" y="160" width="6" height="24" rx="2" fill="#FACC15"/>
        <text x="120" y="275" fill="#94A3B8" font-family="sans-serif" font-size="10" text-anchor="middle" font-weight="bold">TRUE RMS MULTIMETER</text>

        <!-- Probe Jack Ports -->
        <circle cx="65" cy="330" r="14" fill="#0F172A" stroke="#475569" stroke-width="2"/>
        <circle cx="65" cy="330" r="7" fill="#E11D48"/>
        <circle cx="120" cy="330" r="14" fill="#0F172A" stroke="#475569" stroke-width="2"/>
        <circle cx="120" cy="330" r="7" fill="#000000"/>
        <circle cx="175" cy="330" r="14" fill="#0F172A" stroke="#475569" stroke-width="2"/>
        <circle cx="175" cy="330" r="7" fill="#E11D48"/>
      </g>
    </svg>
  `)}`,

  engineeringKit: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <rect width="600" height="450" fill="#F8FAFC"/>
      <!-- Lab Instrument Case -->
      <rect x="70" y="50" width="460" height="340" rx="16" fill="#1E293B" stroke="#334155" stroke-width="3" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.2))"/>
      <rect x="90" y="70" width="420" height="300" rx="10" fill="#0F172A"/>
      <!-- Foam cutouts -->
      <rect x="110" y="90" width="180" height="120" rx="8" fill="#18181B" stroke="#27272A" stroke-width="1.5"/>
      <text x="130" y="150" fill="#38BDF8" font-family="system-ui" font-size="13" font-weight="600">Precision Compass Set</text>
      
      <rect x="310" y="90" width="180" height="120" rx="8" fill="#18181B" stroke="#27272A" stroke-width="1.5"/>
      <text x="330" y="150" fill="#34D399" font-family="system-ui" font-size="13" font-weight="600">Micrometer Screw Gauge</text>

      <rect x="110" y="230" width="380" height="120" rx="8" fill="#18181B" stroke="#27272A" stroke-width="1.5"/>
      <text x="140" y="295" fill="#FACC15" font-family="system-ui" font-size="14" font-weight="600">Digital Vernier Caliper (Stainless Steel · 0.01mm)</text>
    </svg>
  `)}`
};

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'ct-list-101',
    sellerId: 'user-aarav',
    seller: MOCK_USERS[0],
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    description: 'High-speed processor scientific calculator with 552 functions, QR code generator for graphs, and natural textbook display. Pristine display, zero scratches, brand new battery included. Allowed in all semester exams.',
    price: 950,
    originalPrice: 1650,
    category: 'Calculators',
    condition: 'Like New',
    imageUrl: PRESET_IMAGE_TEMPLATES.calculator,
    pickupLocation: 'Central Library Foyer / Mech Dept Canteen',
    status: 'Available',
    createdAt: '2 hours ago',
    views: 84,
    saves: 19,
    academicSemester: 'Sem 1-8 (Universal)',
    includedAccessories: ['Hard slide-on protective cover', 'Brand new Maxell coin cell installed', 'Quick formula cheat-sheet']
  },
  {
    id: 'ct-list-102',
    sellerId: 'user-ananya',
    seller: MOCK_USERS[3],
    title: 'Omega Engineering Mini Drafter with Cover Bag & Clamp',
    description: 'Stainless steel rods with high-precision clear acrylic scales. No parallax error, smooth locking knob and heavy-duty desk clamp. Essential for 1st year Engineering Graphics (EG/ED). Casing included.',
    price: 450,
    originalPrice: 900,
    category: 'Drawing Tools',
    condition: 'Good',
    imageUrl: PRESET_IMAGE_TEMPLATES.drafter,
    pickupLocation: 'Civil Dept Ground Floor / Girls Hostel 2 Gate',
    status: 'Available',
    createdAt: '5 hours ago',
    views: 62,
    saves: 14,
    academicSemester: 'Sem 1-2 (Common to all branches)',
    includedAccessories: ['Waterproof black nylon carrying sling', 'Heavy-duty steel desk clamp', 'Protective scale guard']
  },
  {
    id: 'ct-list-103',
    sellerId: 'user-aarav',
    seller: MOCK_USERS[0],
    title: 'Higher Engineering Mathematics - B.S. Grewal (44th Ed.)',
    description: 'Standard textbook for Math 1, Math 2, and Math 3. Hardbound edition, complete with solved gate questions and step-by-step calculus derivations. No missing pages, very clean pencil notes in margins.',
    price: 550,
    originalPrice: 1100,
    category: 'Textbooks',
    condition: 'Good',
    imageUrl: PRESET_IMAGE_TEMPLATES.textbooks,
    pickupLocation: 'Hostel 9 Quadrangle / Library Lawn',
    status: 'Available',
    createdAt: '1 day ago',
    views: 110,
    saves: 28,
    academicSemester: 'Sem 1, 2, 3 Engineering Core',
    includedAccessories: ['Laminated formula bookmark', 'Solved question bank printout']
  },
  {
    id: 'ct-list-104',
    sellerId: 'user-priya',
    seller: MOCK_USERS[1],
    title: 'Arduino Uno R3 Starter Lab Kit with Sensors & Breadboard',
    description: 'Complete basic robotics & IoT kit with authentic ATmega328P Uno board, 830-point breadboard, ultrasonic HC-SR04, DHT11 temp/humidity sensor, 40+ jumper wires, LEDs, and USB A-to-B cable. Tested and 100% working.',
    price: 799,
    originalPrice: 1500,
    category: 'Lab & Electronics',
    condition: 'Like New',
    imageUrl: PRESET_IMAGE_TEMPLATES.arduino,
    pickupLocation: 'ECE Department Lab 304 / Nescafe Kiosk',
    status: 'Available',
    createdAt: '1 day ago',
    views: 145,
    saves: 37,
    academicSemester: 'Sem 3-6 (ECE, CSE, Mech Mechatronics)',
    includedAccessories: ['Translucent component organizer box', 'Breadboard power module', 'Jumper wire bundle']
  },
  {
    id: 'ct-list-105',
    sellerId: 'user-rohan',
    seller: MOCK_USERS[2],
    title: 'Mastech MAS830L Digital Multimeter with Probes',
    description: 'Reliable digital multimeter with backlight LCD, diode and continuity buzzer test, transistor hFE check, and DC/AC voltage measurement. Back protective rubber boot included. Indispensable for Basic Electrical lab.',
    price: 380,
    originalPrice: 750,
    category: 'Lab & Electronics',
    condition: 'Good',
    imageUrl: PRESET_IMAGE_TEMPLATES.multimeter,
    pickupLocation: 'Main Building Porch / Computer Center',
    status: 'Available',
    createdAt: '2 days ago',
    views: 48,
    saves: 9,
    academicSemester: 'Sem 1-2 Electrical Engg Lab',
    includedAccessories: ['Heavy insulated 1000V test probe cables', 'New 9V battery installed']
  },
  {
    id: 'ct-list-106',
    sellerId: 'user-ananya',
    seller: MOCK_USERS[3],
    title: 'Engineering Workshop Precision Tool Kit (Vernier + Gauge)',
    description: 'Stainless steel 150mm digital vernier caliper (0.01mm resolution) and 0-25mm micrometer screw gauge in velvet-lined hard box. Required for Mechanical and Civil workshop measurement labs.',
    price: 650,
    originalPrice: 1350,
    category: 'Drawing Tools',
    condition: 'Like New',
    imageUrl: PRESET_IMAGE_TEMPLATES.engineeringKit,
    pickupLocation: 'Central Workshop Gate / Student Amenity Center',
    status: 'Available',
    createdAt: '3 days ago',
    views: 73,
    saves: 16,
    academicSemester: 'Sem 1-2 Workshop Practice',
    includedAccessories: ['Velvet-lined hard plastic storage case', 'Calibration zeroing wrench', 'Spare LR44 battery']
  }
];

export const CAMPUS_LOCATIONS = [
  'Central Library Lobby',
  'Mechanical Dept Canteen',
  'Hostel Quadrangle / Gate',
  'Student Activity Center (SAC)',
  'Main Academic Building Porch',
  'Electrical / CS Lab Lawn'
];
