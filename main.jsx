import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Terminal, Cloud, Wind, Cpu, Mail, HardDrive, Info, Code, Zap, ChevronDown, ExternalLink, Github, Linkedin, Smartphone } from 'lucide-react';
import './index.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState([]);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Refs for managing scrolling and focusing
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const phrases = [
    "Establishing neural link with da web",
    "Scanning cloud density: 84%...",
    "Starcius.sh active. Welcome back... um, idk whatever you are"
  ];

  // Initial Loading Screen
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadTimer);
  }, []);

  // Force window to top when loading completes to prevent any browser scroll restoration
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      // Fallback for browsers that paint a tick later
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
  }, [loading]);

  // Boot Sequence and Clock
  useEffect(() => {
    if (loading) return;

    // Show the terminal window immediately after loading finishes
    setTimeout(() => setIsVisible(true), 50);

    let currentLine = 0;
    const bootInterval = setInterval(() => {
      if (currentLine < phrases.length) {
        setBootSequence(prev => [...prev, phrases[currentLine]]);
        currentLine++;
      } else {
        clearInterval(bootInterval);
        setIsBootComplete(true);
      }
    }, 800);

    const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => {
      clearInterval(bootInterval);
      clearInterval(clockInterval);
    };
  }, [loading]);

  // Focus input without scrolling the page once terminal boot completes
  useEffect(() => {
    if (isBootComplete && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isBootComplete]);

  // Handle internal terminal scrolling safely
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, bootSequence]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.toLowerCase().trim();
      if (!cmd) return;

      const newHistory = [...history, { type: 'user', text: cmd }];
      let response = "";

      switch (cmd) {
        case 'help': response = "Available protocols: [about, projects, skills, clear, contact, dream]"; break;
        case 'about': response = "The Starcius Project: A digital entity pushing AI to the edges of logic."; break;
        case 'projects': response = "Active Signals: [Dream-CLI, Adversarial-Prompt-Suite, Liminal-OS-v2]"; break;
        case 'skills': response = "Core Nodes: React, Vanilla JS, AI Stress-Testing, Prompt Engineering."; break;
        case 'clear': setHistory([]); setInputValue(''); return;
        case 'dream': response = "The clouds shift... the motion continues."; break;
        case 'contact': response = "Signal via hello@starcius.org"; break;
        default: response = `Unknown signal: ${cmd}. Type 'help' for protocol list.`;
      }

      if (response) newHistory.push({ type: 'system', text: response });
      setHistory(newHistory);
      setInputValue('');
    }
  };

  // Scroll Reveal Observer (The "Flow" effect)
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('flow-visible');
          // Optional: Stop observing once it's revealed so it doesn't animate out and in repeatedly
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const flowElements = document.querySelectorAll('.flow-element');
    flowElements.forEach(el => observer.observe(el));

    return () => {
      flowElements.forEach(el => observer.unobserve(el));
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#a5d8ff] to-[#e0c3fc] font-mono overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Cloud size={48} className="text-white relative animate-bounce" />
          <span className="text-slate-600 font-bold tracking-[0.3em] uppercase animate-pulse text-sm">plz wait</span>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Accessing Level 94</div>
        </div>
        {/* Grain Filter in Loader */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#a5d8ff] to-[#e0c3fc] font-sans text-slate-900 selection:bg-cyan-100">

      {/* Fixed Background Elements (Persist across all sections) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full blur-[60px] animate-drift"
            style={{
              width: `${300}px`,
              height: `${150}px`,
              top: `${i * 12}%`,
              left: `-20%`,
              animationDuration: `${40 + i * 8}s`,
              animationDelay: `-${i * 5}s`
            }}
          />
        ))}
      </div>

      {/* Visual Noise Filter for Dreamcore Effect (Persists across all sections) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* SECTION 1: THE FANCY TERMINAL (GLASSMORPHISM & LEVEL 94) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">

        {/* The Floating Glass Window */}
        <div
          className={`relative w-full max-w-4xl h-[85vh] flex flex-col rounded-3xl border border-white/40 bg-white/10 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ animation: 'float 8s ease-in-out infinite' }}
        >
          {/* Window Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/5 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 hidden sm:block">Level 94 // Motion Protocol</span>
            </div>
            <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{time}</div>
          </header>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide font-mono"
          >
            {/* Initial Logs */}
            <div className="space-y-1 text-xs text-slate-500/70">
              {bootSequence.map((text, i) => <div key={i}>[{i.toString().padStart(2, '0')}] {text}</div>)}
            </div>

            {/* Content wrapped in a boot completion transition */}
            <div className={`transition-all duration-1000 transform ${isBootComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>

              {/* Intro Content */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-800 leading-tight">The Starcius Project</h1>
                <p className="max-w-xl text-slate-600 italic leading-relaxed">Exploring the liminal spaces where code becomes a dream.</p>
              </div>

              {/* Interactive History */}
              <div className="space-y-3 text-sm mt-8">
                {history.map((item, i) => (
                  <div key={i} className={`animate-in fade-in slide-in-from-left-2 duration-300 ${item.type === 'user' ? 'opacity-70' : 'text-cyan-700 font-bold'}`}>
                    {item.type === 'user' ? '>' : '::'} {item.text}
                  </div>
                ))}

                {/* Input Area */}
                <div className="flex items-center gap-2 pt-2 group">
                  <span className="text-cyan-600 font-bold animate-pulse">{'>'}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    placeholder="hi, so um, you found my website... :')"
                    className="bg-transparent border-none outline-none text-slate-800 flex-1 placeholder-slate-400/60"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce cursor-default">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* SECTION 2: THE TRANSITION (Glassmorphic) */}
      <section className="h-[60vh] flex items-center justify-center bg-white/5 backdrop-blur-sm border-y border-white/20 relative z-10">
        <div className="max-w-lg text-center px-6">
          <p className="text-[#3F484A] font-mono text-[14px] leading-[20px] italic flow-element">
            "im like getting tired of this amination so...
          </p>
          <div className="mt-8 w-px h-24 bg-gradient-to-b from-white/10 to-[#006874]/60 mx-auto flow-element" style={{ transitionDelay: '200ms' }} />
        </div>
      </section>

      {/* SECTION 3: MATERIAL DESIGN 3 + GLASSMORPHISM PORTFOLIO */}
      <section className="relative z-10 py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-24">

        {/* M3 About Section */}
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 sticky top-12 flow-element">
            <h2 className="text-[#006874] text-[14px] leading-[20px] font-medium mb-4 mix-blend-color-burn">Information Node</h2>
            <h3 className="text-[45px] leading-[52px] text-[#191C1D] font-normal tracking-tight">I build things that bridge the gap.</h3>
          </div>
          <div className="md:col-span-7 space-y-6 text-[16px] leading-[24px] text-[#3F484A] flow-element" style={{ transitionDelay: '150ms' }}>
            <p>
              Hi, I'm the developer behind <span className="text-[#191C1D] font-medium">The Starcius Project</span>.
              While I enjoy building immersive, atmospheric digital experiences, my technical core is rooted in high-performance
              web engineering.
            </p>
            <p>
              I specialize in <span className="text-[#191C1D] font-medium">React, TypeScript, and complex UI architectures</span>.
              My research focus is currently adversarial prompting—exploring the creative breaking points of LLMs to discover how human intuition can better guide machine logic.
            </p>
          </div>
        </div>

        {/* M3 Elevated Glass Cards List */}
        <div className="space-y-6">
          <h2 className="text-[#006874] text-[14px] leading-[20px] font-medium ml-2 mix-blend-color-burn flow-element">Active Directory</h2>
          <div className="flex flex-col gap-6">
            {[
              { title: "Dream-CLI", tech: "Node.js, OpenAI SDK, React", desc: "A custom prompt-engineering interface designed for high-precision LLM interaction and behavior testing.", link: "#" },
              { title: "Liminal-OS v2", tech: "React, Tailwind, CSS Variables", desc: "A lightweight, browser-based operating system framework designed for focused development environments.", link: "#" },
              { title: "Starcius Particle Engine", tech: "Vanilla JS, Canvas API", desc: "High-performance fluid simulation for web backgrounds with focus on organic motion and low CPU overhead.", link: "#" }
            ].map((p, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-lg border border-white/40 rounded-[16px] p-6 md:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/30 transition-all flex flex-col md:flex-row justify-between gap-6 flow-element" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="max-w-2xl">
                  <h4 className="text-[22px] leading-[28px] text-[#191C1D] font-normal mb-3">{p.title}</h4>
                  <p className="text-[16px] leading-[24px] text-[#3F484A] mb-6">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {/* M3 Glass Assist Chips */}
                    {p.tech.split(', ').map(t => (
                      <span key={t} className="border border-white/50 bg-white/10 rounded-lg px-3 py-1.5 text-[14px] leading-[20px] text-[#3F484A] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start">
                  {/* M3 Icon Button */}
                  <a href={p.link} className="w-12 h-12 rounded-full hover:bg-white/40 border border-transparent hover:border-white/30 text-[#3F484A] transition-all flex items-center justify-center">
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* M3 Glass Surface Container Highest */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] rounded-[28px] p-8 md:p-12 relative overflow-hidden flow-element">
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 rounded-[28px] border border-white/50 pointer-events-none" style={{ mixBlendMode: 'overlay' }}></div>

          <h2 className="text-[#006874] text-[14px] leading-[20px] font-medium mb-8 ml-2 mix-blend-color-burn">System Proficiencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 border border-white/40 rounded-[16px] p-6 shadow-sm hover:bg-white/30 transition-colors flow-element" style={{ transitionDelay: '100ms' }}>
              <h5 className="text-[22px] leading-[28px] text-[#191C1D] font-normal mb-6 flex items-center gap-3">
                <Code size={24} className="text-[#006874]" /> Frontend
              </h5>
              <ul className="text-[#3F484A] text-[16px] leading-[24px] space-y-3">
                <li>React & Next.js</li>
                <li>TypeScript Architecture</li>
                <li>Tailwind CSS</li>
                <li>Canvas & WebGL</li>
              </ul>
            </div>
            <div className="bg-white/20 border border-white/40 rounded-[16px] p-6 shadow-sm hover:bg-white/30 transition-colors flow-element" style={{ transitionDelay: '200ms' }}>
              <h5 className="text-[22px] leading-[28px] text-[#191C1D] font-normal mb-6 flex items-center gap-3">
                <Zap size={24} className="text-[#006874]" /> Intelligence
              </h5>
              <ul className="text-[#3F484A] text-[16px] leading-[24px] space-y-3">
                <li>Prompt Engineering</li>
                <li>Adversarial Logic</li>
                <li>Python Automation</li>
                <li>Vector Search</li>
              </ul>
            </div>
            <div className="bg-white/20 border border-white/40 rounded-[16px] p-6 shadow-sm hover:bg-white/30 transition-colors flow-element" style={{ transitionDelay: '300ms' }}>
              <h5 className="text-[22px] leading-[28px] text-[#191C1D] font-normal mb-6 flex items-center gap-3">
                <Smartphone size={24} className="text-[#006874]" /> Interaction
              </h5>
              <ul className="text-[#3F484A] text-[16px] leading-[24px] space-y-3">
                <li>UI/UX Strategy</li>
                <li>Liminal Design</li>
                <li>Performance Tuning</li>
                <li>Cloud Workflows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* M3 Final Contact Footer */}
        <footer className="text-center pt-24 pb-12 border-t border-white/30 flow-element">
          <h2 className="text-[32px] leading-[40px] text-[#191C1D] font-normal mb-6">Let's build something.</h2>
          <p className="text-[16px] leading-[24px] text-[#3F484A] mb-10 max-w-sm mx-auto">Available for collaborations that require both logic and imagination.</p>

          <div className="flex justify-center mb-16">
            {/* M3 Primary Glass Filled Button */}
            <a href="mailto:hello@starcius.org" className="bg-[#006874]/80 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-[14px] leading-[20px] font-medium hover:bg-[#006874] hover:shadow-[0_8px_32px_0_rgba(0,104,116,0.3)] transition-all">
              Email hello@starcius.org
            </a>
          </div>

          <div className="flex justify-center gap-4 text-[#3F484A] mb-16">
            {/* M3 Glass Icon Buttons */}
            <a href="#" className="w-12 h-12 rounded-full border border-transparent hover:border-white/30 hover:bg-white/40 transition-all flex items-center justify-center">
              <Github size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-transparent hover:border-white/30 hover:bg-white/40 transition-all flex items-center justify-center">
              <Linkedin size={24} />
            </a>
          </div>

          <p className="text-[12px] leading-[16px] text-[#6F797B] font-medium">The Starcius Project ©2026 by me</p>
        </footer>
      </section>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
