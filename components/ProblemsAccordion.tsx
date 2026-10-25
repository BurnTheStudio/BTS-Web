'use client';

import React, { useState } from 'react';
import { PROBLEMS, Problem } from '@/content/problems';

export function ProblemsAccordion() {
  const [openId, setOpenId] = useState<string>(PROBLEMS[0].id);

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? '' : id));
  }

  return (
    <section id="problems" className="bg-paper text-ink scroll-mt-20">
      <div className="relative">
        {/* Hairline grid */}
        <div className="absolute inset-0 max-w-content mx-auto grid-hairlines-light pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-content mx-auto px-6 md:px-10 py-24 md:py-36">
          {/* Section header — centered, editorial */}
          <div className="text-center mb-20 md:mb-28">
            <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-4">
              09 REAL PROBLEMS
            </span>
            <h2 className="font-display font-semibold text-ink leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
              Nine problems.<br className="hidden sm:block" /> Nine root causes.
            </h2>
          </div>

          {/* Accordion index */}
          <div className="border-t-2 border-ink">
            {PROBLEMS.map((problem: Problem) => {
              const isOpen = openId === problem.id;
              return (
                <div key={problem.id} className="border-b-2 border-ink">
                  {/* Strip header */}
                  <button
                    type="button"
                    onClick={() => toggle(problem.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${problem.id}`}
                    id={`btn-${problem.id}`}
                    className={`w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 cursor-pointer transition-colors duration-150 ${
                      isOpen ? 'bg-gold' : 'bg-paper hover:bg-gold/20'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8 flex-wrap">
                      <span className="font-mono text-lg md:text-xl font-medium tracking-mono text-ink shrink-0">
                        {problem.number}
                      </span>
                      <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-mono text-stone font-medium shrink-0">
                        {problem.category}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-ink font-medium leading-tight">
                        {problem.title}
                      </h3>
                    </div>
                    <span className="font-mono text-lg text-ink shrink-0" aria-hidden="true">
                      {isOpen ? '\u2014' : '+'}
                    </span>
                  </button>

                  {/* Panel */}
                  <div
                    id={`panel-${problem.id}`}
                    role="region"
                    aria-labelledby={`btn-${problem.id}`}
                    data-state={isOpen ? 'open' : 'closed'}
                    className="accordion-panel"
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 py-8 md:py-10 border-t-2 border-ink bg-paper">
                        <p className="font-display italic text-lg md:text-xl text-ink/80 mb-8 pb-6 border-b border-ink/15">
                          {problem.subline}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-mono text-stone block mb-2">SYMPTOM</span>
                            <p className="font-body text-[15px] leading-relaxed text-ink">{problem.symptom}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-mono text-stone block mb-2">WHAT\u2019S REALLY GOING ON</span>
                            <p className="font-body text-[15px] leading-relaxed text-ink">{problem.reallyGoingOn}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-mono text-stone block mb-2">HOW WE SOLVE IT</span>
                            <p className="font-body text-[15px] leading-relaxed text-ink">{problem.howWeSolve}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-mono text-stone block mb-2">WHAT YOU GET</span>
                            <p className="font-body text-[15px] leading-relaxed text-ink">{problem.whatYouGet}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
