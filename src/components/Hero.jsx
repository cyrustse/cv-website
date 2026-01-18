import { useState, useEffect, useRef, useCallback } from 'react';

const Hero = ({ data }) => {
  const [binaryText, setBinaryText] = useState('');
  const [typingText, setTypingText] = useState('');
  
  const titles = data.hero.typingAnimation || ['IT Architect', 'Solution Architect', 'Tech Leader'];
  const currentTitleRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const isPausedRef = useRef(false);
  
  const binaryChars = '01';

  useEffect(() => {
    let interval;
    const generateBinary = () => {
      let text = '';
      for (let i = 0; i < 100; i++) {
        text += binaryChars[Math.floor(Math.random() * binaryChars.length)] + ' ';
      }
      setBinaryText(text);
    };
    
    generateBinary();
    interval = setInterval(generateBinary, 200);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  const typeText = useCallback(() => {
    const currentTitle = titles[currentTitleRef.current];
    
    if (isPausedRef.current) {
      return;
    }
    
    if (isDeletingRef.current) {
      setTypingText(currentTitle.substring(0, charIndexRef.current - 1));
      charIndexRef.current--;
      
      if (charIndexRef.current < 0) {
        isDeletingRef.current = false;
        currentTitleRef.current = (currentTitleRef.current + 1) % titles.length;
      }
    } else {
      setTypingText(currentTitle.substring(0, charIndexRef.current + 1));
      charIndexRef.current++;
      
      if (charIndexRef.current > currentTitle.length) {
        isPausedRef.current = true;
        setTimeout(() => {
          isPausedRef.current = false;
          isDeletingRef.current = true;
        }, 2000);
      }
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      typeText();
      const delay = isPausedRef.current ? 0 : (isDeletingRef.current ? 50 : 100);
      setTimeout(animate, delay);
    };
    
    const timer = setTimeout(animate, 100);
    return () => clearTimeout(timer);
  }, [typeText]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Binary Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] font-mono text-xs leading-[1] overflow-hidden select-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, ${binaryText} 25%, ${binaryText} 26%, transparent 27%, transparent 74%, ${binaryText} 75%, ${binaryText} 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${binaryText} 25%, ${binaryText} 26%, transparent 27%, transparent 74%, ${binaryText} 75%, ${binaryText} 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="w-full h-1 bg-hacker-green absolute animate-[scanline_6s_linear_infinite]" style={{
          animation: 'scanline 6s linear infinite'
        }}></div>
      </div>
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-hacker-green text-sm mb-6 tracking-widest uppercase animate-pulse">
            {data.hero.scrollIndicator}
          </p>
          
          <p className="font-mono text-gray-500 text-sm mb-3 uppercase tracking-wider">
            {data.hero.greeting}
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative inline-block">
            <span className="text-gradient">{data.profile.name}</span>
            {/* Glitch effect on hover */}
            <span className="absolute inset-0 text-hacker-green opacity-0 hover:opacity-70 glitch-overlay" style={{ animation: 'glitch-skew 0.3s infinite' }}>
              {data.profile.name}
            </span>
          </h1>
          
          <div className="inline-block px-6 py-2 border border-hacker-green/30 rounded-full mb-6">
            <h2 className="text-lg md:text-xl text-gray-300 font-mono">
              {data.profile.title}
            </h2>
            {/* Typing animation for roles */}
            <div className="mt-2 text-hacker-green text-sm font-mono min-h-[1.5rem] flex items-center justify-center gap-1">
              <span>{typingText}</span>
              <span className="typing-cursor inline-block w-0.5 h-4 bg-hacker-green animate-pulse"></span>
            </div>
          </div>
          
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
            {data.profile.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-sm tracking-wider hover:glitch"
              data-text={data.hero.buttons.primary}
            >
              {data.hero.buttons.primary}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-secondary text-sm tracking-wider"
            >
              {data.hero.buttons.secondary}
            </button>
          </div>
        </div>
        
        {/* Profile Avatar */}
        <div className="flex justify-center mt-16">
          <div className="relative">
            {/* Animated Border */}
            <div className="absolute -inset-0.5 bg-hacker-green opacity-30 blur-xl animate-pulse rounded-full"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border border-hacker-green/50 flex items-center justify-center glow bg-hacker-dark">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-hacker-gray/50 flex items-center justify-center overflow-hidden group">
                <img
                  src="/profile.jpg"
                  alt={data.profile.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Glitch overlay on hover */}
                <div className="absolute inset-0 bg-hacker-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-hacker-green/50 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-hacker-green/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-hacker-green rounded-full animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
