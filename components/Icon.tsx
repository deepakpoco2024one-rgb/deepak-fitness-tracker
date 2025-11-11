
import React from 'react';

// FIX: Add 'chevronDown' to support it as a valid icon name.
export type IconName = 'dumbbell' | 'checkCircle' | 'scale' | 'calendar' | 'award' | 'flame' | 'arrowLeft' | 'arrowRight' | 'plus' | 'trash' | 'user' | 'arrowsUpDown' | 'steak' | 'lightbulb' | 'chevronDown';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'dumbbell':
      return (
        // FIX: Replaced incorrect dumbbell icon with a proper barbell icon.
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25v13.5M4.5 5.25v13.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
        </svg>
      );
    case 'checkCircle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'scale':
      return (
        // FIX: Replaced ambiguous scale icon with a clearer balance scale icon.
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="M7 21h10"/>
            <path d="M12 3v18"/>
            <path d="M3 7h18"/>
        </svg>
      );
    case 'calendar':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                {/* FIX: Corrected invalid path data for the horizontal line. */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M3 12h18" />
            </svg>
        );
    case 'award':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125V18.75m9-3.375a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3m6 0a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3m0 0v1.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-1.5m-6 0a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3m6-3a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3" />
            </svg>
        );
    case 'flame':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3-7.184 8.25 8.25 0 0 1 3.362 2.797Z" />
            </svg>
        );
    case 'lightbulb':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a6.01 6.01 0 01-1.5.189m1.5-.189a6.01 6.01 0 001.5.189m-1.5-3.033a6.01 6.01 0 01-1.5-.189m1.5.189a6.01 6.01 0 00-1.5-.189m12.06-6.478a6.01 6.01 0 00-1.5.189m1.5-.189a6.01 6.01 0 011.5.189m-9.75 1.134a6.01 6.01 0 00-1.5-.189m1.5.189a6.01 6.01 0 01-1.5-.189m1.5 3.033a6.01 6.01 0 00-1.5.189m1.5-.189a6.01 6.01 0 01-1.5.189m9.75-1.134a6.01 6.01 0 01-1.5.189m1.5-.189a6.01 6.01 0 00-1.5-.189M12 8.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-4.5 0V10.5A2.25 2.25 0 0112 8.25z" />
            </svg>
        );
    case 'arrowLeft':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      );
    // FIX: Add 'arrowRight' icon for UI consistency.
    case 'arrowRight':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      );
    case 'chevronDown':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      );
    case 'plus':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
    case 'trash':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      );
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      );
    case 'arrowsUpDown':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
        );
    case 'steak':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.46 14.322c.296-.03.585-.078.865-.143a5.25 5.25 0 0 0-1.48-3.483 3.75 3.75 0 0 0-4.992 0 3.75 3.75 0 0 0 0 5.304 3.75 3.75 0 0 0 5.304 0c.23-.23.44-.48.629-.751a5.23 5.23 0 0 0-1.426-.928M15.46 14.322l2.33-2.33a2.25 2.25 0 0 0 0-3.182l-3.182-3.182a2.25 2.25 0 0 0-3.182 0l-2.33 2.33m9.682 9.682-2.33 2.33a2.25 2.25 0 0 1-3.182 0l-3.182-3.182a2.25 2.25 0 0 1 0-3.182l2.33-2.33" />
            </svg>
        );
    default:
      return null;
  }
};
