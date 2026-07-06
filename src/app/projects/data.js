// Content for the per-project gallery (/projects/[slug]) and case-study
// (/projects/[slug]/case-study) pages. Screenshots live under
// public/asset/<Folder>/. Captions/case-study copy are easy to edit.

export const PROJECTS = {
  darimooch: {
    name: "Dari Mooch",
    tagline: "Men's Grooming · Website Revamp",
    summary:
      "A revamp of Dari Mooch — a men's grooming and beard-care brand — rebuilt around a bold, masculine identity and cinematic product storytelling.",
    hero: "/asset/Darimooch/hero%20section.png",
    original: "https://www.darimooch.com/",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept revamp",
      overview:
        "Dari Mooch is a Pakistani men's grooming brand focused on beard and moustache care. The goal of this revamp was to give the brand a storefront as confident and premium as its products — replacing a busy, template-driven layout with a bold, masculine, motion-led experience.",
      sections: [
        { title: "The Challenge", body: "The original store leaned on a generic e-commerce template: crowded sections, inconsistent spacing and weak product hierarchy that made the brand feel smaller than it is. Men's grooming is a crowded, style-driven category, so the store needed a distinct personality and a clearer path to purchase." },
        { title: "The Approach", body: "I rebuilt the hero around a single strong statement and hero product, introduced a dark, masculine palette with warm accents, and added subtle GSAP motion to guide attention. Products are presented editorially with generous whitespace, consistent cards and clear calls-to-action, so the range feels curated rather than cluttered." },
        { title: "The Outcome", body: "The result is a storefront that reads as a premium grooming brand at first glance. The clearer hierarchy and stronger product focus make the range easier to browse and the path to checkout more obvious, while the motion and typography give Dari Mooch a memorable, ownable identity." },
      ],
    },
    shots: [
      { src: "/asset/Darimooch/hero%20section.png", title: "Reimagined Hero", body: "The Dari Mooch hero was reimagined around a bolder brand statement and cleaner composition. Confident typography, purposeful spacing and refined imagery replace the busier original, putting the brand front and centre. The result feels distinctly more premium and masculine while staying true to the existing identity." },
      { src: "/asset/Darimooch/2.png", title: "Curated For Your Ritual — Horizontal Scroll", body: "A row of coloured product cards — Trimmer, Beard Growth, Charcoal and more — slides sideways as you scroll down the page. The section is pinned and vertical scroll is converted into horizontal movement with GSAP: the track is driven by x: -(trackWidth − viewportWidth) with scrub: true, so your scroll position moves the cards 1:1 for a tactile, gallery-like browse through the range." },
      { src: "/asset/Darimooch/3.png", title: "Split Screen — DARI | MOOCH", body: "Two black halves reading DARI and MOOCH split apart like curtains to reveal what sits behind them. The section is pinned and both panels are scrubbed — the left half animates to xPercent: -100 and the right to xPercent: +100 — so they slide off-screen in opposite directions as you scroll, a bold brand moment built straight from the logo." },
      { src: "/asset/Darimooch/4.png", title: "Split Reveal — A New Chapter", body: "Centred between the split panels sits the line “A new chapter — step into what's next, a launch built on legacy.” It shares the same pinned split-section: as the DARI/MOOCH curtains slide open, this heading is revealed and animates from yPercent: 40 → 0 with a scrubbed fade-in. Curtain closed is this moment; curtain open reveals the split screen behind it." },
      { src: "/asset/Darimooch/5.png", title: "New Launch Showcase", body: "Two large product rows — Hair Color Cream and Surge Perfume — pair a product image on one side with name, price, star rating and a buy button on the other. Each row triggers when it reaches 80% of the viewport: a timeline slides the media in from the left (x: -90 → 0) and staggers the info in from the right (x: 60 → 0), playing on enter and reversing on leave for a lively, reactive feel." },
      { src: "/asset/Darimooch/6.png", title: "Best Price Ring", body: "Four bundle cards are arranged on an invisible circle around a central “BEST PRICE” label, and scrolling spins the ring. The section is pinned; each card's angle is basePosition + scrollProgress × 360°, positioned with x = sin(deg)·r and y = -cos(deg)·r and rotated to match. Whichever card reaches the top is “selected” — cos(deg) peaks at the top, scaling that card up and raising its z-index." },
      { src: "/asset/Darimooch/7.png", title: "Categories — Face", body: "The Face products (Lip Balm, Sunscreen and more) begin as a messy, stacked deck and spread into a clean, centred row as you scroll. The block is pinned; cards start offset and rotated (x: 90 + i·22, rotation) and a scrubbed timeline animates each to its computed row position with rotation: 0, so they fan out into order while the “FACE” title slides in from the right." },
      { src: "/asset/Darimooch/8.png", title: "Categories — Hair", body: "The Hair cards (Anti-Hairfall Shampoo, Hair Color Cream and more) are staggered at different heights for a playful arrangement. This is a simpler reveal: cards animate up from below the viewport (y: innerHeight → 0) with a back.out(1.6) bounce and a 0.2s stagger, triggered as the block hits 75% of the viewport." },
      { src: "/asset/Darimooch/9.png", title: "Categories — Beard", body: "The Beard cards sit in front of a big “BEARED” title. It mirrors the Hair section, but the cards drop in from above (y: -innerHeight → 0) with the same bounce and stagger. All three category titles — like the footer heading — use a letter-by-letter reveal, each split into character spans that rise and rotate in on scroll." },
      { src: "/asset/Darimooch/footer.png", title: "Footer — Join the Brotherhood", body: "A dark closing panel built around a big serif “Join the Dari Mooch Brotherhood” heading, supporting subtext and the copyright line. The heading uses the same split-letter reveal — characters rising and rotating in — while the paragraph fades up (y: 30 → 0) as the footer enters at 85% of the viewport, leaving a confident, polished final impression." },
    ],
  },

  tcs: {
    name: "TCS",
    tagline: "Logistics · Website Revamp",
    summary:
      "A full visual revamp of TCS — Pakistan's largest courier network — reimagined with a cleaner, tracking-first experience and a modern, trustworthy interface.",
    video: "/asset/TCS/lv_0_20260703185935.mp4",
    hero: "/asset/TCS/hero.png",
    original: "https://www.tcsexpress.com/",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept revamp",
      overview:
        "TCS is Pakistan's largest courier and logistics network. This revamp reimagines the marketing and tracking experience with a cleaner, tracking-first interface that feels modern and trustworthy while staying instantly recognisable as TCS.",
      sections: [
        { title: "The Challenge", body: "The original site packs an enormous amount of services, links and information into dense pages, which makes the primary action — tracking a shipment — harder than it should be. The challenge was to modernise the look and simplify the hierarchy without losing the breadth of services users rely on." },
        { title: "The Approach", body: "I led with a bold, motion-driven hero and pulled tracking and core services to the front with strong contrast and clean components. Content was reorganised into focused, scannable blocks with a consistent design system, calmer colours and generous spacing, so the experience feels premium yet familiar." },
        { title: "The Outcome", body: "The redesign delivers a far more confident first impression and a clearer, faster route to the actions customers care about most. The unified components and improved hierarchy make the site feel trustworthy and effortless to navigate from top to bottom." },
      ],
    },
    shots: [
      { src: "/asset/TCS/hero.png", title: "Hero — Suspended Container Landing", body: "A red shipping container hangs by cables in the centre of the screen, framed by the giant word “Pakistan” top-left and “Deliverer” bottom-right. Its face carries the TCS logo and an “Enter your Tracking Number” search bar with a Track Shipment button, while animated stat counters tick up on the right — 40+ Years, 500+ Towns & Cities, 50,000+ Customer Interactions. The fixed navbar sits above it. The container is “lowered in” as the anchor for everything that follows." },
      { src: "/asset/TCS/1.png", title: "TCS Express Centre — Red Curtain Drop", body: "As you scroll, a solid red panel drops down from the top like a full-bleed overlay, wiping over the still-pinned container so only its lower edge peeks out beneath. The panel reveals the “TCS Express Centre” heading and history copy — started 1983, 1,000+ retail centres, COCO / Franchised / Shop-in-Shop / Agents / IBRS — alongside a Become a Business Partner button." },
      { src: "/asset/TCS/2.png", title: "Product & Services — Sliding Panels", body: "The container is centred and pinned while two red panels fly in from off-screen: Express enters from the left (xPercent: -110 → 0) to sit above the container's left edge at z-30, and Logistic enters from the right (xPercent: 110 → 0) to tuck behind its right edge at z-10. Their service icons fade and rise in with a stagger, then the central “Product & Services” card pops with a back.out scale bounce at z-40 — fully reversible on scroll-up." },
      { src: "/asset/TCS/3.png", title: "E-com Solutions — Layered Cards", body: "The background switches to a photo of a TCS worker taping a box in a warehouse. A frosted-glass card on the right holds “E-com Solutions” with an Explore APIs button, while on the left a stack of cards — a white one behind and a red “TCS Developer Portal” card in front — animate and overlap in a layered card-shuffle that promotes the developer API story." },
      { src: "/asset/TCS/4.png", title: "CSR Activities — Modal Gallery", body: "This section is presented like an opened dialog, complete with a ✕ close button at the top. The heading “TCS's CSR Activities In Pakistan” sits above two cards — TCF and Khadija School — each showing a fanned-out stack of tilted, polaroid-style photos over its description. The photo stacks read as an entrance-fan / spread-on-hover gallery." },
      { src: "/asset/TCS/5.png", title: "Customer Support — Radial Layout", body: "A centred radial layout places the “Customer Support” title and paragraph in the middle, with four photo cards floating into the corners — Call Centres (top-left), WhatsApp (top-right), Social Media (bottom-left) and 24/7 Support (bottom-right). Each card carries a soft red glow and animates inward to settle symmetrically around the central text." },
      { src: "/asset/TCS/6.png", title: "Footer", body: "A clean, light footer in four columns — Company Information, Product & Services, the Karachi Head Office address, and a Signup for Updates block with an email field and Follow Us social icons. A bottom bar carries the copyright, Terms / Privacy / FAQs links and a red scroll-to-top button, rounding out the experience." },
    ],
  },

  elyscents: {
    name: "Elyscents",
    tagline: "Fragrance · Website Revamp",
    summary:
      "A revamp of Elyscents — a premium fragrance house — redesigned around atmosphere, scent storytelling and an elegant shopping experience.",
    hero: "/asset/Elyscents/hero%20section.png",
    original: "https://elyscents.pk/",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept revamp",
      overview:
        "Elyscents is a Pakistani fragrance house. The revamp centres the experience on atmosphere and scent storytelling, trading a conventional storefront for something closer to a luxury fashion campaign.",
      sections: [
        { title: "The Challenge", body: "Fragrance is an emotional, sensory purchase that's hard to convey online. The original store presented perfumes like ordinary products, without the mood or narrative that makes people fall in love with a scent." },
        { title: "The Approach", body: "I designed an elegant, minimal layout that lets each fragrance breathe — large, atmospheric imagery, refined typography and soft, considered spacing. Scent families and stories are given room, and subtle motion adds a sense of luxury as you scroll." },
        { title: "The Outcome", body: "The redesign feels premium and evocative, positioning Elyscents alongside high-end fragrance brands. The calmer, story-led presentation helps customers connect with each scent and elevates the perceived value of the whole range." },
      ],
    },
    shots: [
      { src: "/asset/Elyscents/hero%20section.png", title: "Header + Hero", body: "Top bar with the Elyscents logo, full navigation (Home, All Perfumes, Agaaz Series, Crazy Deals, About Us, Contact Us) and search, account and bag icons — the cart showing a live count. Logo and links animate in with Framer Motion. The hero is a pinned stack of banner cards (“3 Scents. 1 Deal” and more); as you scroll, GSAP fans the stacked cards out and flings each one up and away to reveal the next, with pagination dots below." },
      { src: "/asset/Elyscents/1.png", title: "Premium Bundles", body: "A fanned deck of bundle cards on the left with product details on the right — title, was/now pricing in red, “Save Rs…”, a Select Perfumes button and progress dots. The section is pinned: scrolling flips through four bundles (Mega Deal → Flash Deal → Triple → Royal Duo), snapping the active card to the front while the detail panel cross-fades. A Shop All Bundles button sits at the bottom." },
      { src: "/asset/Elyscents/2.png", title: "New Arrivals — Intro", body: "The “New Arrival” title screen. The section opens as two white panels covering the screen with the heading centred between them — a clean, theatrical entrance that sets up the reveal that follows." },
      { src: "/asset/Elyscents/3.png", title: "New Arrivals — Coverflow", body: "As you scroll, the two white panels split apart — top sliding up, bottom sliding down — to reveal a 3D coverflow carousel of product cards. The centred card scales up and tilts to face you, and only it shows price and Add to Cart. The track auto-slides horizontally with scroll, with an Explore New Arrivals button below." },
      { src: "/asset/Elyscents/4.png", title: "Best Sellers", body: "A row of four coloured gradient cards (“Most Loved / Best Seller Perfumes”), each with a bottle bleeding out the top of the card, plus tag, name, price, Save and Add to cart. Pinned: the heading drifts up from centre, then the cards rise in from below with a stagger, then prices and CTAs fade in. A Shop Best Seller Now button anchors the bottom." },
      { src: "/asset/Elyscents/5.png", title: "For Her — Intro", body: "A full pink panel introducing “For Her / Best Perfumes for Women in Pakistan” with a supporting subtitle. It uses the same tear-apart mechanic as New Arrivals, but here the covering panels are pink to match the section’s mood." },
      { src: "/asset/Elyscents/6.png", title: "For Her — Products", body: "The panels tear open to reveal four women’s bottles, each floating over rose-petal graphics with its name and inspiration, price, Save and Add to cart. A Shop Women’s Perfume button closes the section." },
      { src: "/asset/Elyscents/7.png", title: "For Him — Products", body: "The same pattern as the women’s section, reframed as “For Him”. The distinctive touch: each bottle sits on a rounded-triangle, cone-shaped coloured card drawn with an SVG path for a spotlight look. A Shop Men’s Perfume button sits below." },
      { src: "/asset/Elyscents/8.png", title: "Shop The Best Perfumes", body: "Four large square lifestyle images — two hugging the left edge, two the right — with the headline “Shop The Best Perfumes In Pakistan” in the clear centre gap. Pinned: the cards fan out from a tilted pile on the left into this 2-left/2-right layout while the heading slides in from the right and swaps to a one-word-per-line arrangement." },
      { src: "/asset/Elyscents/9.png", title: "How To Pick", body: "A normal (non-pinned) scroll section with an animated heading, “How to Pick the Right Perfume Online”, and two CTA cards — a light “Not sure where to start? → Try our Tester Box” and a dark “Best perfume at a price you’ll love → Shop our full collection”. Images carry a subtle parallax and scale on scroll, with a word-by-word heading reveal." },
      { src: "/asset/Elyscents/footer.png", title: "Footer", body: "A dark footer with the logo and four columns — Support, Quick Links, and Get in touch via WhatsApp and email — plus a copyright-notice paragraph, social icons (Instagram, Facebook, TikTok as inline SVGs) and the “© 2026 Elyscents Pakistan” line." },
    ],
  },

  shilajit: {
    name: "Shilajit Energy Drink",
    tagline: "Beverage · Website Revamp",
    summary:
      "A revamp of Shilajit Energy Drink — a functional drink made with Shilajit and Zamzam water — presented through a bold, high-energy brand experience.",
    hero: "/asset/Shilajeet/Hero%20section.png",
    original: "https://shilajitenergydrinks.com/",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept revamp",
      overview:
        "Shilajit Energy Drink is a functional beverage made with Shilajit and Zamzam water. The brand experience needed to feel bold, energetic and premium — communicating both the energy promise and the purity of its ingredients.",
      sections: [
        { title: "The Challenge", body: "As a newer entrant in a competitive energy-drink market, the brand needed a website that instantly signalled energy and quality, while clearly explaining an unusual, differentiated ingredient story — Shilajit combined with Zamzam water." },
        { title: "The Approach", body: "I built a high-energy, dark, high-contrast experience with bold typography, dynamic motion and 3D/GSAP accents to convey power. The ingredient story is given a clear, confident section so the differentiators land immediately, balanced with clean layout so it never feels chaotic." },
        { title: "The Outcome", body: "The result is a striking, high-energy brand site that stands out in a crowded category. It communicates the product's energy and premium ingredient story at a glance, giving the brand a distinctive, memorable presence." },
      ],
    },
    shots: [
      { src: "/asset/Shilajeet/Hero%20section.png", title: "Hero — Flavour Carousel", body: "A product carousel puts a single can centre stage, with a big glowing outlined flavour name (e.g. “ORANGE PEACH”) behind it and faded cans peeking in from the left and right to hint at the rest of the range. Left ‹ and right › arrows cycle through five flavours while the dots below track the active slide — as you navigate, the background text, the can and the accent colour all shift to match the selected flavour. A pill-shaped sticky navbar (Home, Feature, Benefits, Products, About Shilajeet, Ingredients, Contact) floats over it with the logo on the left." },
      { src: "/asset/Shilajeet/1.png", title: "Intro — Unleash The Ancient Power", body: "The main headline block leads with a bold “UNLEASH THE ANCIENT POWER.” statement on the left, a short marketing paragraph and two calls-to-action — a filled white Shop Now and a dark outlined Learn More. A tilted 3D can floats on the right against an orange-to-black gradient, carrying a subtle float and tilt on scroll and hover. The buttons route straight to the shop, making the entry point to the range immediate and confident." },
      { src: "/asset/Shilajeet/2.png", title: "Benefits — Primal Power", body: "A “PRIMAL POWER” benefits section pairs a floating can on the left with a vertical list on the right — Boost Vitality, Raises Energy, Enhances Strength, Primal Endurance, Pumps & Hydration. As the section enters the viewport, items fade and slide in one by one, with an active/inactive highlight that dims the last item, giving the list rhythm and drawing the eye through each benefit in turn." },
      { src: "/asset/Shilajeet/3.png", title: "Products — Shop Grid", body: "The shop grid sits under a bold “PRODUCTS” heading, laying out five items — Kiwi Lemon, Orange Peach Zamzam, Pineapple Guava, Strawberry and the Pre-Workout Supplement — in a clean, responsive grid. Each tile pulls its can image, name and price (Rs. 10,200.00) into a consistent card with a Shop Now button that adds to cart or routes to checkout, so the full range is easy to scan and buy." },
      { src: "/asset/Shilajeet/4.png", title: "About — Ingredients Story", body: "A three-panel “About Product” band frames the brand story: a left panel for “POTENT SHILAJIT” (strawberry and shilajit resin), a dark centre panel carrying the descriptive copy about Zam Zam water and saffron, and a right panel for “GOLDEN SAFFRON” (peach, saffron, orange). Cosmic imagery on either side surrounds the centred text, with panels that parallax and animate in on scroll for a considered, storytelling feel." },
      { src: "/asset/Shilajeet/5.png", title: "Ingredients — Hero Cards", body: "An “Ingredients” showcase highlights the hero ingredients across three image cards — Ancient Ingredients (Zam Zam Water / Saffron), Premium Shilajit and Zam Zam Water — each with a subtle hover lift and zoom. A closing tagline sits below: “The combination of these legendary ingredients creates a blend that transcends ordinary energy drinks,” tying the differentiated ingredient story together." },
      { src: "/asset/Shilajeet/Screenshot%202026-07-05%20200426.png", title: "Footer", body: "The footer organises everything into three tidy columns. Quick Links covers Home, Shop, Pre-Workout Supplements, Products, Members, Contact, Wholesale and Our Distributor; Connectivity shows the accepted payment methods (Apple Pay, Amex, Diners, Discover, GPay, JCB, Mastercard, PayPal, Stripe, Visa); and Support carries the phone number, Privacy Policy and Terms & Conditions — a clean, well-structured close to the experience." },
    ],
  },
};
