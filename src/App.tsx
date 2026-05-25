import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ShoppingBag, CheckCircle, X, Zap, Shield, Flame, Activity, Sliders, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import chocolateImg from './assets/images/choclate (1).png';
import unflavoredImg from './assets/images/unflavored (1).png';
import cookieImg from './assets/images/cookie (1).png';

type ImageItem = {
  id: number;
  name: string;
  bgText: string;
  category: string;
  price: string;
  src: string;
  bg: string;
  panel: string;
  rating: string;
  description: string;
  weight: string;
  servings: string;
  protein: string;
};

const IMAGES: ImageItem[] = [
  {
    id: 1,
    name: 'CHOCLATE PROTEIN',
    bgText: 'CHOCLATE',
    category: 'Whey Isolate',
    price: '$25.00',
    src: chocolateImg,
    bg: '#A16A47',
    panel: '#D2691E',
    rating: '4.9 ★',
    description: 'Ultra-premium chocolate whey isolate protein powder. Delicious rich Belgian cocoa taste combined with smooth instant mixability. Packed with essential amino acids to fuel muscle recovery and optimal growth.',
    weight: '2.2 lbs',
    servings: '30 Servings',
    protein: '25g',
  },
  {
    id: 2,
    name: 'UNFLAVORED PROTEIN',
    bgText: 'UNFLAVORED',
    category: 'Clean Concentrate',
    price: '$25.00',
    src: unflavoredImg,
    bg: '#5F8575',
    panel: '#2E8B57',
    rating: '4.8 ★',
    description: '100% pure unflavored protein concentrate. Absolutely zero artificial sweeteners, fillers, or additives. The perfect clean base to power your customized smoothies, breakfast bowls, or healthy baking recipes.',
    weight: '2.2 lbs',
    servings: '30 Servings',
    protein: '24g',
  },
  {
    id: 3,
    name: 'COOKIE PROTEIN',
    bgText: 'COOKIE',
    category: 'Gourmet Blend',
    price: '$25.00',
    src: cookieImg,
    bg: '#C5A880',
    panel: '#D4B483',
    rating: '5.0 ★',
    description: 'Gourmet cookies and cream flavor formulation. Authentic sweet baked flavor with real crushed cookie accents. Satisfy sweet cravings while effortlessly hitting daily dietary and workout intake goals.',
    weight: '2.2 lbs',
    servings: '30 Servings',
    protein: '24g',
  },
];

type AlternateProduct = {
  id: string;
  num: string;
  tag: string;
  title: string;
  description: string;
  spec1: string;
  spec2: string;
  price: string;
  color: string;
  iconName: 'zap' | 'shield' | 'flame' | 'activity' | 'sliders';
};

const ALT_PRODUCTS: AlternateProduct[] = [
  {
    id: 'chocolate',
    num: '01',
    tag: 'WHEY ISOLATE',
    title: 'Chocolate Protein',
    description: 'Ultra-premium chocolate whey isolate protein powder. Delicious rich Belgian cocoa taste with smooth instant mixability.',
    spec1: '25g Protein',
    spec2: '30 Servings',
    price: '$25.00',
    color: '#A16A47',
    iconName: 'flame',
  },
  {
    id: 'unflavored',
    num: '02',
    tag: 'CLEAN CONCENTRATE',
    title: 'Unflavored Protein',
    description: '100% pure unflavored protein concentrate. Absolutely zero artificial sweeteners, fillers, or additives. Perfect clean base.',
    spec1: '24g Protein',
    spec2: '30 Servings',
    price: '$25.00',
    color: '#ecdfcc',
    iconName: 'shield',
  },
  {
    id: 'cookie',
    num: '03',
    tag: 'GOURMET BLEND',
    title: 'Cookie Protein',
    description: 'Gourmet cookies and cream flavor formulation. Authentic sweet baked flavor with real crushed cookie accents.',
    spec1: '24g Protein',
    spec2: '30 Servings',
    price: '$25.00',
    color: '#C5A880',
    iconName: 'sliders',
  },
  {
    id: 'creatine',
    num: '04',
    tag: 'EXPLOSIVE POWER',
    title: 'Cellular ATP Energizer',
    description: '100% pure micronized creatine monohydrate. Designed to maximize muscle hydration, increase bench press peak power, and speed up recovery.',
    spec1: '5g Pure Creatine',
    spec2: '60 Servings',
    price: '$28.00',
    color: '#3b82f6',
    iconName: 'zap',
  },
  {
    id: 'bcaa',
    num: '05',
    tag: 'RECOVERY SYNTHESIS',
    title: 'Essential Amino Peak',
    description: 'Precision 2:1:1 ratio of fermented instantized BCAAs. Keeps muscle breakdown (catabolism) at bay during intense fasted cardio.',
    spec1: '7g BCAAs Blend',
    spec2: '30 Servings',
    price: '$32.00',
    color: '#fbbf24',
    iconName: 'activity',
  },
  {
    id: 'preworkout',
    num: '06',
    tag: 'ADRENALINE REFINEMENT',
    title: 'Cognitive Surge Infusion',
    description: 'Clinical strength pre-workout loaded with L-Citrulline, Beta-Alanine, and natural caffeine. Promotes razor-sharp laser focus.',
    spec1: '3.2g Beta-Alanine',
    spec2: '25 Servings',
    price: '$39.00',
    color: '#ef4444',
    iconName: 'flame',
  },
  {
    id: 'glutamine',
    num: '07',
    tag: 'ANABOLIC SHIELD',
    title: 'Glutamine Recovery Guard',
    description: 'Ultra-pure L-Glutamine powder to bolster immune response, fast-track gastrointestinal cellular integrity, and repair damaged muscle fibers.',
    spec1: '5g L-Glutamine',
    spec2: '50 Servings',
    price: '$24.00',
    color: '#10b981',
    iconName: 'shield',
  },
  {
    id: 'carnitine',
    num: '08',
    tag: 'METABOLIC TEXTURE',
    title: 'Lipid Transport Matrix',
    description: 'Highly bioavailable liquid L-Carnitine system. Instructs cells to utilize lipid reserves to fuel muscular locomotion.',
    spec1: '3000mg Carnitine',
    spec2: '31 Servings',
    price: '$26.00',
    color: '#8b5cf6',
    iconName: 'sliders',
  }
];

type Role = 'center' | 'left' | 'right' | 'back';

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION_MS = 650;

const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.08"/></svg>`;
const GRAIN_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}")`;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const [orderedProduct, setOrderedProduct] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Advanced Interactive Drawer Menu States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmailSub, setShowEmailSub] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = ['Products', 'Help', 'Support'];

  // Preload images
  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Window resize handler
  useEffect(() => {
    const onResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Scroll listener for auto-hiding navigation bar on scroll down and showing on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep visible at the very top of the page
      if (currentScrollY < 60) {
        setIsNavVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide if scrolling down past a threshold, show if scrolling up
      if (currentScrollY > lastScrollY.current + 8) {
        setIsNavVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsNavVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;
  const isShort = dimensions.height < 520 || (dimensions.height < 600 && dimensions.width > dimensions.height);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % IMAGES.length : (prev + IMAGES.length - 1) % IMAGES.length
      );
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setIsAnimating(false);
        timerRef.current = null;
      }, DURATION_MS);
    },
    [isAnimating]
  );

  const getRole = (index: number): Role => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + IMAGES.length - 1) % IMAGES.length) return 'left';
    if (index === (activeIndex + 1) % IMAGES.length) return 'right';
    return 'back';
  };

  const itemStyle = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      left: '50%',
      top: isShort ? '48%' : (isMobile ? '42%' : (isTablet ? '44%' : '43%')),
      height: isShort ? '56%' : (isMobile ? '48%' : (isTablet ? '52%' : '60%')),
      transition:
        `transform ${DURATION_MS}ms ${EASE}, ` +
        `filter ${DURATION_MS}ms ${EASE}, ` +
        `opacity ${DURATION_MS}ms ${EASE}`,
      willChange: 'transform, filter, opacity',
    };
    switch (role) {
      case 'center':
        return {
          ...base,
          transform: `translate(-50%, -50%) translate3d(0, 0, 0) scale(${isShort ? 1.15 : (isMobile ? 1.26 : (isTablet ? 1.34 : 1.48))})`,
          filter: 'none',
          opacity: 1,
          zIndex: 20,
        };
      case 'left':
        return {
          ...base,
          transform: `translate(-50%, -50%) translate3d(${isShort ? '-28vw' : (isMobile ? '-32vw' : (isTablet ? '-26vw' : '-20vw'))}, ${isShort ? '2vh' : (isMobile ? '2vh' : (isTablet ? '3vh' : '4vh'))}, 0) scale(${isShort ? 0.36 : (isMobile ? 0.38 : (isTablet ? 0.44 : 0.52))})`,
          filter: 'blur(3px) grayscale(40%)',
          opacity: 0.5,
          zIndex: 10,
        };
      case 'right':
        return {
          ...base,
          transform: `translate(-50%, -50%) translate3d(${isShort ? '28vw' : (isMobile ? '32vw' : (isTablet ? '26vw' : '20vw'))}, ${isShort ? '2vh' : (isMobile ? '2vh' : (isTablet ? '3vh' : '4vh'))}, 0) scale(${isShort ? 0.36 : (isMobile ? 0.38 : (isTablet ? 0.44 : 0.52))})`,
          filter: 'blur(3px) grayscale(40%)',
          opacity: 0.5,
          zIndex: 10,
        };
      case 'back':
        return {
          ...base,
          transform: `translate(-50%, -50%) translate3d(0, ${isShort ? '2vh' : (isMobile ? '2vh' : (isTablet ? '3vh' : '4vh'))}, 0) scale(${isShort ? 0.28 : (isMobile ? 0.31 : (isTablet ? 0.35 : 0.40))})`,
          filter: 'blur(6px)',
          opacity: 0.15,
          zIndex: 5,
        };
    }
  };

  const activeProduct = IMAGES[activeIndex];

  // Helper handling customized beautiful checkouts/alerts
  const triggerOrder = (productName: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setOrderedProduct(productName);
    toastTimerRef.current = window.setTimeout(() => {
      setOrderedProduct(null);
      toastTimerRef.current = null;
    }, 4000);
  };

  const [altIndex, setAltIndex] = useState(0);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link === 'Products') {
      e.preventDefault();
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateAlt = (direction: 'next' | 'prev') => {
    setAltIndex((prev) =>
      direction === 'next' ? (prev + 1) % ALT_PRODUCTS.length : (prev + ALT_PRODUCTS.length - 1) % ALT_PRODUCTS.length
    );
  };

  return (
    <div
      className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black scroll-smooth"
      style={{
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* 1. Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          backgroundImage: GRAIN_URI,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          opacity: 0.35,
        }}
      />

      {/* 2. Soft Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 65%, ${activeProduct.bg}44 0%, ${activeProduct.bg}11 25%, transparent 65%)`,
          zIndex: 1,
        }}
      />

      {/* 3. Global Decorative Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.7,
        }}
      />

      {/* Floating Elegant Order Toast Notification */}
      <AnimatePresence>
        {orderedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -15, scale: 0.95, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute top-20 sm:top-24 left-1/2 z-[100] w-[90%] max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3"
            style={{ boxShadow: `0 10px 40px ${activeProduct.bg}44` }}
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400 shrink-0" size={20} />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white">Pre-Order Placed!</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{orderedProduct} added to your cart.</p>
              </div>
            </div>
            <button 
              onClick={() => setOrderedProduct(null)} 
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-End Header with Brand on Left and Circular Hamburger Menu on Right (from requested mockup) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-6 sm:px-12 py-5 sm:py-6 transition-all duration-300 ease-in-out ${
          isNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: isNavVisible ? 'translate3d(0, 0, 1000px)' : 'translate3d(0, -80px, 1000px)',
        }}
      >
        {/* Brand Logo/Header */}
        <div className="font-extrabold text-[15px] sm:text-[17px] tracking-widest text-white uppercase select-none flex items-center gap-2">
          <Shield className="text-emerald-400 fill-emerald-400/10" size={18} />
          <span>ANABOLIC SHIELD<span className="text-emerald-400">™</span></span>
        </div>

        {/* Desktop Quick-Jump Pill in Navigation Bar - Highly Responsive and Styled */}
        <div className="hidden sm:flex items-center gap-1.5 border border-white/10 bg-black/45 backdrop-blur-xl rounded-full p-1 px-2.5">
          <button
            onClick={() => {
              const section = document.getElementById('products');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[10px] font-black tracking-widest text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-all cursor-pointer font-mono uppercase"
          >
            Products
          </button>
          
          <div className="w-[1.5px] h-3 bg-white/10" />
          
          <button
            onClick={() => {
              const section = document.getElementById('purpose');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[10px] font-black tracking-widest text-emerald-400 hover:text-emerald-300 px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-mono uppercase flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Purpose
          </button>
        </div>

        {/* Circular Menu Button with Glass Fill and Minimal SVG lines */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-11 h-11 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all text-white shadow-lg"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0,0,0,0.5)'
          }}
          aria-label="Open Navigation"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M1 1H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M1 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M1 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Premium Side Overlay Menu Drawer (from requested screenshot) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark fuzzy overlay glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu Panel Drawer with luxury glassmorphism */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-zinc-950 border-l border-white/10 z-[210] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto selection:bg-emerald-400 selection:text-black"
              style={{
                boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
                backgroundImage: 'linear-gradient(to bottom right, rgba(12,12,12,0.98), rgba(2,2,2,0.99))'
              }}
            >
              {/* Drawer Top Row containing logo and Circle close button style */}
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-[12px] tracking-widest text-[#9c9c9c] uppercase flex items-center gap-1.5 select-none">
                  <Shield size={14} className="text-emerald-400" />
                  <span>A.S™ PORTAL</span>
                </div>
                
                {/* Custom Elegant Circle Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 active:scale-95 transition-all cursor-pointer bg-white/[0.02]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col justify-center mt-10 mb-8 gap-8 sm:gap-10">
                {/* Section title */}
                <div>
                  <span className="text-[#6c6c6c] font-mono text-[10px] tracking-widest block mb-4 uppercase">
                    / Main Sections
                  </span>

                  {/* Navigation Links List */}
                  <div className="flex flex-col gap-5 sm:gap-6">
                    {/* Products Link */}
                    <a
                      href="#products"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setTimeout(() => {
                          const section = document.getElementById('products');
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 350);
                      }}
                      className="font-serif italic text-4xl sm:text-5xl text-white hover:text-emerald-400 tracking-wide transition-colors duration-300 flex items-center justify-between py-1 border-b border-white/5 pb-2 cursor-pointer"
                    >
                      <span>Products</span>
                      <span className="font-mono text-xs not-italic text-zinc-500 font-normal">01</span>
                    </a>

                    {/* Purpose Link - Added direct scroll tracking to newly requested Block 3 */}
                    <a
                      href="#purpose"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setTimeout(() => {
                          const section = document.getElementById('purpose');
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 350);
                      }}
                      className="font-serif italic text-4xl sm:text-5xl text-white hover:text-emerald-400 tracking-wide transition-colors duration-300 flex items-center justify-between py-1 border-b border-white/5 pb-2 cursor-pointer"
                    >
                      <span>Purpose</span>
                      <span className="font-mono text-xs not-italic text-zinc-500 font-normal">02</span>
                    </a>

                    {/* Dynamic Help Description Action */}
                    <div className="flex flex-col border-b border-white/5 pb-2">
                      <div className="flex items-center justify-between py-1">
                        <span className="font-serif italic text-4xl sm:text-5xl text-white tracking-wide">
                          Help/FAQ
                        </span>
                        <span className="font-mono text-xs text-zinc-500">03</span>
                      </div>
                      
                      {/* Help details / Accordion box */}
                      <div className="pl-4 border-l border-emerald-400/30 py-1.5 mt-2 flex flex-col gap-1.5 text-[11px] text-zinc-400 font-mono">
                        <p>• Fast-release amino matrices</p>
                        <p>• Metabolic protection shield</p>
                        <p>• Zero performance degradation</p>
                      </div>
                    </div>

                    {/* Support Link */}
                    <a
                      href="#support"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Support channel is active! Email: telemetry@anabolicshield.com");
                      }}
                      className="font-serif italic text-4xl sm:text-5xl text-white hover:text-emerald-300 tracking-wide transition-colors duration-300 flex items-center justify-between py-1 border-b border-white/5 pb-2 cursor-pointer"
                    >
                      <span>Support</span>
                      <span className="font-mono text-xs not-italic text-zinc-500 font-normal">04</span>
                    </a>
                  </div>
                </div>

                {/* Secondary Action/Signups matching screenshot */}
                <div className="border-t border-white/5 pt-6 sm:pt-8">
                  <span className="text-[#6c6c6c] font-mono text-[10px] tracking-widest block mb-4 uppercase">
                    / Member Portal
                  </span>

                  <div className="flex flex-col gap-4">
                    {/* Newsletter Register action */}
                    {!newsletterSubscribed ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setShowEmailSub(!showEmailSub)}
                          className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 font-medium text-sm transition-colors text-left"
                        >
                          <span className="text-zinc-500">+</span> Sign Me Up!
                        </button>
                        
                        {showEmailSub && (
                          <div className="flex gap-2 mt-1 animate-fade-in">
                            <input
                              type="email"
                              placeholder="Your email address"
                              value={newsletterEmail}
                              onChange={(e) => setNewsletterEmail(e.target.value)}
                              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 flex-1"
                            />
                            <button
                              onClick={() => {
                                if (newsletterEmail.includes('@')) {
                                  setNewsletterSubscribed(true);
                                } else {
                                  alert("Please enter a valid email address.");
                                }
                              }}
                              className="bg-zinc-800 hover:bg-emerald-400 hover:text-black font-semibold text-xs px-3 rounded-lg transition-colors cursor-pointer text-white"
                            >
                              Join
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400 font-mono py-1 flex items-center gap-2">
                        <CheckCircle size={12} /> Live telemetry updates registered!
                      </div>
                    )}

                    {/* Account login action */}
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setShowLoginModal(!showLoginModal)}
                          className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 font-medium text-sm transition-colors text-left"
                        >
                          <span className="text-zinc-500">→</span> Enter Portal
                        </button>

                        {showLoginModal && (
                          <div className="flex gap-2 mt-1 animate-fade-in">
                            <input
                              type="text"
                              placeholder="Enter login handle"
                              value={loginUsername}
                              onChange={(e) => setLoginUsername(e.target.value)}
                              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 flex-1"
                            />
                            <button
                              onClick={() => {
                                if (loginUsername.trim()) {
                                  setIsLoggedIn(true);
                                }
                              }}
                              className="bg-zinc-800 hover:bg-white hover:text-black font-semibold text-xs px-3 rounded-lg transition-colors cursor-pointer text-white"
                            >
                              Login
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-400 font-mono py-1 flex items-center justify-between">
                        <span className="text-white">● Welcome back, {loginUsername}!</span>
                        <button 
                          onClick={() => {
                            setIsLoggedIn(false);
                            setLoginUsername('');
                          }} 
                          className="text-[#6c6c6c] hover:text-white text-[10px] underline"
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom White Pill Primary Button to Order Active Product - Matches "Try it Live" */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    triggerOrder(activeProduct.name);
                  }}
                  className="w-full bg-white hover:bg-emerald-400 text-black font-bold tracking-widest text-[11px] sm:text-[12px] uppercase py-4 rounded-full flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  style={{ boxShadow: `0 10px 30px rgba(255,255,255,0.08)` }}
                >
                  <span>Pre-Order {activeProduct.name}</span>
                  <span>→</span>
                </button>
                <div className="text-center text-[10px] text-zinc-500 font-mono uppercase tracking-widest pt-1">
                  Active Formula: {activeIndex + 1} / {IMAGES.length}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO DISPLAY (Interactive Protein Powder) */}
      <section className="relative w-full h-screen min-h-[600px] sm:min-h-[700px] overflow-hidden select-none">

      {/* Main Massive Title Behind the Carousel */}
      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 3, top: isShort ? '13%' : '22%', height: isShort ? '16vw' : '24vw', minHeight: isShort ? '80px' : '140px' }}
      >
        {IMAGES.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <span
              key={item.id}
              style={{
                position: 'absolute',
                fontFamily: '"Anton", sans-serif',
                fontSize: isShort ? 'clamp(50px, 15vh, 150px)' : 'clamp(80px, 22vw, 360px)',
                fontWeight: 900,
                color: '#ffffff',
                opacity: isActive ? 0.08 : 0,
                transform: isActive ? 'scale(1)' : 'scale(0.92)',
                transition: isActive
                  ? `opacity 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 100ms, transform 650ms ${EASE}`
                  : `opacity 180ms cubic-bezier(0.25, 1, 0.5, 1), transform 250ms cubic-bezier(0.25, 1, 0.5, 1)`,
                lineHeight: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                willChange: 'opacity, transform',
              }}
            >
              {item.bgText}
            </span>
          );
        })}
      </div>

      {/* The Carousel Canvas */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {IMAGES.map((item, i) => (
          <div key={item.id} style={itemStyle(getRole(i))}>
            {/* Soft Ambient Shadow directly beneath the center image */}
            {getRole(i) === 'center' && (
              <div 
                className="absolute left-1/2 bottom-[-8%] -translate-x-1/2 w-[70%] h-4 rounded-full blur-xl transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.bg}, transparent)`,
                  boxShadow: `0 10px 40px ${item.bg}`,
                }}
              />
            )}

            <img
              src={item.src}
              alt={item.name}
              draggable={false}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-center select-none transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      {isShort ? (
        /* Dedicated iOS style landscape layout block to prevent overlap on short screens */
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none" style={{ zIndex: 60 }}>
          {/* LEFT SIDE: Brand/Product Info & Navigation */}
          <div className="absolute left-6 bottom-4 top-14 flex flex-col justify-end items-start pointer-events-auto max-w-[240px] gap-2.5">
            <div>
              <span 
                className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeProduct.bg}22`,
                  color: activeProduct.bg,
                  border: `1px solid ${activeProduct.bg}44`
                }}
              >
                {activeProduct.category}
              </span>
            </div>

            <div>
              <p className="text-sm font-extrabold uppercase tracking-tight text-white leading-tight">
                {activeProduct.name}
              </p>
              <p className="text-sm font-black font-mono mt-0.5" style={{ color: activeProduct.bg }}>
                {activeProduct.price}
              </p>
            </div>

            {/* Micro Navigation Arrows */}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => navigate('prev')}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.05] backdrop-blur-xl active:scale-95 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer"
                style={{ 
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
                }}
              >
                <ArrowLeft size={16} strokeWidth={2.5} color="#ffffff" />
              </button>
              <button
                type="button"
                onClick={() => navigate('next')}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.05] backdrop-blur-xl active:scale-95 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer"
                style={{ 
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
                }}
              >
                <ArrowRight size={16} strokeWidth={2.5} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Pre-Order, Ratings, and Specs */}
          <div className="absolute right-6 bottom-4 top-14 flex flex-col justify-end items-end pointer-events-auto max-w-[260px] gap-3">
            {/* Quick Specs */}
            <div 
              className="flex items-center gap-2.5 px-3 py-1.5 border border-white/10 bg-white/[0.05] backdrop-blur-xl rounded-xl"
              style={{ 
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Weight</span>
                <span className="text-[10px] font-extrabold text-white">{activeProduct.weight}</span>
              </div>
              <div className="w-[1px] h-3 bg-zinc-800/60" />
              <div className="flex flex-col items-center">
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Servings</span>
                <span className="text-[10px] font-extrabold text-white">{activeProduct.servings.split(' ')[0]}</span>
              </div>
              <div className="w-[1px] h-3 bg-zinc-800/60" />
              <div className="flex flex-col items-center">
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Protein / S.</span>
                <span className="text-[10px] font-extrabold text-white">{activeProduct.protein}</span>
              </div>
            </div>

            {/* Rating display */}
            <span className="text-zinc-400 text-[10px] font-semibold font-mono tracking-wider">{activeProduct.rating} RATING</span>

            {/* Compact Pre-Order Button */}
            <button
              onClick={() => triggerOrder(activeProduct.name)}
              className="flex items-center justify-center px-4.5 py-2.5 border border-white/10 bg-white/[0.05] backdrop-blur-xl text-white font-extrabold tracking-widest uppercase text-[10px] rounded-xl active:scale-95 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
              }}
            >
              Pre-Order
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ) : (
        /* Normal Desktop/Portrait Layout */
        <div
          className="absolute bottom-6 sm:bottom-16 left-6 right-6 sm:left-16 sm:right-16 flex flex-col md:flex-row justify-between items-end gap-6"
          style={{ zIndex: 60 }}
        >
          {/* Left Control Column and Interactive Product Detail */}
          <div className="max-w-md w-full flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <span 
                className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeProduct.bg}22`,
                  color: activeProduct.bg,
                  border: `1px solid ${activeProduct.bg}44`
                }}
              >
                {activeProduct.category}
              </span>
              <span className="text-zinc-500 text-xs font-medium font-mono">{activeProduct.rating}</span>
            </div>

            <p
              className="mb-1 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white flex items-center gap-2 transition-all duration-500"
            >
              {activeProduct.name}
            </p>

            <p className="text-xl sm:text-2xl font-black font-mono mb-3" style={{ color: activeProduct.bg }}>
              {activeProduct.price}
            </p>

            <p
              className="hidden sm:block text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed"
            >
              {activeProduct.description}
            </p>

            {/* Navigation Controls */}
            <div className="flex gap-3 sm:gap-4">
              <NavButton
                ariaLabel="Previous item"
                onClick={() => navigate('prev')}
                glowColor={activeProduct.bg}
              >
                <ArrowLeft size={22} strokeWidth={2.5} color="#ffffff" />
              </NavButton>
              <NavButton
                ariaLabel="Next item"
                onClick={() => navigate('next')}
                glowColor={activeProduct.bg}
              >
                <ArrowRight size={22} strokeWidth={2.5} color="#ffffff" />
              </NavButton>
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full md:w-auto">
            {/* Quick Specifications widget */}
            <div 
              className="hidden lg:flex items-center gap-6 px-6 py-4 border border-white/10 bg-white/[0.05] backdrop-blur-xl rounded-2xl"
              style={{ 
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
              }}
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Weight</span>
                <span className="text-xs font-extrabold text-white">{activeProduct.weight}</span>
              </div>
              <div className="w-[1px] h-6 bg-zinc-800/60" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Servings</span>
                <span className="text-xs font-extrabold text-white">{activeProduct.servings}</span>
              </div>
              <div className="w-[1px] h-6 bg-zinc-800/60" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Protein / Serv.</span>
                <span className="text-xs font-extrabold text-white">{activeProduct.protein}</span>
              </div>
            </div>

            <DiscoverLink activeProduct={activeProduct} onPreOrder={triggerOrder} />
          </div>
        </div>
      )}
      </section>

      {/* SECTION 2: ALTERNATIVE PRODUCTS & PROCESSES */}
      <section 
        id="products" 
        className="relative w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 px-6 sm:px-12 md:px-24 flex flex-col justify-center border-t border-white/[0.04] bg-[#030303] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center gap-6 sm:gap-8 md:gap-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 w-full">
            <div className="flex flex-col">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-none italic font-normal">
                Our Products.
              </h2>
            </div>

            {/* iOS style Pill controls for navigation */}
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateAlt('prev')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.05] backdrop-blur-xl active:scale-95 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer"
                style={{ 
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
                }}
              >
                <ArrowLeft size={20} strokeWidth={2.5} color="#ffffff" />
              </button>
              <button
                type="button"
                onClick={() => navigateAlt('next')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.05] backdrop-blur-xl active:scale-95 hover:bg-white/[0.12] transition-all duration-300 cursor-pointer"
                style={{ 
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
                }}
              >
                <ArrowRight size={20} strokeWidth={2.5} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Interactive Dynamic Cylindrical Carousel in a 3D overlay stack */}
          <div className="relative w-full h-[510px] sm:h-[550px] md:h-[590px] overflow-visible">

            <div className="w-full h-full relative flex items-center justify-center animate-fade-in" style={{ perspective: 1200, zIndex: 10 }}>
                {ALT_PRODUCTS.map((product, index) => {
                  const isFocused = index === altIndex;
                  
                  // Circular shortest distance difference for 8 elements
                  let diff = index - altIndex;
                  if (diff > 4) diff -= 8;
                  if (diff < -3) diff += 8;

                  const getCardTransforms = (d: number) => {
                    if (isMobile) {
                      switch (d) {
                        case 0: // Center
                          return {
                            x: 0,
                            y: 0,
                            rotateY: 0,
                            scale: 1,
                            opacity: 1,
                            zIndex: 30,
                            pointerEvents: 'auto' as const,
                          };
                        case -1: // Immediate Left
                          return {
                            x: -190,
                            y: 20,
                            rotateY: 18,
                            scale: 0.76,
                            opacity: 0.55,
                            zIndex: 20,
                            pointerEvents: 'auto' as const,
                          };
                        case 1: // Immediate Right
                          return {
                            x: 190,
                            y: 20,
                            rotateY: -18,
                            scale: 0.76,
                            opacity: 0.55,
                            zIndex: 20,
                            pointerEvents: 'auto' as const,
                          };
                        case -2: // Far Left
                          return {
                            x: -320,
                            y: 50,
                            rotateY: 30,
                            scale: 0.55,
                            opacity: 0,
                            zIndex: 10,
                            pointerEvents: 'none' as const,
                          };
                        case 2: // Far Right
                          return {
                            x: 320,
                            y: 50,
                            rotateY: -30,
                            scale: 0.55,
                            opacity: 0,
                            zIndex: 10,
                            pointerEvents: 'none' as const,
                          };
                        default:
                          return {
                            x: d < 0 ? -400 : 400,
                            y: 60,
                            rotateY: d < 0 ? 45 : -45,
                            scale: 0.45,
                            opacity: 0,
                            zIndex: 0,
                            pointerEvents: 'none' as const,
                          };
                      }
                    } else if (isTablet) {
                      switch (d) {
                        case 0: // Center
                          return {
                            x: 0,
                            y: 0,
                            rotateY: 0,
                            scale: 1.02,
                            opacity: 1,
                            zIndex: 30,
                            pointerEvents: 'auto' as const,
                          };
                        case -1: // Immediate Left
                          return {
                            x: -250,
                            y: 20,
                            rotateY: 22,
                            scale: 0.76,
                            opacity: 0.65,
                            zIndex: 20,
                            pointerEvents: 'auto' as const,
                          };
                        case 1: // Immediate Right
                          return {
                            x: 250,
                            y: 20,
                            rotateY: -22,
                            scale: 0.76,
                            opacity: 0.65,
                            zIndex: 20,
                            pointerEvents: 'auto' as const,
                          };
                        case -2: // Far Left
                          return {
                            x: -460,
                            y: 50,
                            rotateY: 38,
                            scale: 0.52,
                            opacity: 0.15,
                            zIndex: 10,
                            pointerEvents: 'none' as const,
                          };
                        case 2: // Far Right
                          return {
                            x: 460,
                            y: 50,
                            rotateY: -38,
                            scale: 0.52,
                            opacity: 0.15,
                            zIndex: 10,
                            pointerEvents: 'none' as const,
                          };
                        default:
                          return {
                            x: d < 0 ? -650 : 650,
                            y: 80,
                            rotateY: d < 0 ? 45 : -45,
                            scale: 0.45,
                            opacity: 0,
                            zIndex: 0,
                            pointerEvents: 'none' as const,
                          };
                      }
                    } else {
                      // Desktop layout - highly cylindrical U-shape curve
                      switch (d) {
                        case 0: // Center
                          return {
                            x: 0,
                            y: 0,
                            rotateY: 0,
                            scale: 1.05,
                            opacity: 1,
                            zIndex: 35,
                            pointerEvents: 'auto' as const,
                          };
                        case -1: // Immediate Left
                          return {
                            x: -320,
                            y: 30,
                            rotateY: 24,
                            scale: 0.75,
                            opacity: 0.72,
                            zIndex: 25,
                            pointerEvents: 'auto' as const,
                          };
                        case 1: // Immediate Right
                          return {
                            x: 320,
                            y: 30,
                            rotateY: -24,
                            scale: 0.75,
                            opacity: 0.72,
                            zIndex: 25,
                            pointerEvents: 'auto' as const,
                          };
                        case -2: // Far Left
                          return {
                            x: -560,
                            y: 75,
                            rotateY: 42,
                            scale: 0.52,
                            opacity: 0.24,
                            zIndex: 15,
                            pointerEvents: 'none' as const,
                          };
                        case 2: // Far Right
                          return {
                            x: 560,
                            y: 75,
                            rotateY: -42,
                            scale: 0.52,
                            opacity: 0.24,
                            zIndex: 15,
                            pointerEvents: 'none' as const,
                          };
                        default:
                          return {
                            x: d < 0 ? -800 : 800,
                            y: 100,
                            rotateY: d < 0 ? 55 : -55,
                            scale: 0.45,
                            opacity: 0,
                            zIndex: 0,
                            pointerEvents: 'none' as const,
                          };
                      }
                    }
                  };

                  const transforms = getCardTransforms(diff);
                  
                  const getIconComponent = (name: string, color: string) => {
                    switch (name) {
                      case 'zap': return <Zap size={15} style={{ color }} />;
                      case 'shield': return <Shield size={15} style={{ color }} />;
                      case 'flame': return <Flame size={15} style={{ color }} />;
                      case 'activity': return <Activity size={15} style={{ color }} />;
                      default: return <Sliders size={15} style={{ color }} />;
                    }
                  };

                  return (
                    <div
                      key={product.id}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d',
                        zIndex: transforms.zIndex,
                        pointerEvents: transforms.pointerEvents,
                      }}
                    >
                      <motion.div
                        onClick={() => setAltIndex(index)}
                        animate={{
                          x: transforms.x,
                          y: transforms.y,
                          rotateY: transforms.rotateY,
                          scale: transforms.scale,
                          opacity: transforms.opacity,
                          filter: isFocused ? 'none' : 'blur(2px) grayscale(30%)',
                        }}
                        transition={{
                          type: 'spring',
                          damping: 30,
                          stiffness: 110,
                          mass: 0.9,
                        }}
                        style={{
                          boxShadow: isFocused ? `0 20px 50px ${product.color}20` : '0 10px 30px rgba(0,0,0,0.5)',
                          transition: 'box-shadow 300ms, background-color 300ms, border-color 300ms',
                        }}
                        className={`shrink-0 w-[280px] sm:w-[310px] md:w-[350px] border rounded-[28px] p-5 sm:p-7 md:p-8 flex flex-col justify-between group select-none cursor-pointer overflow-hidden ${
                          isFocused 
                            ? 'border-white/15 bg-[#121212]' 
                            : 'border-white/[0.06] bg-[#0c0c0c]'
                        }`}
                      >
                        {/* Dynamic focused glow halo */}
                        <div 
                          className="absolute -inset-0.5 rounded-[30px] opacity-100 transition-opacity duration-300 blur-xl -z-10 pointer-events-none"
                          style={{
                            background: isFocused 
                              ? `linear-gradient(135deg, ${product.color}25, transparent 70%)`
                              : 'transparent'
                          }}
                        />

                        <div>
                          {/* Header capsule & custom serif index number */}
                          <div className="flex justify-between items-center w-full mb-8">
                            <div 
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.03]"
                              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}
                            >
                              {getIconComponent(product.iconName, product.color)}
                              <span className="text-[9px] font-black tracking-widest font-mono text-zinc-400 uppercase">
                                {product.tag}
                              </span>
                            </div>
                            <span className="font-serif text-[26px] font-black italic text-zinc-600 italic">
                              {product.num}
                            </span>
                          </div>

                          {/* Title & premium text body */}
                          <div className="flex flex-col gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-tight">
                              {product.title}
                            </h3>
                            <p className="text-[12px] text-zinc-400 font-medium leading-relaxed normal-case">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* Technical Specs at bottom */}
                        <div className="flex flex-col gap-4 mt-8 w-full">
                          <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-zinc-400">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Formula / serving</span>
                              <span className="text-white font-extrabold mt-0.5">{product.spec1}</span>
                            </div>
                            <div className="w-[1px] h-5 bg-white/10" />
                            <div className="flex flex-col">
                              <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Servings count</span>
                              <span className="text-white font-extrabold mt-0.5">{product.spec2}</span>
                            </div>
                          </div>

                          {/* Price & Action button */}
                          <div className="flex justify-between items-center w-full pt-4 border-t border-white/[0.06] mt-1">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-zinc-500 font-mono font-semibold uppercase tracking-wider">Price</span>
                              <span className="text-lg font-black font-mono leading-none mt-1" style={{ color: product.color }}>
                                {product.price}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isFocused) return;
                                triggerOrder(product.title);
                              }}
                              disabled={!isFocused}
                              className={`flex items-center justify-center px-4.5 py-2 border text-white font-extrabold tracking-widest uppercase text-[9px] rounded-xl active:scale-95 transition-all duration-300 ${
                                isFocused 
                                  ? 'border-white/10 bg-white/[0.05] hover:bg-white/[0.12] cursor-pointer' 
                                  : 'border-white/[0.03] bg-white/[0.02] opacity-30 cursor-default pointer-events-none'
                              }`}
                              style={{
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 18px rgba(0,0,0,0.5)',
                                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))'
                              }}
                            >
                              Pre-Order
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    </div>
                  );
                })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: CORE PURPOSE & TARGET AUDIENCE */}
      <section 
        id="purpose" 
        className="relative w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 px-6 sm:px-12 md:px-24 flex flex-col justify-start border-t border-white/[0.04] bg-[#050505] overflow-hidden"
      >
        {/* Ambient background accent light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full flex flex-col justify-start gap-8 sm:gap-12 md:gap-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full border-b border-white/[0.04] pb-8">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Who & What We Power
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white font-black tracking-tight leading-tight uppercase">
                Designed for the <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Tactical Threshold.</span>
              </h2>
            </div>
            
            <p className="text-zinc-400 text-xs sm:text-[13px] font-medium leading-relaxed max-w-sm normal-case">
              Anabolic Shield™ is not dietary supplement standard. It is bespoke cellular armor engineered specifically for competitive entities who command total metabolic resilience, elite bio-activation, and zero recovery latency.
            </p>
          </div>

          {/* Interactive Bento Core Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* COLUMN 1: WHO WE POWER (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-mono font-black text-zinc-500 tracking-wider">01 / TARGET CLIENTELE</div>
                <div className="h-[1px] flex-1 bg-white/[0.06]" />
              </div>
              
              <div className="group relative border border-white/[0.07] bg-[#0c0c0c] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-emerald-500/20 shadow-2xl">
                {/* Glow Backdrop */}
                <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-emerald-500/[0.02] rounded-full blur-3xl group-hover:bg-emerald-500/[0.05] transition-all duration-700 pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Elite Class</span>
                    <span className="text-emerald-400 text-[10px] font-mono font-bold">100% Bio-Aligned</span>
                  </div>
                  
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-black mb-4 uppercase">
                    The Competitive Vanguard
                  </h3>
                  
                  <p className="text-zinc-400 text-[12px] leading-relaxed mb-6 normal-case">
                    Formulated exclusively for athletes, military operators, high-stress executives, and ultra-marathon competitors who operate continuously in active calorie-burning, performance-critical states.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.05] pt-5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• Professional Athletes</span>
                    <span className="text-white font-mono font-bold">Max Power-to-Weight</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• Endurance Operators</span>
                    <span className="text-white font-mono font-bold">Extended Cellular Focus</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• High-Stamina Seekers</span>
                    <span className="text-white font-mono font-bold">Zero Crash Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: WHAT WE DELIVER (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-mono font-black text-zinc-500 tracking-wider">02 / CORE UTILITY</div>
                <div className="h-[1px] flex-1 bg-white/[0.06]" />
              </div>

              <div className="group relative border border-white/[0.07] bg-[#0c0c0c] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-emerald-500/20 shadow-2xl">
                {/* Glow Backdrop */}
                <div className="absolute -left-20 -top-20 w-60 h-60 bg-emerald-500/[0.02] rounded-full blur-3xl group-hover:bg-emerald-500/[0.05] transition-all duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Cell Mechanics</span>
                    <span className="text-emerald-400 text-[10px] font-mono font-bold font-black">Active Shielding</span>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-black mb-4 uppercase">
                    The Cellular Safeguard
                  </h3>

                  <p className="text-zinc-400 text-[12px] leading-relaxed mb-6 normal-case">
                    Shields skeletal muscle tissues from hyper-catabolic breakdown during extreme volume cycles, instantly supplying bio-compatible co-factors to preserve protein integrity.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.05] pt-5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• Anabolic Protection</span>
                    <span className="text-emerald-400 font-mono font-bold">Blocks Cortisol Spike</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• L-Carnitine Liquisome</span>
                    <span className="text-white font-mono font-bold">Lipid Reserve Transit</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-zinc-500 font-mono">• Neural Re-activation</span>
                    <span className="text-white font-mono font-bold">Alpha GPC Drive</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Deep Formula Highlight Banner */}
          <div 
            className="mt-4 border border-white/[0.05] bg-[#0a0a0a] rounded-[24px] p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-3xl"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(0,0,0,0) 80%)'
            }}
          >
            <div className="flex flex-col gap-2.5">
              <span className="text-[9px] font-mono font-black text-emerald-400 tracking-widest uppercase">
                // SCIENTIFIC ASSURANCE
              </span>
              <h4 className="font-serif italic text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                Not generic supplements. Personalized athletic defense.
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xl normal-case">
                Every formulation of Anabolic Shield™ is batch-tested in-house at our localized laboratory to confirm the structural viability of all amino transport carriers. No fillers, no chemical stabilizers, zero residual heavy metals.
              </p>
            </div>
            
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 bg-white text-black font-extrabold tracking-widest uppercase text-[10px] rounded-xl hover:bg-emerald-400 active:scale-95 transition-all text-center flex items-center gap-2 shrink-0 cursor-pointer"
            >
              Configure Your Formula
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 4: PREMIUM FOOTER IN STYLE OF THE PHOTO */}
      <footer className="w-full bg-black border-t border-white/[0.04] pt-16 sm:pt-20 pb-8 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
          
          {/* 5-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h5 className="font-mono text-[11px] font-black text-white tracking-widest uppercase">
                Customer Service
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400 text-xs font-mono">
                <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ordering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h5 className="font-mono text-[11px] font-black text-white tracking-widest uppercase">
                About Anabolic Shield
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400 text-xs font-mono">
                <li><a href="#" className="hover:text-white transition-colors">Authentic Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Quality</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Competition T&Cs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Modern Slavery Act Statement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability Commitment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">B2B Sign-up form</a></li>
                <li><a href="#" className="hover:text-white transition-colors">B2B Login</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Your Privacy Choices</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h5 className="font-mono text-[11px] font-black text-white tracking-widest uppercase">
                Explore
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400 text-xs font-mono">
                <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Athletes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recipes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health & Performance course</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recycle</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4">
              <h5 className="font-mono text-[11px] font-black text-white tracking-widest uppercase">
                Follow Us
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400 text-xs font-mono">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-4">
              <h5 className="font-mono text-[11px] font-black text-white tracking-widest uppercase">
                Need Help?
              </h5>
              <ul className="flex flex-col gap-2 text-zinc-400 text-xs font-mono">
                <li><a href="#" className="hover:text-white transition-colors">Submit Query</a></li>
                <li><span className="text-zinc-500 font-bold">+1 (800) 555-0199</span></li>
              </ul>
            </div>

          </div>

          {/* Region Picker Selector Row */}
          <div className="border-t border-white/[0.03] pt-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono select-none cursor-pointer hover:text-white w-fit transition-colors">
              <span className="inline-block w-4 text-[13px] leading-none">🇺🇸</span>
              <span className="tracking-wider uppercase font-bold text-[10px]">USA (USD $)</span>
              <span className="text-zinc-500 text-[9px]">▼</span>
            </div>
          </div>

          {/* Bottom Copyright & Payments badge row */}
          <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase text-center sm:text-left">
              &copy; 2026, Anabolic Shield™.
            </p>

            {/* Payment Method Badges resembling Shopify/Optimum Nutrition checkout */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                AMEX
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                 PAY
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1">
                <span className="text-emerald-400 font-sans">G</span> PAY
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                MC
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                MAESTRO
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                PAYPAL
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                SHOPIFY
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-0.5">
                UNION<span className="text-emerald-400">PAY</span>
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded px-2 py-1 text-[8px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                VISA
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

type NavBtnProps = {
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
  glowColor: string;
};

function NavButton({
  onClick,
  ariaLabel,
  children,
  glowColor,
}: NavBtnProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative active:scale-95 transition-all duration-300 backdrop-blur-xl border border-white/10"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))',
        backgroundColor: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        boxShadow: hover 
          ? `inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 8px 18px ${glowColor}33, 0 12px 40px rgba(0,0,0,0.6)`
          : 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

type DiscoverLinkProps = {
  activeProduct: ImageItem;
  onPreOrder: (name: string) => void;
};

function DiscoverLink({ activeProduct, onPreOrder }: DiscoverLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => onPreOrder(activeProduct.name)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center px-8 py-4 border border-white/10 bg-white/[0.05] backdrop-blur-xl text-white font-extrabold tracking-widest uppercase text-xs rounded-2xl active:scale-95 transition-all duration-300 cursor-pointer"
      style={{
        lineHeight: 1,
        boxShadow: hover
          ? `inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 12px 40px rgba(0,0,0,0.7), 0 0 25px ${activeProduct.bg}33`
          : 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 40px rgba(0,0,0,0.6)',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.01))',
        backgroundColor: hover ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      Pre-Order Now
      <ArrowRight
        className="w-4 h-4 ml-2 transition-transform duration-300"
        style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)' }}
        strokeWidth={2.5}
      />
    </button>
  );
}
