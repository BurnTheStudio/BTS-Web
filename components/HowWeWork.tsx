import React from 'react';

export function HowWeWork() {
  const principles = [
    { letter: 'A', text: 'Measure before touching anything.' },
    { letter: 'B', text: 'Ship in weekly slices.' },
    { letter: 'C', text: 'Weekly demos. Everything in your name from day one.' },
  ];

  return (
    <section id="how-we-work" className="bg-ink scroll-mt-20">
      <div className="relative min-h-[80svh] flex items-center">
        <div className="absolute inset-0 grid-hairlines-dark pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-content mx-auto px-6 md:px-10 py-24 md:py-36 w-full">
          {/* Centered editorial header */}
          <div className="text-center mb-20 md:mb-28">
            <span className="font-mono text-[11px] uppercase tracking-mono text-gold block mb-4">
              HOW WE WORK
            </span>
            <h2 className="font-display font-semibold text-paper leading-display tracking-tightest text-4xl md:text-6xl lg:text-7xl">
              Three principles.
            </h2>
          </div>

          {/* Principle blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p) => (
              <div
                key={p.letter}
                className="border-2 border-paper/20 p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[340px] hover:border-gold transition-colors duration-150"
              >
                <span className="font-mono text-3xl md:text-4xl font-medium text-gold tracking-mono">
                  {p.letter}
                </span>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-paper font-medium leading-snug mt-auto">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
