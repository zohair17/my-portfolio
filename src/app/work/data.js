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

    video: "/asset/Darimooch/Screen%20Recording%202026-08-11%20171049.mp4",
  },
  {
    title: "TCS",
    slug: "tcs",
    desc: "Pakistan's largest courier network, reimagined with a cleaner, tracking-first experience and a modern, trustworthy interface.",
    stack: ["Next.js", "React", "GSAP", "Tailwind"],
    tint: "from-sky-500/25 to-emerald-500/15",
    screen: "url('/asset/TCS/hero.png')",

    video: "/asset/TCS/lv_0_20260703185935.mp4",
  },
  {
    title: "Elyscents",
    slug: "elyscents",
    desc: "A premium fragrance house redesigned around atmosphere, scent storytelling and an elegant shopping experience.",
    stack: ["Next.js", "Framer Motion", "Shopify", "Tailwind"],
    tint: "from-fuchsia-600/25 to-rose-500/15",
    screen: "url('/asset/Elyscents/hero%20section.png')",

    video: "/asset/Elyscents/Screen%20Recording%202026-08-11%20170750.mp4",
  },
  {
    title: "Shilajit Energy Drink",
    slug: "shilajit",
    desc: "An energy drink crafted with Shilajit and Zamzam water, presented through a bold, high-energy brand experience.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    tint: "from-emerald-600/25 to-lime-500/15",
    screen: "url('/asset/Shilajeet/Hero%20section.png')",

    video: "/asset/Shilajeet/shilajeet.mp4",
  },
  {
    title: "Nike — Air Jordan",
    slug: "nike",
    desc: "An interactive Air Jordan showcase — a sneaker landing concept built around a floating hero product, motion-driven feature reveals and bold editorial type.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    tint: "from-red-600/25 to-rose-800/15",
    screen: "url('/asset/Nike/hero.png')",

    video: "/asset/Nike/video.mp4",
  },
  {
    title: "PIA",
    slug: "pia",
    desc: "A concept revamp of Pakistan International Airlines — a booking-first experience with flight search, cabin classes, a modern fleet and a global route map.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-emerald-700/25 to-yellow-600/15",
    screen: "url('/asset/PIA/Hero.png')",

    video: "/asset/PIA/Screen%20Recording%202026-08-11%20140016.mp4",
  },
  {
    title: "Samurae Punk",
    slug: "samurae-punk",
    desc: "A cinematic landing page for a fictional open-world action-RPG — neon-samurai art direction, feature reveals and a bold red-on-black identity.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-red-600/25 to-neutral-800/20",
    screen: "url('/asset/Samurae%20punk/hero.png')",

    video: "/asset/Samurae%20punk/Screen%20Recording%202026-08-11%20173941.mp4",
  },
  {
    title: "Highfy",
    slug: "highfy",
    desc: "A beauty & cosmetics e-commerce concept — category-rich navigation, animated product showcases and a bright, trustworthy shopping experience.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-fuchsia-600/25 to-purple-600/15",
    screen: "url('/asset/highfy/hero.png')",

    video: "/asset/highfy/video.mp4",
  },
  {
    title: "Boss Leaf",
    slug: "boss-leaf",
    desc: "A dark, premium site for a natural leaf-wraps brand — cinematic product staging, a flavour-led shop and a wholesale funnel. (18+)",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-red-700/20 to-zinc-800/20",
    screen: "url('/asset/boss-leaf/Screenshot%202026-08-11%20180230.png')",

    video: "/asset/boss-leaf/Screen%20Recording%202026-08-11%20180539.mp4",
  },
];

// How many featured projects roll onto the home sticky stack before the rest
// are pushed to the "View All Projects" (/work) page.
export const HOME_COUNT = 3;
