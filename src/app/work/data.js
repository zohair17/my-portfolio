// Featured (revamp) projects. The home "Featured Projects" section shows the
// first HOME_COUNT of these in its sticky-stacking scroll; the full list is
// shown on the /work page via the "View All Projects" button. Add more entries
// here and they automatically appear on /work (and roll onto the home stack up
// to HOME_COUNT). `slug` must match a key in projects/data.js.
export const FEATURED_PROJECTS = [
  {
    title: "Villa Aurelia",
    slug: "villa-aurelia",
    desc: "A real-estate site for a private Palm Jumeirah villa — a cinematic room-by-room walkthrough, an interactive floor plan and a private-viewing funnel.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-amber-500/25 to-yellow-800/15",
    screen: "url('/asset/Real%20Estate/hero.webp')",
    video: "/asset/Real%20Estate/video.mp4",
    videoMobile: "/asset/Real%20Estate/mobile.mp4",
    screenMobile: "/asset/Real%20Estate/poster-mobile.webp",
  },
  {
    title: "VYN Interior",
    slug: "vyn-interior",
    desc: "An interior-design studio site where every service is its own cinematic room — floors, shading, furniture, acoustics and installation, one scroll at a time.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-stone-500/25 to-amber-900/15",
    screen: "url('/asset/Interior%20Design/hero.webp')",
    video: "/asset/Interior%20Design/video.mp4",
    videoMobile: "/asset/Interior%20Design/mobile.mp4",
    screenMobile: "/asset/Interior%20Design/poster-mobile.webp",
  },
  {
    title: "Sam Automobiles",
    slug: "sam-automobiles",
    desc: "An immersive car-showroom experience — walk into the dealership, then explore the engine, interior and rear of a Mercedes-Benz through interactive hotspots.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-blue-600/25 to-sky-500/15",
    screen: "url('/asset/Showroom/hero.webp')",
    video: "/asset/Showroom/video.mp4",
    videoMobile: "/asset/Showroom/mobile.mp4",
    screenMobile: "/asset/Showroom/poster-mobile.webp",
  },
  {
    title: "Dari Mooch",
    slug: "darimooch",
    desc: "A men's grooming and beard-care brand, revamped with a bold, masculine storefront and cinematic product storytelling.",
    stack: ["Next.js", "GSAP", "Shopify", "Tailwind"],
    tint: "from-amber-600/25 to-orange-700/15",
    screen: "url('/asset/Darimooch/hero%20section.webp')",

    video: "/asset/Darimooch/Screen%20Recording%202026-08-11%20171049.mp4",


    videoMobile: "/asset/Darimooch/Darimooch%20Mobile.mp4",


    screenMobile: "/asset/Darimooch/poster-mobile.webp",
  },
  {
    title: "TCS",
    slug: "tcs",
    desc: "Pakistan's largest courier network, reimagined with a cleaner, tracking-first experience and a modern, trustworthy interface.",
    stack: ["Next.js", "React", "GSAP", "Tailwind"],
    tint: "from-sky-500/25 to-emerald-500/15",
    screen: "url('/asset/TCS/hero.webp')",

    video: "/asset/TCS/lv_0_20260703185935.mp4",


    videoMobile: "/asset/TCS/tcs%20mobile.mp4",


    screenMobile: "/asset/TCS/poster-mobile.webp",
  },
  {
    title: "Elyscents",
    slug: "elyscents",
    desc: "A premium fragrance house redesigned around atmosphere, scent storytelling and an elegant shopping experience.",
    stack: ["Next.js", "Framer Motion", "Shopify", "Tailwind"],
    tint: "from-fuchsia-600/25 to-rose-500/15",
    screen: "url('/asset/Elyscents/hero%20section.webp')",

    video: "/asset/Elyscents/Screen%20Recording%202026-08-11%20170750.mp4",


    videoMobile: "/asset/Elyscents/Elyscent%20Mobile.mp4",


    screenMobile: "/asset/Elyscents/poster-mobile.webp",
  },
  {
    title: "Shilajit Energy Drink",
    slug: "shilajit",
    desc: "An energy drink crafted with Shilajit and Zamzam water, presented through a bold, high-energy brand experience.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    tint: "from-emerald-600/25 to-lime-500/15",
    screen: "url('/asset/Shilajeet/Hero%20section.webp')",

    video: "/asset/Shilajeet/shilajeet.mp4",
    videoMobile: "/asset/Shilajeet/Shilajeet%20mobile.mp4",
    screenMobile: "/asset/Shilajeet/poster-mobile.webp",
  },
  {
    title: "Nike — Air Jordan",
    slug: "nike",
    desc: "An interactive Air Jordan showcase — a sneaker landing concept built around a floating hero product, motion-driven feature reveals and bold editorial type.",
    stack: ["Next.js", "GSAP", "Three.js", "Tailwind"],
    tint: "from-red-600/25 to-rose-800/15",
    screen: "url('/asset/Nike/hero.webp')",

    video: "/asset/Nike/video.mp4",


    videoMobile: "/asset/Nike/Nike%20Mobile%20View.mp4",


    screenMobile: "/asset/Nike/poster-mobile.webp",
  },
  {
    title: "PIA",
    slug: "pia",
    desc: "A concept revamp of Pakistan International Airlines — a booking-first experience with flight search, cabin classes, a modern fleet and a global route map.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-emerald-700/25 to-yellow-600/15",
    screen: "url('/asset/PIA/Hero.webp')",

    video: "/asset/PIA/Screen%20Recording%202026-08-11%20140016.mp4",
  },
  {
    title: "Samurae Punk",
    slug: "samurae-punk",
    desc: "A cinematic landing page for a fictional open-world action-RPG — neon-samurai art direction, feature reveals and a bold red-on-black identity.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-red-600/25 to-neutral-800/20",
    screen: "url('/asset/Samurae%20punk/hero.webp')",

    video: "/asset/Samurae%20punk/Screen%20Recording%202026-08-11%20173941.mp4",


    videoMobile: "/asset/Samurae%20punk/Samurae%20Mobile.mp4",


    screenMobile: "/asset/Samurae%20punk/poster-mobile.webp",
  },
  {
    title: "Highfy",
    slug: "highfy",
    desc: "A beauty & cosmetics e-commerce concept — category-rich navigation, animated product showcases and a bright, trustworthy shopping experience.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-fuchsia-600/25 to-purple-600/15",
    screen: "url('/asset/highfy/hero.webp')",

    video: "/asset/highfy/video.mp4",


    videoMobile: "/asset/highfy/Highdy%20Mobile.mp4",


    screenMobile: "/asset/highfy/poster-mobile.webp",
  },
  {
    title: "Boss Leaf",
    slug: "boss-leaf",
    desc: "A dark, premium site for a natural leaf-wraps brand — cinematic product staging, a flavour-led shop and a wholesale funnel. (18+)",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
    tint: "from-red-700/20 to-zinc-800/20",
    screen: "url('/asset/boss-leaf/Screenshot%202026-08-11%20180230.webp')",

    video: "/asset/boss-leaf/Screen%20Recording%202026-08-11%20180539.mp4",


    videoMobile: "/asset/boss-leaf/boss%20leaf%20mobile.mp4",


    screenMobile: "/asset/boss-leaf/poster-mobile.webp",
  },
];

// How many featured projects roll onto the home sticky stack before the rest
// are pushed to the "View All Projects" (/work) page.
export const HOME_COUNT = 3;
