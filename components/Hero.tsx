"use client";

import { ArrowRight } from 'lucide-react';

export function Hero() {
  const scrollToWork = () => {
    const element = document.getElementById('work');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center snap-section bg-transparent px-6 md:px-12 lg:px-[220px] grid-overlay"
    >
      <div className="max-w-5xl w-full fade-in">
        <div className="mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
          <span className="text-[#00CE93] uppercase tracking-wider text-xs md:text-sm label-glow">
            Designer & Creative Technologist
          </span>
        </div>
        <h1 className="text-[#EDEDED] mb-6 text-4xl md:text-5xl lg:text-7xl">
          Vicente Venegas
        </h1>
        <p className="text-[#B3B3B3] mb-12 max-w-2xl text-base md:text-lg lg:text-l leading-relaxed">
          I design user experiences from research to interface.
          Blending interaction, code, and tangible design.
        </p>
        <button
          onClick={scrollToWork}
          className="group inline-flex items-center gap-3 px-6 py-3 border border-[#00CE93] text-[#00CE93] hover:bg-[#00CE93] hover:text-[#151515] transition-all duration-300"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          <span className="uppercase tracking-wider text-sm">View Work</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
