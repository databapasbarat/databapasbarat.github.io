"use client";

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface FlipClockCardProps {
  value: number;
  label: string;
}

const FlipClockCard = ({ value, label }: FlipClockCardProps) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [previousValue, setPreviousValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);

    const formattedValue = String(value).padStart(2, '0');
    const formattedCurrentValue = String(currentValue).padStart(2, '0');
    const formattedPreviousValue = String(previousValue).padStart(2, '0');

    useEffect(() => {
        if (value !== currentValue) {
            setPreviousValue(currentValue);
            setCurrentValue(value);
            setIsFlipping(true);
            const timer = setTimeout(() => setIsFlipping(false), 600);
            return () => clearTimeout(timer);
        }
    }, [value, currentValue]);


    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 rounded-lg shadow-lg bg-secondary text-primary perspective">
                {/* Static Top Half */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary rounded-t-lg overflow-hidden">
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl sm:text-6xl font-bold">
                        {formattedValue}
                    </span>
                </div>

                {/* Static Bottom Half */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary rounded-b-lg overflow-hidden">
                     <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-4xl sm:text-6xl font-bold">
                        {formattedValue}
                    </span>
                </div>
                
                 {/* Top Flip Animation */}
                <div 
                    className={cn(
                        "absolute top-0 left-0 w-full h-1/2 bg-primary text-primary-foreground rounded-t-lg overflow-hidden z-10 transform-origin-bottom",
                        {"animate-flip-top": isFlipping}
                    )}
                >
                     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl sm:text-6xl font-bold">
                       {isFlipping ? formattedPreviousValue : formattedValue}
                    </span>
                </div>

                {/* Bottom Flip Animation */}
                <div 
                    className={cn(
                        "absolute bottom-0 left-0 w-full h-1/2 bg-primary text-primary-foreground rounded-b-lg overflow-hidden z-10 transform-origin-top",
                        {"animate-flip-bottom": isFlipping}
                    )}
                >
                     <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-4xl sm:text-6xl font-bold">
                       {isFlipping ? formattedCurrentValue : formattedValue}
                    </span>
                </div>


                {/* Separator */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-background/50 z-20"></div>
            </div>
            <span className="mt-2 text-sm sm:text-base font-medium text-muted-foreground">{label}</span>
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


export function BirthdayCountdown({ birthDateString }: { birthDateString: string }) {
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

            // More reliable calculation
            let months = nextBirthday.getMonth() - now.getMonth();
            let years = nextBirthday.getFullYear() - now.getFullYear();
            if (months < 0) {
              years--;
              months += 12;
            }
            if (now.getDate() > nextBirthday.getDate() && nextBirthday.getMonth() === now.getMonth()) {
               months--;
            }

            const totalSeconds = Math.floor(distance / 1000);
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Correct day calculation considering months
            let tempDate = new Date(now);
            tempDate.setMonth(tempDate.getMonth() + months);
            const daysInMonth = Math.floor((nextBirthday.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));


            setTimeLeft({ months, days: days, hours, minutes, seconds });

        }, 1000);

        return () => clearInterval(timer);
    }, [birthDateString]);

    return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {timeLeft.months > 0 && <FlipClockCard value={timeLeft.months} label="Bulan" />}
            <FlipClockCard value={timeLeft.days} label="Hari" />
            <FlipClockCard value={timeLeft.hours} label="Jam" />
            <FlipClockCard value={timeLeft.minutes} label="Menit" />
            <FlipClockCard value={timeLeft.seconds} label="Detik" />
        </div>
    );
}
