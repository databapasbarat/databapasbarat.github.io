"use client";

import { useState, useEffect } from 'react';

// Helper: Animated single number, scrolls like a tumbler
const AnimatedNumber = ({ number }: { number: number }) => {
  return (
    <div
      style={{
        transform: `translateY(-${number * 100}%)`,
      }}
      className="flex flex-col transition-transform duration-500 ease-in-out"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <span key={n} className="flex-shrink-0">
          {n}
        </span>
      ))}
    </div>
  );
};

// Helper: Displays a number (e.g., 23) as two animated digits
const NumberSlot = ({ value, pad = 2 }: { value: number; pad?: number }) => {
  const digits = String(value).padStart(pad, '0').split('').map(Number);

  return (
    <div className="flex">
      {digits.map((digit, index) => (
        <div
          key={index}
          className="h-12 w-8 sm:h-16 sm:w-10 text-4xl sm:text-6xl font-bold overflow-hidden"
        >
          <AnimatedNumber number={digit} />
        </div>
      ))}
    </div>
  );
};


const TimeBlock = ({ value, label, pad }: { value: number; label: string, pad?: number }) => (
  <div className="flex flex-col items-center">
    <div className="flex p-2 bg-secondary rounded-lg shadow-inner">
      <NumberSlot value={value} pad={pad} />
    </div>
    <span className="mt-2 text-sm sm:text-base font-medium text-muted-foreground">{label}</span>
  </div>
);

// Helper function to parse date string "DD MMMM YYYY" in Indonesian
const parseIndonesianDate = (dateString: string): Date | null => {
    const parts = dateString.split(' ');
    if (parts.length < 3) return null;

    const day = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    const monthNames = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
    const monthIndex = monthNames.indexOf(parts[1].toLowerCase());

    if (isNaN(day) || isNaN(year) || monthIndex === -1) return null;

    return new Date(year, monthIndex, day);
};


export function BirthdayCountdown({ birthDateString }: { birthDateString: string }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const birthDate = parseIndonesianDate(birthDateString);
        if (!birthDate) return;

        const timer = setInterval(() => {
            const now = new Date();
            let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

            if (now > nextBirthday) {
                nextBirthday.setFullYear(now.getFullYear() + 1);
            }

            const distance = nextBirthday.getTime() - now.getTime();

            if (distance < 0) {
                 setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                 return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

        }, 1000);

        return () => clearInterval(timer);
    }, [birthDateString]);
    
    const showDays = timeLeft.days > 0;

    return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-primary">
            {showDays && <TimeBlock value={timeLeft.days} label="Hari" pad={timeLeft.days > 99 ? 3 : 2}/>}
            <TimeBlock value={timeLeft.hours} label="Jam" />
            <TimeBlock value={timeLeft.minutes} label="Menit" />
            <TimeBlock value={timeLeft.seconds} label="Detik" />
        </div>
    );
}