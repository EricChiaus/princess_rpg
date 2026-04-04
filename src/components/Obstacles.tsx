import React from 'react';

const Spider: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>
          {`
            @keyframes webGlow {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
            @keyframes spiderWiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-2deg); }
              75% { transform: rotate(2deg); }
            }
            .web-strand { animation: webGlow 3s ease-in-out infinite; }
            .spider-body { animation: spiderWiggle 2s ease-in-out infinite; transform-origin: center; }
          `}
        </style>
      </defs>
      
      {/* Spider web background */}
      <g className="web-strand">
        {/* Main web strands */}
        <line x1="50" y1="15" x2="20" y2="35" stroke="#e5e7eb" strokeWidth="2" opacity="0.8"/>
        <line x1="50" y1="15" x2="80" y2="35" stroke="#e5e7eb" strokeWidth="2" opacity="0.8"/>
        <line x1="50" y1="15" x2="30" y2="65" stroke="#e5e7eb" strokeWidth="2" opacity="0.8"/>
        <line x1="50" y1="15" x2="70" y2="65" stroke="#e5e7eb" strokeWidth="2" opacity="0.8"/>
        <line x1="50" y1="15" x2="50" y2="75" stroke="#e5e7eb" strokeWidth="2" opacity="0.8"/>
        
        {/* Circular web strands */}
        <circle cx="50" cy="15" r="15" fill="none" stroke="#e5e7eb" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="50" cy="15" r="25" fill="none" stroke="#e5e7eb" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="50" cy="15" r="35" fill="none" stroke="#e5e7eb" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="50" cy="15" r="45" fill="none" stroke="#e5e7eb" strokeWidth="1.5" opacity="0.4"/>
        
        {/* Decorative web dots */}
        <circle cx="35" cy="30" r="2" fill="#f3f4f6" opacity="0.8"/>
        <circle cx="65" cy="30" r="2" fill="#f3f4f6" opacity="0.8"/>
        <circle cx="40" cy="50" r="2" fill="#f3f4f6" opacity="0.8"/>
        <circle cx="60" cy="50" r="2" fill="#f3f4f6" opacity="0.8"/>
        <circle cx="50" cy="60" r="2" fill="#f3f4f6" opacity="0.8"/>
      </g>
      
      {/* Cute spider */}
      <g className="spider-body">
        {/* Shadow */}
        <ellipse cx="50" cy="85" rx="18" ry="4" fill="#1f2937" opacity="0.2"/>
        
        {/* Spider body */}
        <ellipse cx="50" cy="65" rx="16" ry="13" fill="#8b4513" stroke="#654321" strokeWidth="2"/>
        <ellipse cx="50" cy="56" rx="11" ry="9" fill="#a0522d" stroke="#654321" strokeWidth="2"/>
        
        {/* Cute eyes */}
        <circle cx="46" cy="54" r="3.5" fill="white"/>
        <circle cx="54" cy="54" r="3.5" fill="white"/>
        <circle cx="46" cy="55" r="2" fill="black"/>
        <circle cx="54" cy="55" r="2" fill="black"/>
        <circle cx="47" cy="53" r="1" fill="white"/>
        <circle cx="55" cy="53" r="1" fill="white"/>
        
        {/* Cute smile */}
        <path d="M 46 60 Q 50 63, 54 60" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* Spider legs */}
        <g stroke="#654321" strokeWidth="2.5" strokeLinecap="round">
          {/* Left legs */}
          <line x1="38" y1="62" x2="25" y2="52"/>
          <line x1="38" y1="66" x2="20" y2="66"/>
          <line x1="38" y1="70" x2="25" y2="80"/>
          <line x1="42" y1="74" x2="35" y2="90"/>
          
          {/* Right legs */}
          <line x1="62" y1="62" x2="75" y2="52"/>
          <line x1="62" y1="66" x2="80" y2="66"/>
          <line x1="62" y1="70" x2="75" y2="80"/>
          <line x1="58" y1="74" x2="65" y2="90"/>
        </g>
        
        {/* Cute bow on head */}
        <path d="M 45 50 L 47 47 L 50 50 L 53 47 L 55 50 L 53 52 L 47 52 Z" fill="#ec4899" stroke="#be185d" strokeWidth="1"/>
        <circle cx="50" cy="49" r="1.5" fill="#f9a8d4"/>
      </g>
    </svg>
  </div>
);

const Bat: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="22" ry="5" fill="#111827" opacity="0.15"/>
      {/* Left wing */}
      <path d="M36 54 Q18 30 5 42 Q8 58 22 60 Q29 61 36 57" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
      {/* Left wing membrane lines */}
      <path d="M36 54 Q18 30 5 42" fill="none" stroke="#374151" strokeWidth="1.2"/>
      <path d="M34 51 Q20 33 12 39" fill="none" stroke="#374151" strokeWidth="1"/>
      <path d="M32 55 Q24 40 17 44" fill="none" stroke="#374151" strokeWidth="1"/>
      {/* Right wing */}
      <path d="M64 54 Q82 30 95 42 Q92 58 78 60 Q71 61 64 57" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
      {/* Right wing membrane lines */}
      <path d="M64 54 Q82 30 95 42" fill="none" stroke="#374151" strokeWidth="1.2"/>
      <path d="M66 51 Q80 33 88 39" fill="none" stroke="#374151" strokeWidth="1"/>
      <path d="M68 55 Q76 40 83 44" fill="none" stroke="#374151" strokeWidth="1"/>
      {/* Body */}
      <ellipse cx="50" cy="70" rx="13" ry="17" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      {/* Belly */}
      <ellipse cx="50" cy="73" rx="7" ry="10" fill="#374151"/>
      {/* Head */}
      <circle cx="50" cy="48" r="19" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      {/* Ears */}
      <path d="M35 38 L30 18 L44 32" fill="#1f2937" stroke="#111827" strokeWidth="1.5"/>
      <path d="M65 38 L70 18 L56 32" fill="#1f2937" stroke="#111827" strokeWidth="1.5"/>
      {/* Pink inner ears */}
      <path d="M36 36 L33 21 L43 30" fill="#f9a8d4" opacity="0.75"/>
      <path d="M64 36 L67 21 L57 30" fill="#f9a8d4" opacity="0.75"/>
      {/* Big cute eyes */}
      <circle cx="41" cy="46" r="9" fill="#ffffff" stroke="#111827" strokeWidth="1.5"/>
      <circle cx="59" cy="46" r="9" fill="#ffffff" stroke="#111827" strokeWidth="1.5"/>
      <circle cx="42" cy="47" r="5.5" fill="#dc2626"/>
      <circle cx="60" cy="47" r="5.5" fill="#dc2626"/>
      <circle cx="42" cy="47" r="3" fill="#111827"/>
      <circle cx="60" cy="47" r="3" fill="#111827"/>
      {/* Eye shine */}
      <circle cx="43.5" cy="45" r="1.8" fill="#ffffff"/>
      <circle cx="61.5" cy="45" r="1.8" fill="#ffffff"/>
      {/* Blush */}
      <ellipse cx="34" cy="55" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.6"/>
      <ellipse cx="66" cy="55" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.6"/>
      {/* Cute fangs */}
      <path d="M45 57 L43 64 L47 57" fill="#ffffff"/>
      <path d="M55 57 L53 64 L57 57" fill="#ffffff"/>
      {/* Wing thumb tips */}
      <circle cx="5" cy="42" r="3" fill="#374151"/>
      <circle cx="95" cy="42" r="3" fill="#374151"/>
    </svg>
  </div>
);

const Witch: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="50" cy="95" rx="25" ry="5" fill="#1f2937" opacity="0.15"/>
      {/* Dress bottom */}
      <path d="M28 68 Q50 92 72 68 L66 46 L34 46 Z" fill="#7c3aed" stroke="#4c1d95" strokeWidth="2"/>
      {/* Dress shimmer */}
      <path d="M36 68 Q50 85 64 68 L60 53 L40 53 Z" fill="#a78bfa" opacity="0.35"/>
      {/* Star on dress */}
      <path d="M43 72 L44.5 67 L46 72 L41 69 L48 69 Z" fill="#fbbf24" opacity="0.85"/>
      <path d="M56 77 L57.5 72 L59 77 L54 74 L61 74 Z" fill="#fbbf24" opacity="0.85"/>
      {/* Body */}
      <rect x="37" y="46" width="26" height="24" fill="#5b21b6" stroke="#4c1d95" strokeWidth="2" rx="5"/>
      {/* Collar trim */}
      <path d="M37 51 Q50 56 63 51" fill="none" stroke="#a78bfa" strokeWidth="2"/>
      {/* Hands */}
      <circle cx="31" cy="54" r="6.5" fill="#bbf7d0" stroke="#4ade80" strokeWidth="1.5"/>
      <circle cx="69" cy="54" r="6.5" fill="#bbf7d0" stroke="#4ade80" strokeWidth="1.5"/>
      {/* Head */}
      <circle cx="50" cy="32" r="17" fill="#bbf7d0" stroke="#4ade80" strokeWidth="2"/>
      {/* Hat brim */}
      <ellipse cx="50" cy="20" rx="23" ry="5.5" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
      {/* Hat body */}
      <path d="M37 20 L44 2 L56 2 L63 20 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
      {/* Hat highlight streak */}
      <path d="M44 18 L48 6" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Hat band */}
      <rect x="38" y="15" width="24" height="5" fill="#7c3aed" rx="1"/>
      {/* Hat buckle */}
      <rect x="46.5" y="14" width="7" height="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" rx="1"/>
      {/* Star on hat tip */}
      <path d="M50 3 L51.4 7.2 L55.8 7.2 L52.2 9.8 L53.6 14 L50 11.4 L46.4 14 L47.8 9.8 L44.2 7.2 L48.6 7.2 Z" fill="#fbbf24"/>
      {/* Cute eyes */}
      <circle cx="44" cy="31" r="4.5" fill="#1f2937"/>
      <circle cx="56" cy="31" r="4.5" fill="#1f2937"/>
      <circle cx="45.5" cy="29.5" r="1.8" fill="#ffffff"/>
      <circle cx="57.5" cy="29.5" r="1.8" fill="#ffffff"/>
      {/* Rosy cheeks */}
      <ellipse cx="39" cy="37" rx="5" ry="2.8" fill="#fca5a5" opacity="0.6"/>
      <ellipse cx="61" cy="37" rx="5" ry="2.8" fill="#fca5a5" opacity="0.6"/>
      {/* Tiny nose */}
      <circle cx="50" cy="36" r="1.8" fill="#86efac"/>
      {/* Smile */}
      <path d="M44 41 Q50 46 56 41" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
      {/* Broom handle */}
      <rect x="66" y="54" width="4" height="38" fill="#a16207" stroke="#713f12" strokeWidth="1.5" rx="2"/>
      {/* Broom head */}
      <ellipse cx="76" cy="58" rx="13" ry="5.5" fill="#ca8a04" stroke="#92400e" strokeWidth="1.5"/>
      {/* Broom bristles */}
      <path d="M64 61 L61 73 L67 65" fill="#92400e" stroke="#713f12" strokeWidth="1"/>
      <path d="M68 63 L65 75 L70 67" fill="#92400e" stroke="#713f12" strokeWidth="1"/>
      <path d="M72 64 L69 76 L74 68" fill="#92400e" stroke="#713f12" strokeWidth="1"/>
      <path d="M76 64 L73 76 L78 68" fill="#92400e" stroke="#713f12" strokeWidth="1"/>
      {/* Ambient sparkles */}
      <path d="M18 22 L19.5 17 L21 22 L26 23.5 L21 25 L19.5 30 L18 25 L13 23.5 Z" fill="#fbbf24" opacity="0.8"/>
      <path d="M82 18 L83 15 L84 18 L87 19 L84 20 L83 23 L82 20 L79 19 Z" fill="#a78bfa" opacity="0.85"/>
    </svg>
  </div>
);

const Monster: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="50" cy="95" rx="28" ry="5" fill="#1f2937" opacity="0.15"/>
      {/* Legs */}
      <ellipse cx="38" cy="84" rx="9" ry="11" fill="#34d399" stroke="#059669" strokeWidth="2"/>
      <ellipse cx="62" cy="84" rx="9" ry="11" fill="#34d399" stroke="#059669" strokeWidth="2"/>
      {/* Feet */}
      <ellipse cx="36" cy="93" rx="12" ry="5" fill="#059669"/>
      <ellipse cx="64" cy="93" rx="12" ry="5" fill="#059669"/>
      {/* Toe nubs */}
      <circle cx="27" cy="93" r="2.5" fill="#047857"/>
      <circle cx="36" cy="96" r="2.5" fill="#047857"/>
      <circle cx="45" cy="93" r="2.5" fill="#047857"/>
      <circle cx="55" cy="93" r="2.5" fill="#047857"/>
      <circle cx="64" cy="96" r="2.5" fill="#047857"/>
      <circle cx="73" cy="93" r="2.5" fill="#047857"/>
      {/* Body */}
      <ellipse cx="50" cy="63" rx="30" ry="25" fill="#4ade80" stroke="#16a34a" strokeWidth="2.5"/>
      {/* Belly */}
      <ellipse cx="50" cy="66" rx="17" ry="14" fill="#bbf7d0" opacity="0.7"/>
      {/* Body spots */}
      <circle cx="29" cy="58" r="4.5" fill="#22c55e" opacity="0.5"/>
      <circle cx="71" cy="61" r="4" fill="#22c55e" opacity="0.5"/>
      <circle cx="37" cy="74" r="3" fill="#22c55e" opacity="0.4"/>
      {/* Arms */}
      <ellipse cx="19" cy="63" rx="10" ry="15" fill="#4ade80" stroke="#16a34a" strokeWidth="2" transform="rotate(-20 19 63)"/>
      <ellipse cx="81" cy="63" rx="10" ry="15" fill="#4ade80" stroke="#16a34a" strokeWidth="2" transform="rotate(20 81 63)"/>
      {/* Claws */}
      <path d="M11 70 L8 76 L13 72" fill="#059669"/>
      <path d="M15 74 L12 80 L17 76" fill="#059669"/>
      <path d="M89 70 L92 76 L87 72" fill="#059669"/>
      <path d="M85 74 L88 80 L83 76" fill="#059669"/>
      {/* Head */}
      <ellipse cx="50" cy="38" rx="28" ry="24" fill="#4ade80" stroke="#16a34a" strokeWidth="2.5"/>
      {/* Head bumps */}
      <ellipse cx="34" cy="21" rx="7" ry="5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" transform="rotate(-20 34 21)"/>
      <ellipse cx="50" cy="17" rx="7" ry="5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5"/>
      <ellipse cx="66" cy="21" rx="7" ry="5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" transform="rotate(20 66 21)"/>
      {/* Big cute eyes */}
      <circle cx="38" cy="36" r="11" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="62" cy="36" r="11" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="39" cy="37" r="6.5" fill="#f97316"/>
      <circle cx="63" cy="37" r="6.5" fill="#f97316"/>
      <circle cx="39" cy="37" r="3.5" fill="#1f2937"/>
      <circle cx="63" cy="37" r="3.5" fill="#1f2937"/>
      {/* Eye shine */}
      <circle cx="41" cy="34.5" r="2.2" fill="#ffffff"/>
      <circle cx="65" cy="34.5" r="2.2" fill="#ffffff"/>
      {/* Blush */}
      <ellipse cx="29" cy="44" rx="5.5" ry="3" fill="#fca5a5" opacity="0.6"/>
      <ellipse cx="71" cy="44" rx="5.5" ry="3" fill="#fca5a5" opacity="0.6"/>
      {/* Mouth */}
      <path d="M36 50 Q50 62 64 50" fill="#ef4444" stroke="#16a34a" strokeWidth="2"/>
      {/* Teeth */}
      <rect x="43" y="50" width="5" height="6" fill="#ffffff" rx="1.5"/>
      <rect x="50" y="50" width="5" height="6" fill="#ffffff" rx="1.5"/>
      {/* Tongue */}
      <ellipse cx="50" cy="57" rx="6" ry="3.5" fill="#fb7185"/>
    </svg>
  </div>
);

const TreasureBox: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="50" cy="95" rx="33" ry="5" fill="#1f2937" opacity="0.15"/>
      {/* Box base */}
      <rect x="13" y="55" width="74" height="40" fill="#b45309" stroke="#451a03" strokeWidth="3" rx="6"/>
      {/* Wood grain lines */}
      <line x1="29" y1="58" x2="29" y2="92" stroke="#92400e" strokeWidth="1.2" opacity="0.6"/>
      <line x1="50" y1="58" x2="50" y2="92" stroke="#92400e" strokeWidth="1.2" opacity="0.6"/>
      <line x1="71" y1="58" x2="71" y2="92" stroke="#92400e" strokeWidth="1.2" opacity="0.6"/>
      {/* Inner shade */}
      <rect x="18" y="60" width="64" height="30" fill="#92400e" rx="3"/>
      {/* Gold bands */}
      <rect x="13" y="63" width="74" height="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5"/>
      <rect x="13" y="79" width="74" height="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5"/>
      {/* Rivets */}
      <circle cx="21" cy="66.5" r="2.5" fill="#d97706"/>
      <circle cx="79" cy="66.5" r="2.5" fill="#d97706"/>
      <circle cx="21" cy="82.5" r="2.5" fill="#d97706"/>
      <circle cx="79" cy="82.5" r="2.5" fill="#d97706"/>
      {/* Lid */}
      <path d="M13 55 Q50 22 87 55" fill="#ca8a04" stroke="#451a03" strokeWidth="3"/>
      <path d="M17 54 Q50 26 83 54" fill="#eab308" stroke="#a16207" strokeWidth="1.5"/>
      {/* Lid wood grain */}
      <path d="M32 48 Q50 30 68 48" fill="none" stroke="#a16207" strokeWidth="1" opacity="0.55"/>
      <path d="M24 52 Q50 28 76 52" fill="none" stroke="#a16207" strokeWidth="1" opacity="0.35"/>
      {/* Gems on lid */}
      <circle cx="34" cy="45" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
      <circle cx="66" cy="45" r="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5"/>
      <circle cx="50" cy="34" r="7" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5"/>
      {/* Gem highlights */}
      <circle cx="32.5" cy="43" r="2" fill="#bfdbfe" opacity="0.8"/>
      <circle cx="64.5" cy="43" r="2" fill="#fecaca" opacity="0.8"/>
      <circle cx="48.5" cy="32" r="2.5" fill="#e9d5ff" opacity="0.8"/>
      {/* Lock plate */}
      <rect x="42" y="62" width="16" height="18" fill="#374151" stroke="#1f2937" strokeWidth="2" rx="3"/>
      {/* Lock ring */}
      <circle cx="50" cy="67" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5"/>
      <circle cx="50" cy="67" r="2.5" fill="#1f2937"/>
      {/* Keyhole */}
      <path d="M50 69.5 L47.5 75 L50 76 L52.5 75 Z" fill="#1f2937"/>
      {/* Coins peeking from lid gap */}
      <ellipse cx="37" cy="55" rx="5.5" ry="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
      <ellipse cx="50" cy="54" rx="5.5" ry="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
      <ellipse cx="63" cy="55" rx="5.5" ry="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
      {/* Sparkles */}
      <path d="M18 28 L19.5 23 L21 28 L26 29.5 L21 31 L19.5 36 L18 31 L13 29.5 Z" fill="#fbbf24"/>
      <path d="M80 25 L81 22 L82 25 L85 26 L82 27 L81 30 L80 27 L77 26 Z" fill="#fbbf24"/>
      <path d="M50 13 L51 10 L52 13 L55 14 L52 15 L51 18 L50 15 L47 14 Z" fill="#a855f7"/>
      {/* Sparkle dots */}
      <circle cx="30" cy="18" r="2.5" fill="#fbbf24" opacity="0.85"/>
      <circle cx="72" cy="16" r="2" fill="#ef4444" opacity="0.85"/>
    </svg>
  </div>
);

const Heart: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg viewBox="0 0 30 30" className={`w-full h-full ${filled ? 'text-red-500' : 'text-gray-300'}`}>
    <path d="M15 25 C15 25, 3 15, 3 8 C3 4, 6 1, 10 1 C13 1, 15 3, 15 5 C15 3, 17 1, 20 1 C24 1, 27 4, 27 8 C27 15, 15 25, 15 25 Z" 
          fill={filled ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2"/>
  </svg>
);

export { Spider, Bat, Witch, Monster, TreasureBox, Heart };
