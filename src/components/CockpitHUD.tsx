import { useState, useEffect } from 'react';

export const CockpitHUD = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');
  const [sessionSecs, setSessionSecs] = useState(0);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate between -1.0000 and 1.0000 based on window size
      const normX = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(4);
      const normY = (1 - (e.clientY / window.innerHeight) * 2).toFixed(4);
      setCoords({ x: parseFloat(normX), y: parseFloat(normY) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update Clock
  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(date));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Increment session stopwatch
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionSecs((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format session stopwatch format MM:SS
  const formatSession = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-black/80 dark:bg-black/90 border-t border-zinc-800/50 backdrop-blur-md text-[10px] sm:text-[11px] text-zinc-500 font-tech px-4 py-2 sm:py-2.5 flex justify-between items-center select-none pointer-events-auto">
      {/* Local Time Zones */}
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>VLR</span>
          <span className="text-zinc-300 dark:text-zinc-200">{time || '--:--:--'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>LKO</span>
          <span className="text-zinc-300 dark:text-zinc-200">{time || '--:--:--'}</span>
        </div>
      </div>

      {/* Session stopwatch */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-zinc-600">TELEMETRY SYSTEM V2.0</span>
        <span className="text-zinc-800">|</span>
        <span className="text-zinc-500">SESSION:</span>
        <span className="text-zinc-300 dark:text-zinc-200">{formatSession(sessionSecs)}</span>
      </div>

      {/* Mouse cursor coordinates tracking */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <span>X</span>
          <span className="text-zinc-300 dark:text-zinc-200 w-[55px] text-right">
            {coords.x >= 0 ? `+${coords.x.toFixed(4)}` : coords.x.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Y</span>
          <span className="text-zinc-300 dark:text-zinc-200 w-[55px] text-right">
            {coords.y >= 0 ? `+${coords.y.toFixed(4)}` : coords.y.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CockpitHUD;
