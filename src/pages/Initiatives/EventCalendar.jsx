import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm w-20 md:w-24">
    <span className="text-3xl md:text-4xl font-display font-bold text-white">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</span>
  </div>
);

const EventCalendar = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // TARGET DATE: Feb 5, 2026 11:00 AM (Adjust year as needed)
  useEffect(() => {
    const targetDate = new Date("February 5, 2026 11:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-16 md:mt-20 border-t border-white/10 pt-12 md:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* LEFT: The "Next Big Event" Countdown */}
        <div className="bg-gradient-to-br from-purple-900/50 to-primary-dark border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <span className="inline-block py-1 px-2 md:px-3 rounded-full bg-accent/20 text-accent text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4 border border-accent/20">
              Upcoming Flagship Event
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2">Founders Talk</h2>
            <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8">
              Interactive session with unicorns on the future of Indian Entrepreneurship.
            </p>

            {/* The Real-Time Countdown Grid */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hrs" />
              <CountdownUnit value={timeLeft.minutes} label="Mins" />
              <CountdownUnit value={timeLeft.seconds} label="Secs" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-xs md:text-sm text-gray-400 border-t border-white/10 pt-4 md:pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-accent flex-shrink-0" size={16} /> 5th Feb, 2026
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-accent flex-shrink-0" size={16} /> 11:00 AM
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-accent flex-shrink-0" size={16} /> Rajshree Hall
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Timeline of Other Events */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="text-gray-400" /> Event Calendar 2026
          </h3>
          <div className="space-y-4">
            {/* Event Item 1 */}
            <div className="flex group">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-accent mt-2"></div>
                <div className="w-0.5 h-full bg-white/10 group-last:bg-transparent mt-1"></div>
              </div>
              <div className="pb-8">
                <p className="text-xs text-accent font-bold mb-1">Feb 05</p>
                <h4 className="text-lg font-bold text-white">Founders Talk</h4>
                <p className="text-gray-400 text-sm">Rajshree Hall • 11:00 AM</p>
              </div>
            </div>

            {/* Event Item 2 */}
            <div className="flex group">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-600 mt-2"></div>
                <div className="w-0.5 h-full bg-white/10 group-last:bg-transparent mt-1"></div>
              </div>
              <div className="pb-8">
                <p className="text-xs text-gray-500 font-bold mb-1">Mar</p>
                <h4 className="text-lg font-bold text-gray-300">Coming Soon</h4>
                <p className="text-gray-500 text-sm">To be announced</p>
              </div>
            </div>

            {/* Event Item 3 */}
            <div className="flex group">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-600 mt-2"></div>
                <div className="w-0.5 h-full bg-white/10 group-last:bg-transparent mt-1"></div>
              </div>
              <div className="pb-8">
                <p className="text-xs text-gray-500 font-bold mb-1">April</p>
                <h4 className="text-lg font-bold text-gray-300">Coming Soon</h4>
                <p className="text-gray-500 text-sm">To be announced</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventCalendar;