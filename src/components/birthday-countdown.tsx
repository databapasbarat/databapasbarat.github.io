"use client";

import { useState, useEffect } from 'react';

// Helper untuk mem-parsing tanggal lahir dalam format Indonesia.
const parseIndonesianDate = (dateString: string): Date | null => {
    const datePart = dateString.includes(',') ? dateString.split(',')[1].trim() : dateString.trim();
    const parts = datePart.split(' ');
    if (parts.length < 3) return null;

    const day = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    const monthNames = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
    const monthIndex = monthNames.indexOf(parts[1].toLowerCase());

    if (isNaN(day) || isNaN(year) || monthIndex === -1) return null;

    return new Date(year, monthIndex, day);
};

// Komponen untuk menampilkan satu blok waktu
const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-lg shadow-inner">
      <span className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground">{label}</span>
  </div>
);

export function BirthdayCountdown({ birthDateString }: { birthDateString: string }) {
    const [timeLeft, setTimeLeft] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
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

            let tempDate = new Date(now.getTime());
            let months = 0;
            while(tempDate < nextBirthday) {
              tempDate.setMonth(tempDate.getMonth() + 1);
              if(tempDate <= nextBirthday) {
                months++;
              }
            }
            tempDate.setMonth(tempDate.getMonth() - 1);
            if (months > 0) {
              months--;
            }


            let runningDate = new Date(now.getTime());
            runningDate.setMonth(runningDate.getMonth() + months);


            const days = Math.floor((nextBirthday.getTime() - runningDate.getTime()) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ months, days, hours, minutes, seconds });

        }, 1000);

        return () => clearInterval(timer);
    }, [birthDateString]);

    if (!isMounted) {
      return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-secondary rounded-lg"></div>
          ))}
        </div>
      );
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <TimeBlock value={timeLeft.months} label="Bulan" />
            <TimeBlock value={timeLeft.days} label="Hari" />
            <TimeBlock value={timeLeft.hours} label="Jam" />
            <TimeBlock value={timeLeft.minutes} label="Menit" />
            <TimeBlock value={timeLeft.seconds} label="Detik" />
        </div>
    );
}