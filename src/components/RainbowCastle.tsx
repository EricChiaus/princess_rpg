import React from 'react';

const RainbowCastle: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="rcSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB"/>
          <stop offset="100%" stopColor="#D4EFFF"/>
        </linearGradient>
        <linearGradient id="rcWall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8EAF6"/>
          <stop offset="100%" stopColor="#C5CAE9"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="100" height="100" fill="url(#rcSky)"/>

      {/* Full rainbow — 6 true semicircles centred at (50,100) */}
      <path d="M 0 25 A 90 90 0 0 1 100 25" fill="none" stroke="#FF3333" strokeWidth="4.5" opacity="0.9"/>
      <path d="M 0 35 A 82 82 0 0 1 100 35" fill="none" stroke="#FF8800" strokeWidth="4.5" opacity="0.9"/>
      <path d="M 0 46 A 74 74 0 0 1 100 46" fill="none" stroke="#FFE000" strokeWidth="4.5" opacity="0.9"/>
      <path d="M 0 57 A 66 66 0 0 1 100 57" fill="none" stroke="#22CC44" strokeWidth="4.5" opacity="0.9"/>
      <path d="M 0 71 A 58 58 0 0 1 100 71" fill="none" stroke="#2255FF" strokeWidth="4.5" opacity="0.9"/>
      <path d="M 0 100 A 50 50 0 0 1 100 100" fill="none" stroke="#8833CC" strokeWidth="4.5" opacity="0.9"/>

      {/* Ground */}
      <rect x="0" y="89" width="100" height="11" fill="#546E7A"/>
      <rect x="0" y="86" width="100" height="5" fill="#607D8B"/>

      {/* ===== CASTLE (drawn in front of rainbow) ===== */}

      {/* Main curtain wall */}
      <rect x="20" y="66" width="60" height="24" fill="url(#rcWall)" stroke="#9FA8DA" strokeWidth="0.8"/>
      {/* Wall battlements */}
      <rect x="20" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="28" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="36" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="61" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="69" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="75" y="60" width="5" height="8" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>

      {/* Arched gate */}
      <path d="M 41 90 L 41 76 A 9 11 0 0 1 59 76 L 59 90 Z" fill="#1A237E"/>
      <line x1="50" y1="76" x2="50" y2="90" stroke="#3949AB" strokeWidth="0.8"/>
      <line x1="41" y1="82" x2="59" y2="82" stroke="#3949AB" strokeWidth="0.8"/>
      <line x1="41" y1="87" x2="59" y2="87" stroke="#3949AB" strokeWidth="0.8"/>

      {/* Left outer turret */}
      <rect x="7" y="62" width="16" height="28" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="7"  y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="13" y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="19" y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <path d="M 11 72 L 11 67 A 3.5 4 0 0 1 19 67 L 19 72" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="0.7"/>
      <polygon points="7,62 23,62 15,40" fill="#283593"/>
      <polygon points="15,40 23,62 20,62" fill="#3949AB" opacity="0.4"/>
      <line x1="15" y1="40" x2="15" y2="33" stroke="#B8860B" strokeWidth="1"/>
      <polygon points="15,33 22,36 15,40" fill="#FF6B6B"/>

      {/* Right outer turret */}
      <rect x="77" y="62" width="16" height="28" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="77" y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="83" y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <rect x="89" y="57" width="4" height="7" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.7"/>
      <path d="M 81 72 L 81 67 A 3.5 4 0 0 1 89 67 L 89 72" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="0.7"/>
      <polygon points="77,62 93,62 85,40" fill="#283593"/>
      <polygon points="85,40 93,62 90,62" fill="#3949AB" opacity="0.4"/>
      <line x1="85" y1="40" x2="85" y2="33" stroke="#B8860B" strokeWidth="1"/>
      <polygon points="85,33 92,36 85,40" fill="#FF6B6B"/>

      {/* Left main tower */}
      <rect x="17" y="46" width="22" height="44" fill="url(#rcWall)" stroke="#9FA8DA" strokeWidth="1"/>
      <rect x="17" y="46" width="5" height="44" fill="#FFFFFF" opacity="0.2"/>
      <rect x="17" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="24" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="31" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="34" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <path d="M 23 61 L 23 54 A 5 6 0 0 1 33 54 L 33 61" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="0.8"/>
      <polygon points="17,46 39,46 28,20" fill="#1565C0"/>
      <polygon points="28,20 39,46 34,46" fill="#42A5F5" opacity="0.35"/>
      <line x1="28" y1="20" x2="28" y2="13" stroke="#B8860B" strokeWidth="1.2"/>
      <polygon points="28,13 36,17 28,21" fill="#FFD700"/>

      {/* Right main tower */}
      <rect x="61" y="46" width="22" height="44" fill="url(#rcWall)" stroke="#9FA8DA" strokeWidth="1"/>
      <rect x="61" y="46" width="5" height="44" fill="#FFFFFF" opacity="0.2"/>
      <rect x="61" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="68" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="75" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="78" y="39" width="5" height="9" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <path d="M 67 61 L 67 54 A 5 6 0 0 1 77 54 L 77 61" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="0.8"/>
      <polygon points="61,46 83,46 72,20" fill="#1565C0"/>
      <polygon points="72,20 83,46 78,46" fill="#42A5F5" opacity="0.35"/>
      <line x1="72" y1="20" x2="72" y2="13" stroke="#B8860B" strokeWidth="1.2"/>
      <polygon points="72,13 80,17 72,21" fill="#FFD700"/>

      {/* Central tower — tallest */}
      <rect x="36" y="30" width="28" height="60" fill="#E8EAF6" stroke="#9FA8DA" strokeWidth="1.2"/>
      <rect x="36" y="30" width="7" height="60" fill="#FFFFFF" opacity="0.25"/>
      {/* Central battlements */}
      <rect x="36" y="26" width="28" height="5" fill="#C5CAE9" stroke="#9FA8DA" strokeWidth="0.8"/>
      <rect x="36" y="21" width="4" height="10" fill="#E8EAF6" stroke="#9FA8DA" strokeWidth="0.9"/>
      <rect x="44" y="21" width="4" height="10" fill="#E8EAF6" stroke="#9FA8DA" strokeWidth="0.9"/>
      <rect x="52" y="21" width="4" height="10" fill="#E8EAF6" stroke="#9FA8DA" strokeWidth="0.9"/>
      <rect x="60" y="21" width="4" height="10" fill="#E8EAF6" stroke="#9FA8DA" strokeWidth="0.9"/>
      {/* Central tall arched window */}
      <path d="M 44 50 L 44 41 A 6 8 0 0 1 56 41 L 56 50" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="1"/>
      {/* Central lower window */}
      <path d="M 45 68 L 45 62 A 5 6 0 0 1 55 62 L 55 68" fill="#B3E5FC" stroke="#9FA8DA" strokeWidth="0.9"/>
      {/* Central spire — tallest point */}
      <polygon points="36,30 64,30 50,4" fill="#0D47A1"/>
      <polygon points="50,4 64,30 57,30" fill="#1565C0" opacity="0.45"/>
      {/* Central flag */}
      <line x1="50" y1="4" x2="50" y2="1" stroke="#B8860B" strokeWidth="1.5"/>
      <polygon points="50,1 60,5 50,8" fill="#FFD700"/>

      {/* Sparkle stars flanking */}
      <path d="M 5 24 L 6.2 20.5 L 7.4 24 L 11 25.2 L 7.4 26.4 L 6.2 30 L 5 26.4 L 1.4 25.2 Z" fill="#FFD700" opacity="0.9"/>
      <path d="M 93 22 L 94 19.5 L 95 22 L 97.5 23 L 95 24 L 94 26.5 L 93 24 L 90.5 23 Z" fill="#FFD700" opacity="0.85"/>
    </svg>
  </div>
);

export default RainbowCastle;
