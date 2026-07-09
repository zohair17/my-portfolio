// Featured (revamp) projects. The home "Featured Projects" section shows the
// first HOME_COUNT of these in its sticky-stacking scroll; the full list is
// shown on the /work page via the "View All Projects" button. Add more entries
// here and they automatically appear on /work (and roll onto the home stack up
// to HOME_COUNT). `slug` must match a key in projects/data.js.
export const FEATURED_PROJECTS = [
  {
    title: "Dari Mooch",
    slug: "darimooch",
    desc: "A men's grooming and beard-care brand, revamped with a bold, masculine storefront and cinematic product storytelling.",
    stack: ["Next.js", "GSAP", "Shopify", "Tailwind"],
    tint: "from-amber-600/25 to-orange-700/15",
    screen: "url('/asset/Darimooch/hero%20section.png')",
  },
  {
    title: "TCS",
    slug: "tcs",
    desc: "Pakistan's largest courier network, reimagined with a cleaner, tracking-first experience and a modern, trustworthy interface.",
    stack: ["Next.js", "React", "GSAP", "Tailwind"],
    tint: "from-sky-500/25 to-emerald-500/15",
    screen: "url('/asset/TCS/hero.png')",
  },
  {
    title: "Elyscents",
    slug: "elyscents",
    desc: "A premium fragrance house redesigned around atmosphere, scent storytelling and an elegant shopping experience.",
    stack: ["Next.js", "Framer Motion", "Shopify", "Tailwind"],
    tint: "from-fuchsia-600/25 to-rose-500/15",
    screen: "url('/asset/Elyscents/hero%20section.png')",
  },
  {
    title: "Shilajit Energy Drink",
    slug: "shilajit",
    desc: "An energy drink crafted with Shilajit and Zamzam water, presented through a bold, high-energy brand experience.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    tint: "from-emerald-600/25 to-lime-500/15",
    screen: "url('/asset/Shilajeet/Hero%20section.png')",
  },
];

// How many featured projects roll onto the home sticky stack before the rest
// are pushed to the "View All Projects" (/work) page.
export const HOME_COUNT = 4;
