import React from 'react';

const RainbowCastle: React.FC = () => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <defs>
        <linearGradient id="castleRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="20%" stopColor="#FF922B"/>
          <stop offset="40%" stopColor="#FAB005"/>
          <stop offset="60%" stopColor="#51CF66"/>
          <stop offset="80%" stopColor="#339AF0"/>
          <stop offset="100%" stopColor="#CC5DE8"/>
        </linearGradient>
        <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="50%" stopColor="#339AF0"/>
          <stop offset="100%" stopColor="#CC5DE8"/>
        </linearGradient>
      </defs>
      {/* Rainbow arcs above battlements (drawn first = behind castle) */}
      <path d="M7 17 Q18 4 29 17" fill="none" stroke="#FF6B6B" strokeWidth="1.4"/>
      <path d="M8 17 Q18 6 28 17" fill="none" stroke="#FF922B" strokeWidth="1.4"/>
      <path d="M9 17 Q18 8 27 17" fill="none" stroke="#FAB005" strokeWidth="1.4"/>
      <path d="M10 17 Q18 10 26 17" fill="none" stroke="#51CF66" strokeWidth="1.4"/>
      <path d="M11 17 Q18 12 25 17" fill="none" stroke="#339AF0" strokeWidth="1.4"/>
      <path d="M12 17 Q18 14 24 17" fill="none" stroke="#CC5DE8" strokeWidth="1.4"/>
      {/* Main wall — rainbow gradient */}
      <path fill="url(#castleRainbow)" d="M4 17h28v19H4z"/>
      {/* Battlements */}
      <path fill="#9C36B5" d="M6 13h23v5H6z"/>
      {/* Side towers — gradient */}
      <path fill="url(#towerGrad)" d="M1 12v22c0 1.104.896 2 2 2h4V12H1zm28 0v24h4c1.104 0 2-.896 2-2V12h-6z"/>
      {/* Door opening */}
      <path fill="#F2F9FF" d="M14 22h8v11h-8z"/>
      {/* Door arch */}
      <path fill="#9C36B5" d="M22 19c-.295 0-.558.391-.74 1h-6.52c-.183-.609-.445-1-.74-1-.552 0-1 1.344-1 3 0 1.657.448 3 1 3s1-1.343 1-3h6c0 1.657.447 3 1 3s1-1.343 1-3c0-1.656-.447-3-1-3z"/>
      {/* Brick details */}
      <path fill="#862E9C" d="M3 17h2v2H3zm6 3h2v2H9zm16 0h2v2h-2zM9 24h2v2H9zm16 0h2v2h-2zM3 21h2v2H3zm28-4h2v2h-2zm0 4h2v2h-2z"/>
      {/* Door frame */}
      <path fill="#F2F9FF" d="M13 22h10v4H13z"/>
      {/* Gate */}
      <path fill="#5F3DC4" d="M18 26c-1.104 0-2 .896-2 2v5h4v-5c0-1.104-.896-2-2-2z"/>
      {/* Base */}
      <path fill="#862E9C" d="M12 33h12v3H12z"/>
      {/* Tower peaked caps */}
      <path fill="#FF6B6B" d="M1 12h6S5 4 4 4s-3 8-3 8zm28 0h6s-2-8-3-8-3 8-3 8z"/>
      {/* Tower top accent */}
      <path fill="#F783AC" d="M8 14c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h6c.552 0 1 .448 1 1zm28 0c0 .552-.447 1-1 1h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1z"/>
    </svg>
  </div>
);

export default RainbowCastle;
