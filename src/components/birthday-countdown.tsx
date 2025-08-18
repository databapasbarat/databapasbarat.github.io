"use client";

import { useState, useEffect } from 'react';

interface BirthdayCountdownProps {
  birthDateString: string;
}

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg text-center w-24 h-24">
      <span className="text-3xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

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


export function BirthdayCountdown({ birthDateString }: BirthdayCountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        months: 0,
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
                 setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
                 return;
            }

            // Calculation logic
            const totalSeconds = Math.floor(distance / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            
            const seconds = totalSeconds % 60;
            const minutes = totalMinutes % 60;
            const hours = totalHours % 24;

            // More reliable month and day calculation
            let tempNow = new Date(now);
            let monthsLeft = 0;
            
            // Calculate full months left
            while(true) {
                let tempNextMonth = new Date(tempNow);
                tempNextMonth.setMonth(tempNextMonth.getMonth() + 1);
                if (tempNextMonth <= nextBirthday) {
                    monthsLeft++;
                    tempNow.setMonth(tempNow.getMonth() + 1);
                } else {
                    break;
                }
            }
            
            // Calculate remaining days after subtracting full months
            const daysDistance = nextBirthday.getTime() - tempNow.getTime();
            const daysLeft = Math.floor(daysDistance / (1000 * 60 * 60 * 24));


            setTimeLeft({ months: monthsLeft, days: daysLeft, hours, minutes, seconds });

        }, 1000);

        return () => clearInterval(timer);
    }, [birthDateString]);

    return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {timeLeft.months > 0 && <AnimatedCounter value={timeLeft.months} label="Bulan" />}
            <AnimatedCounter value={timeLeft.days} label="Hari" />
            <AnimatedCounter value={timeLeft.hours} label="Jam" />
            <AnimatedCounter value={timeLeft.minutes} label="Menit" />
            <AnimatedCounter value={timeLeft.seconds} label="Detik" />
        </div>
    );
}
