import React from 'react';

const Stone: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Main rock */}
      <ellipse cx="50" cy="50" rx="35" ry="25" fill="#6b7280" stroke="#374151" strokeWidth="3"/>
      {/* Rock texture */}
      <ellipse cx="40" cy="45" rx="12" ry="8" fill="#4b5563"/>
      <ellipse cx="60" cy="55" rx="10" ry="6" fill="#4b5563"/>
      <ellipse cx="45" cy="60" rx="8" ry="5" fill="#374151"/>
      {/* Cracks */}
      <path d="M30 40 L35 55 L40 65" fill="none" stroke="#1f2937" strokeWidth="2"/>
      <path d="M65 35 L60 50 L55 60" fill="none" stroke="#1f2937" strokeWidth="2"/>
      {/* Moss */}
      <ellipse cx="25" cy="50" rx="8" ry="4" fill="#10b981" opacity="0.7"/>
      <ellipse cx="75" cy="45" rx="6" ry="3" fill="#10b981" opacity="0.7"/>
      {/* Small stones */}
      <circle cx="35" cy="70" r="5" fill="#6b7280" stroke="#374151" strokeWidth="2"/>
      <circle cx="65" cy="30" r="4" fill="#6b7280" stroke="#374151" strokeWidth="2"/>
    </svg>
  </div>
);

const Bat: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Bat body */}
      <ellipse cx="50" cy="50" rx="15" ry="20" fill="#1f2937" stroke="#111827" strokeWidth="3"/>
      {/* Bat wings */}
      <path d="M35 45 Q10 30 5 45 Q10 55 35 50" fill="#374151" stroke="#111827" strokeWidth="3"/>
      <path d="M65 45 Q90 30 95 45 Q90 55 65 50" fill="#374151" stroke="#111827" strokeWidth="3"/>
      {/* Wing details */}
      <path d="M25 40 Q15 35 10 40" fill="none" stroke="#111827" strokeWidth="2"/>
      <path d="M75 40 Q85 35 90 40" fill="none" stroke="#111827" strokeWidth="2"/>
      {/* Bat head */}
      <circle cx="50" cy="30" r="12" fill="#1f2937" stroke="#111827" strokeWidth="3"/>
      {/* Ears */}
      <path d="M40 25 L38 15 L45 22" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      <path d="M60 25 L62 15 L55 22" fill="#1f2937" stroke="#111827" strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="44" cy="28" r="3" fill="#ef4444"/>
      <circle cx="56" cy="28" r="3" fill="#ef4444"/>
      <circle cx="45" cy="27" r="1" fill="#ffffff"/>
      <circle cx="57" cy="27" r="1" fill="#ffffff"/>
      {/* Fangs */}
      <path d="M47 35 L46 40 L48 35" fill="#ffffff"/>
      <path d="M53 35 L52 40 L54 35" fill="#ffffff"/>
      {/* Wing claws */}
      <circle cx="5" cy="45" r="2" fill="#ef4444"/>
      <circle cx="95" cy="45" r="2" fill="#ef4444"/>
    </svg>
  </div>
);

const Witch: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Witch body */}
      <rect x="40" y="50" width="20" height="30" fill="#4c1d95" stroke="#2e1065" strokeWidth="3" rx="5"/>
      {/* Witch dress */}
      <path d="M35 70 Q50 85 65 70 L60 50 L40 50 Z" fill="#6b21a8" stroke="#2e1065" strokeWidth="3"/>
      {/* Witch head */}
      <circle cx="50" cy="30" r="15" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      {/* Witch hat */}
      <path d="M35 30 L50 5 L65 30" fill="#1e293b" stroke="#0f172a" strokeWidth="3"/>
      <path d="M40 30 L50 15 L60 30" fill="#475569" stroke="#0f172a" strokeWidth="2"/>
      {/* Hat buckle */}
      <rect x="48" y="25" width="4" height="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="44" cy="28" r="2" fill="#1f2937"/>
      <circle cx="56" cy="28" r="2" fill="#1f2937"/>
      {/* Wart */}
      <circle cx="60" cy="32" r="2" fill="#16a34a"/>
      {/* Nose */}
      <path d="M50 35 L48 38" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M45 40 Q50 43 55 40" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      {/* Broom */}
      <rect x="65" y="60" width="4" height="25" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
      <path d="M69 60 Q85 55 90 65 Q85 70 69 65" fill="#fbbf24" stroke="#92400e" strokeWidth="2"/>
      {/* Broom bristles */}
      <path d="M85 55 L88 50 L90 55" fill="#f59e0b"/>
      <path d="M87 57 L90 52 L92 57" fill="#f59e0b"/>
      <path d="M86 59 L89 54 L91 59" fill="#f59e0b"/>
      {/* Witch hands */}
      <circle cx="38" cy="55" r="4" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="62" cy="55" r="4" fill="#86efac" stroke="#16a34a" strokeWidth="2"/>
    </svg>
  </div>
);

const Monster: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Monster body */}
      <ellipse cx="50" cy="55" rx="30" ry="25" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      {/* Monster spikes */}
      <path d="M30 50 L25 35 L35 45" fill="#16a34a"/>
      <path d="M70 50 L75 35 L65 45" fill="#16a34a"/>
      <path d="M50 40 L45 25 L55 35" fill="#16a34a"/>
      <path d="M40 45 L35 30 L45 40" fill="#16a34a"/>
      <path d="M60 45 L65 30 L55 40" fill="#16a34a"/>
      {/* Monster head */}
      <ellipse cx="50" cy="35" rx="25" ry="20" fill="#86efac" stroke="#16a34a" strokeWidth="3"/>
      {/* Monster eyes */}
      <circle cx="40" cy="30" r="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3"/>
      <circle cx="60" cy="30" r="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3"/>
      <circle cx="40" cy="30" r="4" fill="#ef4444"/>
      <circle cx="60" cy="30" r="4" fill="#ef4444"/>
      <circle cx="41" cy="28" r="2" fill="#1f2937"/>
      <circle cx="61" cy="28" r="2" fill="#1f2937"/>
      {/* Monster mouth */}
      <path d="M35 45 Q50 55 65 45" fill="#ef4444" stroke="#16a34a" strokeWidth="3"/>
      {/* Monster teeth */}
      <rect x="42" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <rect x="48" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <rect x="54" y="45" width="4" height="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      {/* Monster arms */}
      <ellipse cx="25" cy="50" rx="8" ry="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" transform="rotate(-30 25 50)"/>
      <ellipse cx="75" cy="50" rx="8" ry="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" transform="rotate(30 75 50)"/>
      {/* Monster claws */}
      <circle cx="20" cy="60" r="3" fill="#16a34a"/>
      <circle cx="80" cy="60" r="3" fill="#16a34a"/>
      <circle cx="18" cy="55" r="2" fill="#16a34a"/>
      <circle cx="82" cy="55" r="2" fill="#16a34a"/>
      {/* Monster legs */}
      <rect x="35" y="75" width="8" height="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" rx="4"/>
      <rect x="57" y="75" width="8" height="15" fill="#86efac" stroke="#16a34a" strokeWidth="3" rx="4"/>
      {/* Monster feet */}
      <ellipse cx="39" cy="90" rx="6" ry="4" fill="#16a34a"/>
      <ellipse cx="61" cy="90" rx="6" ry="4" fill="#16a34a"/>
    </svg>
  </div>
);

const TreasureBox: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Treasure box base */}
      <rect x="20" y="50" width="60" height="40" fill="#92400e" stroke="#451a03" strokeWidth="4" rx="5"/>
      {/* Box details */}
      <rect x="25" y="55" width="50" height="30" fill="#78350f" stroke="#451a03" strokeWidth="2" rx="3"/>
      {/* Metal bands */}
      <rect x="20" y="60" width="60" height="5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <rect x="20" y="75" width="60" height="5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      {/* Box lid */}
      <path d="M20 50 Q50 30 80 50" fill="#fbbf24" stroke="#451a03" strokeWidth="4"/>
      <path d="M25 50 Q50 35 75 50" fill="#f59e0b" stroke="#451a03" strokeWidth="2"/>
      {/* Lock */}
      <rect x="45" y="60" width="10" height="12" fill="#1f2937" stroke="#111827" strokeWidth="3" rx="2"/>
      <circle cx="50" cy="55" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <circle cx="50" cy="55" r="2" fill="#1f2937"/>
      {/* Keyhole */}
      <path d="M50 57 Q48 59 48 62 Q48 65 50 65 Q52 65 52 62 Q52 59 50 57" fill="#1f2937"/>
      {/* Treasure sparkles */}
      <circle cx="30" cy="40" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="70" cy="40" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="50" cy="25" r="4" fill="#fbbf24" className="animate-sparkle"/>
      <circle cx="35" cy="30" r="3" fill="#10b981" className="animate-sparkle"/>
      <circle cx="65" cy="30" r="3" fill="#10b981" className="animate-sparkle"/>
      <circle cx="25" cy="50" r="2" fill="#ef4444" className="animate-sparkle"/>
      <circle cx="75" cy="50" r="2" fill="#ef4444" className="animate-sparkle"/>
      {/* Gold coins peeking out */}
      <circle cx="35" cy="48" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="65" cy="48" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
      <circle cx="50" cy="45" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
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

export { Stone, Bat, Witch, Monster, TreasureBox, Heart };
