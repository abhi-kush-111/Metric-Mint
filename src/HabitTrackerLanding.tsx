import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const InteractiveDemo = lazy(() => import('./components/InteractiveDemo'));

function LazyLoad({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="min-h-[400px]">{isVisible ? children : null}</div>;
}


const RazorpayPaymentButton = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && formRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_SP73PY1j8GHFRI');
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, []);

  return <form ref={formRef}></form>;
};

const TESTIMONIALS = [
  { quote: "As a college student, my routine was very messy. After using this tracker, I finally have a clear view of my study hours.", author: "Raj Patel" },
  { quote: "I love that it's a one-time payment. Most apps charge a monthly fee for simple tracking.", author: "Ananya Iyer" },
  { quote: "The automated charts are the best part. Seeing my win rate go up every week is the dopamine hit I need.", author: "Rahul Singh" },
  { quote: "The system actually works. No friction, no complex apps. Just clear progress.", author: "Vikram S." },
  { quote: "As a college student, my routine was very messy. After using this tracker, I finally have a clear view of my study hours.", author: "Ram Pandit" },
];

export default function HabitTrackerLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18 * 3600 + 45 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  
  useEffect(() => {
    let intervalId: number;
    
    const startCarousel = () => {
      intervalId = window.setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.clearInterval(intervalId);
      } else {
        startCarousel();
      }
    };

    startCarousel();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const faqs = [
    { question: 'What if I don\'t know how to use Google Sheets?', answer: 'Don\'t worry, you don\'t need to be a spreadsheet expert! It\'s designed to be super intuitive—just click the checkboxes and your dashboard updates automatically. Plus, we include a quick guide to help you get started.' },
    { question: 'How do I get access after purchasing?', answer: 'Right after you complete your purchase, you\'ll get instant access to a link. Just click it, make a copy to your own Google Drive, and you\'re ready to start tracking right away!' },
    { question: 'Can I customize the habits?', answer: 'Absolutely. The sheet is fully editable. You can add up to 20 habits and change them anytime.' },
    { question: 'Is this a one-time payment?', answer: 'Yes. You pay once and own it forever. No monthly fees.' },
    { question: 'Does this work on mobile?', answer: 'Yes, it works perfectly with the free Google Sheets app on iOS and Android.' },
  ];

  if (location.pathname === '/habit-tracker/thank-you') {
    return (
      <div className="antialiased gradient-bg min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="glass-card p-8 md:p-12 rounded-3xl max-w-2xl w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-purple mb-4 tracking-tight">Payment Successful!</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
            Thank you for your purchase. You can now access your Ultimate Habit Tracker Google Sheet.
          </p>
          <a 
            href="https://drive.google.com/file/d/1f1qLIUYbwX1t_Q9__UkYRN1iZIAHLEyh/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-purple px-8 py-4 rounded-full text-lg font-bold shadow-xl w-full md:w-auto text-center"
          >
            Access Google Sheet Now
          </a>
          <p className="text-sm text-gray-500 mt-6">
            Please make a copy of the sheet to your own Google Drive to start editing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased gradient-bg min-h-screen">
      <div className="fixed top-0 w-full z-[60] h-[48px] bg-red-600 text-white flex items-center justify-center text-[12px] sm:text-[14px] px-2 md:px-4 font-medium shadow-md overflow-hidden">
        <div className="flex items-center justify-center whitespace-nowrap">
          <span>⚡ 24-Hour Sale Live Now —</span>
          <span className="line-through opacity-80 mx-1.5">₹99</span>
          <span className="font-extrabold text-[18px] sm:text-[20px] mx-1.5">₹49</span>
          <span className="hidden sm:inline">Grab it before it's gone!</span>
          <span className="ml-2 sm:ml-3 font-mono font-bold bg-black/20 px-2 py-0.5 rounded tracking-wider">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <nav className="absolute top-[48px] w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center glass-card border-b border-gray-100">
        <div className="text-lg md:text-xl font-bold tracking-tighter text-brand-purple">TRACKKER.</div>
        <div className="flex items-center justify-center"><RazorpayPaymentButton /></div>
      </nav>

      <header className="pt-32 md:pt-44 pb-10 md:pb-12 px-0 md:px-6 flex flex-col items-center w-full overflow-hidden">
        <div className="px-6 md:px-0 flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-10"
          >
            <motion.button 
              animate={{ 
                y: [0, -6, 0],
                boxShadow: [
                  "0px 4px 20px rgba(0,0,0,0.05)", 
                  "0px 12px 25px rgba(236,72,153,0.15)", 
                  "0px 4px 20px rgba(0,0,0,0.05)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              onClick={() => {
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group p-[1.5px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {/* Spinning Gradient Border */}
              <div className="absolute w-[400%] h-[400%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_200deg,#ec4899_280deg,#8b5cf6_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Inner White Pill */}
              <div className="relative bg-white px-6 md:px-8 py-3 md:py-3.5 rounded-full flex items-center justify-center gap-1.5 w-full h-full">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-500">
                  TRY <span className="text-pink-500">INTERACTIVE</span> DEMO
                </span>
                <span className="text-pink-500 ml-1 group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
              </div>
            </motion.button>
          </motion.div>
          
          <h1 
            className="font-extrabold text-5xl sm:text-6xl md:text-[96px] text-center leading-[0.9] mb-6 tracking-tight text-gray-900 uppercase"
          >
            HABIT <br /> TRACKER
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative inline-block mb-10 md:mb-12"
          >
            <h2 className="font-serif text-xl sm:text-3xl md:text-5xl italic text-gray-400 relative z-10 whitespace-nowrap">
              Build consistency in Just <span className="text-black">30 days</span>
            </h2>
            <div className="absolute bottom-1 left-0 w-full h-2 md:h-4 bg-indigo-100/80 -z-10 rounded-full"></div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xs md:max-w-md text-center text-gray-500 text-base md:text-xl mb-10 md:mb-12 leading-relaxed"
          >
            A simple habit tracker that helps you stay consistent and see real progress. No fluff, just results.
          </motion.p>
        </div>

        <div 
          className="relative w-full max-w-4xl mx-auto mb-6 px-2 md:px-4"
        >
          <div className="bg-gray-50 p-1.5 md:p-4 rounded-2xl md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden">
            <img 
              src="/hero.webp" 
              alt="Habit Tracker Dashboard Preview" 
              className="rounded-xl md:rounded-[1.8rem] w-full h-auto block" 
              fetchPriority="high"
              decoding="async"
              loading="eager"
            />
          </div>
          
          <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:right-0 bg-blue-400 text-white w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center text-center p-2 md:p-4 shadow-xl transform rotate-12 border-2 md:border-4 border-white font-black text-[9px] md:text-[10px] uppercase leading-tight hover:scale-110 transition-transform z-10">
            RE-USE <br /> OVER & <br /> OVER
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="flex justify-center mt-6 mb-8 px-4">
          <div className="bg-white border border-[#EEEEEE] rounded-[20px] px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-full max-w-[360px] sm:max-w-none sm:w-fit flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            
            {/* Left Section: Avatars & People Count */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center shrink-0">
                {[
                  "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=150&h=150&auto=format&fit=crop", // Indian man
                  "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?q=80&w=150&h=150&auto=format&fit=crop", // Indian woman
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop", // Indian man
                  "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=150&h=150&auto=format&fit=crop", // Indian woman
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop"  // Indian man
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Indian User"
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm ${i > 0 ? '-ml-3' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-poppins font-bold text-[15px] md:text-[16px] text-[#1A1A1A] leading-tight">1,384+ people</span>
                <span className="font-poppins font-normal text-[13px] md:text-[14px] text-[#666666] leading-tight">building consistency</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-[#DDDDDD] shrink-0"></div>
            <div className="sm:hidden w-full h-[1px] bg-[#F5F5F5]"></div>

            {/* Right Section: Rating */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0.5 shrink-0">
              <div className="flex gap-0.5 text-[#E8855A] text-[14px]">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <span className="font-poppins font-medium text-[12px] md:text-[13px] text-[#666666]">4.9/5 rating</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center px-4 md:px-0"
        >
          <div className="grid grid-cols-2 lg:flex gap-4 md:gap-12 mb-10 md:mb-12 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-700">
            <div className="flex items-center gap-1 md:gap-2"><span className="text-yellow-500 text-base md:text-lg">✔</span> One-time purchase</div>
            <div className="flex items-center gap-1 md:gap-2"><span className="text-yellow-500 text-base md:text-lg">✔</span> No subscriptions</div>
            <div className="flex items-center gap-1 md:gap-2"><span className="text-yellow-500 text-base md:text-lg">✔</span> Editable anytime</div>
            <div className="flex items-center gap-1 md:gap-2"><span className="text-yellow-500 text-base md:text-lg">✔</span> Lifetime access</div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-center w-full"><RazorpayPaymentButton /></div>
          </div>
          
          <div className="mt-6 text-red-500 font-bold text-sm md:text-base animate-pulse tracking-wide">🔥 24 Hour Sale is Live Now!</div>
          <p className="mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">Instant download • One-time payment</p>
        </motion.div>
      </header>

      <section className="py-10 md:py-16 px-4 md:px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Try it yourself</h2>
            <p className="text-gray-500 mb-6 px-4">Experience the dopamine hit of a completed task.</p>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm shadow-sm animate-bounce">
              <span>👇</span> Click the checkboxes below!
            </div>
          </div>
          
          <div id="demo" className="relative">
            <div className="md:hidden absolute -top-8 right-0 flex items-center gap-1 text-[10px] font-bold text-purple-400 animate-pulse">
              Swipe to explore <Plus size={12} />
            </div>
            <LazyLoad>
              <Suspense fallback={
                <div className="w-full h-[400px] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Interactive Dashboard...</p>
                  </div>
                </div>
              }>
                <InteractiveDemo />
              </Suspense>
            </LazyLoad>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl text-center mb-16 leading-tight"
        >
          Why staying consistent <br /> feels impossible?
        </motion.h2>
        
        <div className="space-y-4">
          {[
            "You start strong, then miss one day",
            "Tracking stops, motivation fades",
            "Progress disappears, habits feel pointless"
          ].map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl flex items-center gap-5"
            >
              <span className="bg-red-50 text-red-400 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold shrink-0">
                <X size={16} />
              </span>
              <p className="font-semibold text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center italic text-gray-500 border-l-4 border-purple-100 pl-8 py-4 mx-auto max-w-md"
        >
          "You do not rise to the level of your goals. You fall to the level of your systems."
          <br /> <span className="text-[10px] font-bold not-italic mt-4 block uppercase tracking-[0.2em] text-gray-400">— James Clear, Atomic Habits</span>
        </motion.div>
      </section>

      <section id="testimonials" className="py-24 bg-purple-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">What our users say</h2>
          
          <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10 text-center"
              >
                <p className="text-purple-100 text-lg md:text-2xl leading-relaxed italic mb-8">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </p>
                <p className="font-bold text-white text-sm md:text-base uppercase tracking-widest">
                  — {TESTIMONIALS[currentTestimonial].author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 -ml-4 md:-ml-12 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 -mr-4 md:-mr-12 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === i ? 'bg-white w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="pt-24 md:pt-32 pb-16 px-6 max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-center mb-12 md:mb-16"
        >
          Frequently Asked <br /> Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-gray-100 cursor-pointer py-6" 
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-700">{faq.question}</h4>
                <span className={`text-xl transition-transform duration-300 ${activeFaq === i ? 'rotate-45' : ''}`}>
                  <Plus size={20} />
                </span>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-gray-500 text-sm pt-4">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section id="cta-section" className="pt-16 pb-32 px-4 md:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-gray-50"
        >
          <h2 className="font-serif text-4xl md:text-7xl mb-8 md:mb-12 leading-none">Start your journey <br /> <span className="italic text-gray-300">today.</span></h2>
          <div className="flex justify-center w-full"><RazorpayPaymentButton /></div>
          <div className="mt-5 text-red-500 font-bold text-sm md:text-base animate-pulse tracking-wide">🔥 24 Hour Sale is Live Now!</div>
          <p className="mt-6 md:mt-8 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instant Google Drive Delivery</p>
        </motion.div>
      </section>

      <footer className="py-12 px-4 text-center text-gray-400 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-gray-500 font-bold">
          <button onClick={() => setShowContact(true)} className="hover:text-purple-900 uppercase tracking-[0.2em] md:tracking-[0.4em]">Contact Us</button>
          <button onClick={() => setShowTerms(true)} className="hover:text-purple-900 uppercase tracking-[0.2em] md:tracking-[0.4em]">Terms and Conditions</button>
          <button onClick={() => setShowPrivacy(true)} className="hover:text-purple-900 uppercase tracking-[0.2em] md:tracking-[0.4em]">Privacy Policy</button>
        </div>
        © 2026 TRACKKER BY METRICMINT • ALL RIGHTS RESERVED
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {(showTerms || showPrivacy || showContact) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => { setShowTerms(false); setShowPrivacy(false); setShowContact(false); }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  {showTerms ? 'Terms and Conditions' : showPrivacy ? 'Privacy Policy' : 'Contact Us'}
                </h3>
                <button 
                  onClick={() => { setShowTerms(false); setShowPrivacy(false); setShowContact(false); }}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto text-gray-600 text-sm leading-relaxed space-y-4">
                {showTerms ? (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Last updated: January 2026</p>
                    <p>Please read these Terms and Conditions carefully before purchasing or downloading any product from MetricMint. By completing a purchase, you confirm that you have read, understood, and agree to be bound by these terms.</p>
                    
                    <h4 className="font-bold text-gray-900 mt-6 text-base">1. Introduction</h4>
                    <p>Welcome to MetricMint. These Terms and Conditions govern your purchase and use of the Ultimate Habit Tracker and any other digital products sold through our store. By completing a purchase, you agree to these terms in full.</p>
                    
                    <h4 className="font-bold text-gray-900 mt-6 text-base">2. License and Use</h4>
                    <p>When you purchase the Ultimate Habit Tracker, you are granted a non-exclusive, non-transferable license to use the product for personal, non-commercial purposes only.</p>
                    <ul className="list-none space-y-2 mt-2">
                      <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> You MAY use the spreadsheet for your own personal habit tracking.</li>
                      <li className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span> You MAY make a personal backup copy of the file for your own use.</li>
                      <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> You MAY NOT resell, redistribute, or share the file with others.</li>
                      <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> You MAY NOT claim ownership of the design or structure of the spreadsheet.</li>
                      <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✗</span> You MAY NOT use the product as a basis for a competing commercial product.</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">3. Intellectual Property</h4>
                    <p>All content, designs, templates, and assets included in the Ultimate Habit Tracker are the exclusive intellectual property of MetricMint. All rights are reserved. Unauthorized reproduction, modification, distribution, or commercial use of any part of our products is strictly prohibited and may result in legal action.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">4. Refunds and Returns</h4>
                    <p>Due to the instant-access nature of digital goods, all sales are final once the file has been delivered. We do not offer refunds after download. However, if you experience a technical issue that prevents you from accessing your purchase, please contact us at MetricMint1@gmail.com and we will do our best to make it right.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">5. Limitation of Liability</h4>
                    <p>MetricMint's products are provided "as is" without warranty of any kind. We are not liable for any data loss, damages, or issues arising from the use of our spreadsheets. It is your responsibility to maintain backups of your personal data. Our total liability in any circumstances shall not exceed the amount you paid for the product.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">6. Changes to These Terms</h4>
                    <p>We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be posted on our store with an updated effective date. Continued use of our products after such changes constitutes your acceptance of the new terms.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">7. Contact Us</h4>
                    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                    <p className="font-medium text-purple-900">MetricMint1@gmail.com</p>
                    
                    <div className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100 flex justify-between">
                      <span>MetricMint · Trackker</span>
                      <span>metricmint1@gmail.com</span>
                    </div>
                  </div>
                ) : showPrivacy ? (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Last updated: January 2026</p>
                    <p>At MetricMint, we respect your privacy and are committed to being transparent about how we handle your information. This Privacy Policy explains what data we collect, how we use it, and your rights in relation to it.</p>
                    
                    <h4 className="font-bold text-gray-900 mt-6 text-base">1. Information We Collect</h4>
                    <p>We collect information you provide directly to us when you make a purchase, such as your name and email address. We do not store your payment information on our servers; payments are processed securely by our trusted third-party payment processors.</p>
                    
                    <h4 className="font-bold text-gray-900 mt-6 text-base">2. How We Use Your Information</h4>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Process your transactions and deliver your digital product.</li>
                      <li>Send you transaction receipts and download links.</li>
                      <li>Respond to your comments, questions, and customer service requests.</li>
                      <li>Send you updates or news about our products (only if you opted in).</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">3. Data Protection</h4>
                    <p>We take reasonable and appropriate measures to help protect information about you from loss, theft, misuse, and unauthorized access. While no system is completely secure, we continuously work to safeguard your personal data.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">4. Cookies</h4>
                    <p>We may use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience. You can instruct your browser to refuse all cookies or to notify you when a cookie is being sent. Please note that some features of our service may not function properly without cookies.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">5. Your Rights</h4>
                    <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise any of these rights, please contact us using the details below.</p>

                    <h4 className="font-bold text-gray-900 mt-6 text-base">6. Contact Us</h4>
                    <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please don't hesitate to reach out to us:</p>
                    <p className="font-medium text-purple-900">MetricMint1@gmail.com</p>
                    
                    <div className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100 flex justify-between">
                      <span>MetricMint · Trackker</span>
                      <span>metricmint1@gmail.com</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center py-8">
                    <p className="text-lg text-gray-600 mb-6">We are here to help you on your journey to consistency. Whether you have a question about the tracker, need technical support, or just want to share your progress, we'd love to hear from you.</p>
                    
                    <h4 className="font-bold text-gray-900 mt-8 text-xl">Get in Touch</h4>
                    <p className="mb-4">For fastest support, please email us directly. We aim to respond to all inquiries within 24 hours.</p>
                    
                    <div className="bg-purple-50 p-6 rounded-2xl inline-block mt-4">
                      <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2">Support Email</p>
                      <a href="mailto:MetricMint1@gmail.com" className="text-2xl font-bold text-purple-900 hover:text-purple-700 transition-colors">MetricMint1@gmail.com</a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
