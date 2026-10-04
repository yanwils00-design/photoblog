"use client";

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

const photos = [
  {
    title:"A heavenly view of chicago skyline",
    src:"/image03.jpg",
    place:"Downtown Chicago, Illinois",
    time:"Summer time · 08/12/2026",
    alt:"Picture by Unknown Photographer",
    note:"A breathtaking view of the Chicago skyline at sunset, with the sun casting a warm glow over the city and reflecting off the water."
  },
  {
    title:"A profile view of chicago downtown from lake shore drive",
    src:"/image05.jpg",
    place:"Lake Shore Drive, Chicago, Illinois",
    time:"Autumn time · 10/22/2026",
    alt:"Picture by Unknown Photographer",
    note:"A stunning profile shot of the Chicago downtown skyline from Lake Shore Drive, capturing the city's architecture and the serene atmosphere of the lakefront."
  },
  {
    title:"A close-up view of chicago from Navy Pier's pov",
    src:"/image06.jpg",
    place:"Navy Pier, Chicago, Illinois",
    time:"Winter time · 01/15/2027",
    alt:"Picture by Unknown Photographer",
    note:"A detailed close-up of a historic Chicago building, showcasing the intricate architecture and the play of light and shadow on its surface."
  }
];

export default function Home() {
  const [active, setActive] = useState(0);
  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  const previous = (active + photos.length - 1) % photos.length;
  const next = (active + 1) % photos.length;
  const current = photos[active];
  
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#1d2923] text-[#f4f1e9]">
      <div className="absolute inset-0">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div className="hero-wash absolute inset-0" aria-hidden="true" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a href="#home" className="wordmark text-[23px] font-semibold tracking-[-0.06em]" aria-label="Still here home">
          still<span className="text-[#e28b63]">/</span>here
        </a>
        <nav className="hidden items-center gap-9 text-[11px] uppercase tracking-[0.16em] text-white/75 md:flex">
          <a className="nav-link" href="#journal">Journal</a>
          <a className="nav-link" href="#about">About</a>
          <a className="rounded-full border border-white/40 px-4 py-2.5 transition hover:border-white hover:bg-white/10" href="#field-notes">Field notes&nbsp; ↗</a>
        </nav>
        <a className="text-[10px] uppercase tracking-[0.15em] text-white/75 md:hidden" href="#journal">Explore&nbsp; ↓</a>
      </header>

      <section id="home" className="relative z-10 mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1600px] flex-col px-6 pb-5 md:min-h-[calc(100svh-112px)] md:px-12">
        <div className="mt-[8vh] max-w-3xl md:mt-[10vh]">
          <p className="eyebrow mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.19em] text-white/75"><span className="h-px w-7 bg-[#e28b63]" />A visual journal by Rowan Ellis</p>
          <h1 className="max-w-[850px] font-serif text-[clamp(3.6rem,9vw,8.6rem)] font-medium leading-[0.91] tracking-[-0.065em]">Looking for<br /><em className="font-normal text-[#dfe5d8]">the in-between.</em></h1>
          <p className="mt-6 max-w-[310px] text-[13px] leading-6 text-white/75 md:ml-2 md:mt-8">A slower kind of looking. Notes from open roads, changing skies, and the places that ask us to stay.</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pb-5 md:pb-7">
          <div className="max-w-[520px] pb-1 md:pb-3">
            <p className="mb-2 text-[9px] uppercase tracking-[0.19em] text-white/70">Featured story&nbsp; / &nbsp;{current.place}</p>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] md:text-[42px]">{current.title}</h2>
            <p className="mt-2 text-xs text-white/65">{current.note}</p>
          </div>
          <div className="hidden items-center gap-3 pb-3 text-[10px] tracking-[0.12em] text-white/75 md:flex">
            <span>{current.time}</span><span className="text-[#e28b63]">/</span><span>0{active + 1} — 0{photos.length}</span>
          </div>
        </div>

        <div id="journal" className="carousel-row relative flex items-center justify-center pb-4 pt-3 md:pb-7">
          <div className="carousel-track">
            <button onClick={() => move(-1)} className="cover-card cover-card-side cover-card-left group" aria-label={`Show ${photos[previous].title}`}>
              <Image src={photos[previous].src} alt="" fill sizes="25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="cover-index">0{previous + 1}</span>
            </button>
            <button onClick={() => move(-1)} className="carousel-arrow carousel-arrow-left" aria-label="Previous photo">←</button>
            <button onClick={() => move(1)} className="cover-card cover-card-main group" aria-label={`Current photo: ${current.title}; select next photo`}>
              <Image key={`cover-${current.src}`} src={current.src} alt={current.alt} fill sizes="40vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              <span className="cover-index">0{active + 1}</span>
            </button>
            <button onClick={() => move(1)} className="carousel-arrow carousel-arrow-right" aria-label="Next photo">→</button>
            <button onClick={() => move(1)} className="cover-card cover-card-side cover-card-right group" aria-label={`Show ${photos[next].title}`}>
              <Image src={photos[next].src} alt="" fill sizes="25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="cover-index">0{next + 1}</span>
            </button>
          </div>
          <div className="mobile-location absolute bottom-0 left-0 text-[9px] uppercase tracking-[0.14em] text-white/65 md:hidden">{current.place}&nbsp; · &nbsp;{current.time}</div>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-8 right-12 hidden text-[9px] uppercase tracking-[0.18em] text-white/55 [writing-mode:vertical-rl] md:block">Scroll to wander</div>
      <section id="about" className="sr-only" aria-label="About this photoblog">{current.note} {current.place}. Photographs and field notes by Rowan Ellis.</section>
      <section id="field-notes" className="sr-only" aria-label="Field notes">{current.time}</section>
    </main>
  );
}

