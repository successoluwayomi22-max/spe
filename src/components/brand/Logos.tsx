// XERXES Five Business Logo Types
// 1. Wordmark
// 2. Lettermark (Geometric X)
// 3. Symbol / Brandmark (Intelligence + Connection + World + Perception)
// 4. Combination Mark
// 5. Emblem / Badge (Shield/Circular verification seal)

import type { FC } from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'wordmark' | 'lettermark' | 'symbol' | 'combo' | 'emblem';
  colorMode?: 'brand' | 'monochrome' | 'white' | 'black';
}

export const XerxesLogo: FC<LogoProps> = ({
  className = '',
  size = 36,
  variant = 'combo',
  colorMode = 'brand',
}) => {
  const primaryColor = colorMode === 'white' ? '#FFFFFF' : colorMode === 'black' ? '#000000' : '#F16623';
  const secondaryColor = colorMode === 'white' ? '#E2E8F0' : colorMode === 'black' ? '#333333' : '#262262';
  const textColor = colorMode === 'white' ? '#FFFFFF' : colorMode === 'black' ? '#000000' : 'var(--text-primary, #FFFFFF)';

  // 1. Wordmark Only
  if (variant === 'wordmark') {
    return (
      <svg
        viewBox="0 0 200 48"
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="XERXES Wordmark"
      >
        <text
          x="4"
          y="34"
          fontFamily="'Outfit', -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="36"
          fontWeight="800"
          letterSpacing="6"
          fill={textColor}
        >
          XERXES
        </text>
        <circle cx="192" cy="18" r="3.5" fill={primaryColor} />
      </svg>
    );
  }

  // 2. Lettermark (Geometric X)
  if (variant === 'lettermark') {
    return (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="XERXES Lettermark X"
      >
        <defs>
          <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        {/* Geometric segmented X */}
        <path
          d="M8 8L20 24L8 40H14L24 26L34 40H40L28 24L40 8H34L24 22L14 8H8Z"
          fill="url(#xGradient)"
        />
        <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
        <circle cx="24" cy="8" r="2" fill={primaryColor} />
        <circle cx="24" cy="40" r="2" fill={secondaryColor} />
      </svg>
    );
  }

  // 3. Symbol / Brandmark (Intelligence + Connection + World + Perception)
  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="XERXES Brandmark Symbol"
      >
        <defs>
          <linearGradient id="symGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
          <radialGradient id="symGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Outer perception orbital ring */}
        <circle cx="32" cy="32" r="28" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 6" opacity="0.6" />
        {/* Diamond world node */}
        <polygon points="32,6 58,32 32,58 6,32" stroke="url(#symGrad1)" strokeWidth="2" fill="none" opacity="0.85" />
        {/* Central intelligence X */}
        <path d="M20 20L44 44M44 20L20 44" stroke="url(#symGrad1)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Neural nodes */}
        <circle cx="32" cy="32" r="5" fill="url(#symGrad1)" />
        <circle cx="32" cy="32" r="2.5" fill="#FFFFFF" />
        <circle cx="20" cy="20" r="3" fill={primaryColor} />
        <circle cx="44" cy="20" r="3" fill={primaryColor} />
        <circle cx="20" cy="44" r="3" fill={secondaryColor} />
        <circle cx="44" cy="44" r="3" fill={secondaryColor} />
      </svg>
    );
  }

  // 5. Emblem / Badge (Verification & Device Certification)
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 72 72"
        width={size}
        height={size}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="XERXES Verified Emblem"
      >
        <defs>
          <linearGradient id="emblemBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="50%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>
        </defs>
        {/* Hexagonal Shield */}
        <path
          d="M36 4L66 18V44C66 58 36 68 36 68C36 68 6 58 6 44V18L36 4Z"
          fill="#0B0F19"
          stroke="url(#emblemBorder)"
          strokeWidth="2.5"
        />
        {/* Inner geometric X */}
        <path d="M24 24L48 48M48 24L24 48" stroke="url(#emblemBorder)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="36" cy="36" r="3.5" fill="#FFFFFF" />
        {/* Perception dots */}
        <circle cx="36" cy="18" r="2" fill={primaryColor} />
        <circle cx="36" cy="54" r="2" fill={secondaryColor} />
      </svg>
    );
  }

  // 4. Default: Combination Mark [ Symbol + XERXES ]
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        viewBox="0 0 64 64"
        width={Number(size) * 0.9}
        height={Number(size) * 0.9}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="comboGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="27" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 5" opacity="0.6" />
        <polygon points="32,7 57,32 32,57 7,32" stroke="url(#comboGrad)" strokeWidth="1.8" fill="none" opacity="0.8" />
        <path d="M21 21L43 43M43 21L21 43" stroke="url(#comboGrad)" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="32" cy="32" r="4.5" fill="url(#comboGrad)" />
        <circle cx="32" cy="32" r="2" fill="#FFFFFF" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: `${Math.max(16, Number(size) * 0.65)}px`,
            fontWeight: 800,
            letterSpacing: '4px',
            lineHeight: 1,
            color: textColor,
          }}
        >
          XERXES
        </span>
        <span
          style={{
            fontSize: `${Math.max(8, Number(size) * 0.22)}px`,
            letterSpacing: '1.5px',
            color: primaryColor,
            textTransform: 'uppercase',
            fontWeight: 600,
            marginTop: '2px',
          }}
        >
          Intelligent World
        </span>
      </div>
    </div>
  );
};
