// Content for the per-project gallery (/projects/[slug]) and case-study
// (/projects/[slug]/case-study) pages. Screenshots live under
// public/asset/<Folder>/. Captions/case-study copy are easy to edit.

export const PROJECTS = {
  darimooch: {
    name: "Dari Mooch",
    tagline: "Men's Grooming · Website Revamp",
    summary:
      "A revamp of Dari Mooch — a men's grooming and beard-care brand — rebuilt around a bold, masculine identity and cinematic product storytelling.",
    hero: "/asset/Darimooch/hero%20section.webp",
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
      { src: "/asset/Darimooch/hero%20section.webp", title: "Reimagined Hero", body: "The Dari Mooch hero was reimagined around a bolder brand statement and cleaner composition. Confident typography, purposeful spacing and refined imagery replace the busier original, putting the brand front and centre. The result feels distinctly more premium and masculine while staying true to the existing identity." },
      { src: "/asset/Darimooch/2.webp", title: "Curated For Your Ritual — Horizontal Scroll", body: "A row of coloured product cards — Trimmer, Beard Growth, Charcoal and more — slides sideways as you scroll down the page. The section is pinned and vertical scroll is converted into horizontal movement with GSAP: the track is driven by x: -(trackWidth − viewportWidth) with scrub: true, so your scroll position moves the cards 1:1 for a tactile, gallery-like browse through the range." },
      { src: "/asset/Darimooch/3.webp", title: "Split Screen — DARI | MOOCH", body: "Two black halves reading DARI and MOOCH split apart like curtains to reveal what sits behind them. The section is pinned and both panels are scrubbed — the left half animates to xPercent: -100 and the right to xPercent: +100 — so they slide off-screen in opposite directions as you scroll, a bold brand moment built straight from the logo." },
      { src: "/asset/Darimooch/4.webp", title: "Split Reveal — A New Chapter", body: "Centred between the split panels sits the line “A new chapter — step into what's next, a launch built on legacy.” It shares the same pinned split-section: as the DARI/MOOCH curtains slide open, this heading is revealed and animates from yPercent: 40 → 0 with a scrubbed fade-in. Curtain closed is this moment; curtain open reveals the split screen behind it." },
      { src: "/asset/Darimooch/5.webp", title: "New Launch Showcase", body: "Two large product rows — Hair Color Cream and Surge Perfume — pair a product image on one side with name, price, star rating and a buy button on the other. Each row triggers when it reaches 80% of the viewport: a timeline slides the media in from the left (x: -90 → 0) and staggers the info in from the right (x: 60 → 0), playing on enter and reversing on leave for a lively, reactive feel." },
      { src: "/asset/Darimooch/6.webp", title: "Best Price Ring", body: "Four bundle cards are arranged on an invisible circle around a central “BEST PRICE” label, and scrolling spins the ring. The section is pinned; each card's angle is basePosition + scrollProgress × 360°, positioned with x = sin(deg)·r and y = -cos(deg)·r and rotated to match. Whichever card reaches the top is “selected” — cos(deg) peaks at the top, scaling that card up and raising its z-index." },
      { src: "/asset/Darimooch/7.webp", title: "Categories — Face", body: "The Face products (Lip Balm, Sunscreen and more) begin as a messy, stacked deck and spread into a clean, centred row as you scroll. The block is pinned; cards start offset and rotated (x: 90 + i·22, rotation) and a scrubbed timeline animates each to its computed row position with rotation: 0, so they fan out into order while the “FACE” title slides in from the right." },
      { src: "/asset/Darimooch/8.webp", title: "Categories — Hair", body: "The Hair cards (Anti-Hairfall Shampoo, Hair Color Cream and more) are staggered at different heights for a playful arrangement. This is a simpler reveal: cards animate up from below the viewport (y: innerHeight → 0) with a back.out(1.6) bounce and a 0.2s stagger, triggered as the block hits 75% of the viewport." },
      { src: "/asset/Darimooch/9.webp", title: "Categories — Beard", body: "The Beard cards sit in front of a big “BEARED” title. It mirrors the Hair section, but the cards drop in from above (y: -innerHeight → 0) with the same bounce and stagger. All three category titles — like the footer heading — use a letter-by-letter reveal, each split into character spans that rise and rotate in on scroll." },
      { src: "/asset/Darimooch/footer.webp", title: "Footer — Join the Brotherhood", body: "A dark closing panel built around a big serif “Join the Dari Mooch Brotherhood” heading, supporting subtext and the copyright line. The heading uses the same split-letter reveal — characters rising and rotating in — while the paragraph fades up (y: 30 → 0) as the footer enters at 85% of the viewport, leaving a confident, polished final impression." },
    ],
  },

  tcs: {
    name: "TCS",
    tagline: "Logistics · Website Revamp",
    summary:
      "A full visual revamp of TCS — Pakistan's largest courier network — reimagined with a cleaner, tracking-first experience and a modern, trustworthy interface.",
    video: "/asset/TCS/lv_0_20260703185935.mp4",
    hero: "/asset/TCS/hero.webp",
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
      { src: "/asset/TCS/hero.webp", title: "Hero — Suspended Container Landing", body: "A red shipping container hangs by cables in the centre of the screen, framed by the giant word “Pakistan” top-left and “Deliverer” bottom-right. Its face carries the TCS logo and an “Enter your Tracking Number” search bar with a Track Shipment button, while animated stat counters tick up on the right — 40+ Years, 500+ Towns & Cities, 50,000+ Customer Interactions. The fixed navbar sits above it. The container is “lowered in” as the anchor for everything that follows." },
      { src: "/asset/TCS/1.webp", title: "TCS Express Centre — Red Curtain Drop", body: "As you scroll, a solid red panel drops down from the top like a full-bleed overlay, wiping over the still-pinned container so only its lower edge peeks out beneath. The panel reveals the “TCS Express Centre” heading and history copy — started 1983, 1,000+ retail centres, COCO / Franchised / Shop-in-Shop / Agents / IBRS — alongside a Become a Business Partner button." },
      { src: "/asset/TCS/2.webp", title: "Product & Services — Sliding Panels", body: "The container is centred and pinned while two red panels fly in from off-screen: Express enters from the left (xPercent: -110 → 0) to sit above the container's left edge at z-30, and Logistic enters from the right (xPercent: 110 → 0) to tuck behind its right edge at z-10. Their service icons fade and rise in with a stagger, then the central “Product & Services” card pops with a back.out scale bounce at z-40 — fully reversible on scroll-up." },
      { src: "/asset/TCS/3.webp", title: "E-com Solutions — Layered Cards", body: "The background switches to a photo of a TCS worker taping a box in a warehouse. A frosted-glass card on the right holds “E-com Solutions” with an Explore APIs button, while on the left a stack of cards — a white one behind and a red “TCS Developer Portal” card in front — animate and overlap in a layered card-shuffle that promotes the developer API story." },
      { src: "/asset/TCS/4.webp", title: "CSR Activities — Modal Gallery", body: "This section is presented like an opened dialog, complete with a ✕ close button at the top. The heading “TCS's CSR Activities In Pakistan” sits above two cards — TCF and Khadija School — each showing a fanned-out stack of tilted, polaroid-style photos over its description. The photo stacks read as an entrance-fan / spread-on-hover gallery." },
      { src: "/asset/TCS/5.webp", title: "Customer Support — Radial Layout", body: "A centred radial layout places the “Customer Support” title and paragraph in the middle, with four photo cards floating into the corners — Call Centres (top-left), WhatsApp (top-right), Social Media (bottom-left) and 24/7 Support (bottom-right). Each card carries a soft red glow and animates inward to settle symmetrically around the central text." },
      { src: "/asset/TCS/6.webp", title: "Footer", body: "A clean, light footer in four columns — Company Information, Product & Services, the Karachi Head Office address, and a Signup for Updates block with an email field and Follow Us social icons. A bottom bar carries the copyright, Terms / Privacy / FAQs links and a red scroll-to-top button, rounding out the experience." },
    ],
  },

  elyscents: {
    name: "Elyscents",
    tagline: "Fragrance · Website Revamp",
    summary:
      "A revamp of Elyscents — a premium fragrance house — redesigned around atmosphere, scent storytelling and an elegant shopping experience.",
    hero: "/asset/Elyscents/hero%20section.webp",
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
      { src: "/asset/Elyscents/hero%20section.webp", title: "Header + Hero", body: "Top bar with the Elyscents logo, full navigation (Home, All Perfumes, Agaaz Series, Crazy Deals, About Us, Contact Us) and search, account and bag icons — the cart showing a live count. Logo and links animate in with Framer Motion. The hero is a pinned stack of banner cards (“3 Scents. 1 Deal” and more); as you scroll, GSAP fans the stacked cards out and flings each one up and away to reveal the next, with pagination dots below." },
      { src: "/asset/Elyscents/1.webp", title: "Premium Bundles", body: "A fanned deck of bundle cards on the left with product details on the right — title, was/now pricing in red, “Save Rs…”, a Select Perfumes button and progress dots. The section is pinned: scrolling flips through four bundles (Mega Deal → Flash Deal → Triple → Royal Duo), snapping the active card to the front while the detail panel cross-fades. A Shop All Bundles button sits at the bottom." },
      { src: "/asset/Elyscents/2.webp", title: "New Arrivals — Intro", body: "The “New Arrival” title screen. The section opens as two white panels covering the screen with the heading centred between them — a clean, theatrical entrance that sets up the reveal that follows." },
      { src: "/asset/Elyscents/3.webp", title: "New Arrivals — Coverflow", body: "As you scroll, the two white panels split apart — top sliding up, bottom sliding down — to reveal a 3D coverflow carousel of product cards. The centred card scales up and tilts to face you, and only it shows price and Add to Cart. The track auto-slides horizontally with scroll, with an Explore New Arrivals button below." },
      { src: "/asset/Elyscents/4.webp", title: "Best Sellers", body: "A row of four coloured gradient cards (“Most Loved / Best Seller Perfumes”), each with a bottle bleeding out the top of the card, plus tag, name, price, Save and Add to cart. Pinned: the heading drifts up from centre, then the cards rise in from below with a stagger, then prices and CTAs fade in. A Shop Best Seller Now button anchors the bottom." },
      { src: "/asset/Elyscents/5.webp", title: "For Her — Intro", body: "A full pink panel introducing “For Her / Best Perfumes for Women in Pakistan” with a supporting subtitle. It uses the same tear-apart mechanic as New Arrivals, but here the covering panels are pink to match the section’s mood." },
      { src: "/asset/Elyscents/6.webp", title: "For Her — Products", body: "The panels tear open to reveal four women’s bottles, each floating over rose-petal graphics with its name and inspiration, price, Save and Add to cart. A Shop Women’s Perfume button closes the section." },
      { src: "/asset/Elyscents/7.webp", title: "For Him — Products", body: "The same pattern as the women’s section, reframed as “For Him”. The distinctive touch: each bottle sits on a rounded-triangle, cone-shaped coloured card drawn with an SVG path for a spotlight look. A Shop Men’s Perfume button sits below." },
      { src: "/asset/Elyscents/8.webp", title: "Shop The Best Perfumes", body: "Four large square lifestyle images — two hugging the left edge, two the right — with the headline “Shop The Best Perfumes In Pakistan” in the clear centre gap. Pinned: the cards fan out from a tilted pile on the left into this 2-left/2-right layout while the heading slides in from the right and swaps to a one-word-per-line arrangement." },
      { src: "/asset/Elyscents/9.webp", title: "How To Pick", body: "A normal (non-pinned) scroll section with an animated heading, “How to Pick the Right Perfume Online”, and two CTA cards — a light “Not sure where to start? → Try our Tester Box” and a dark “Best perfume at a price you’ll love → Shop our full collection”. Images carry a subtle parallax and scale on scroll, with a word-by-word heading reveal." },
      { src: "/asset/Elyscents/footer.webp", title: "Footer", body: "A dark footer with the logo and four columns — Support, Quick Links, and Get in touch via WhatsApp and email — plus a copyright-notice paragraph, social icons (Instagram, Facebook, TikTok as inline SVGs) and the “© 2026 Elyscents Pakistan” line." },
    ],
  },

  shilajit: {
    name: "Shilajit Energy Drink",
    tagline: "Beverage · Website Revamp",
    summary:
      "A revamp of Shilajit Energy Drink — a functional drink made with Shilajit and Zamzam water — presented through a bold, high-energy brand experience.",
    video: "/asset/Shilajeet/shilajeet.mp4",
    hero: "/asset/Shilajeet/Hero%20section.webp",
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
      { src: "/asset/Shilajeet/Hero%20section.webp", title: "Hero — Flavour Carousel", body: "A product carousel puts a single can centre stage, with a big glowing outlined flavour name (e.g. “ORANGE PEACH”) behind it and faded cans peeking in from the left and right to hint at the rest of the range. Left ‹ and right › arrows cycle through five flavours while the dots below track the active slide — as you navigate, the background text, the can and the accent colour all shift to match the selected flavour. A pill-shaped sticky navbar (Home, Feature, Benefits, Products, About Shilajeet, Ingredients, Contact) floats over it with the logo on the left." },
      { src: "/asset/Shilajeet/1.webp", title: "Intro — Unleash The Ancient Power", body: "The main headline block leads with a bold “UNLEASH THE ANCIENT POWER.” statement on the left, a short marketing paragraph and two calls-to-action — a filled white Shop Now and a dark outlined Learn More. A tilted 3D can floats on the right against an orange-to-black gradient, carrying a subtle float and tilt on scroll and hover. The buttons route straight to the shop, making the entry point to the range immediate and confident." },
      { src: "/asset/Shilajeet/2.webp", title: "Benefits — Primal Power", body: "A “PRIMAL POWER” benefits section pairs a floating can on the left with a vertical list on the right — Boost Vitality, Raises Energy, Enhances Strength, Primal Endurance, Pumps & Hydration. As the section enters the viewport, items fade and slide in one by one, with an active/inactive highlight that dims the last item, giving the list rhythm and drawing the eye through each benefit in turn." },
      { src: "/asset/Shilajeet/3.webp", title: "Products — Shop Grid", body: "The shop grid sits under a bold “PRODUCTS” heading, laying out five items — Kiwi Lemon, Orange Peach Zamzam, Pineapple Guava, Strawberry and the Pre-Workout Supplement — in a clean, responsive grid. Each tile pulls its can image, name and price (Rs. 10,200.00) into a consistent card with a Shop Now button that adds to cart or routes to checkout, so the full range is easy to scan and buy." },
      { src: "/asset/Shilajeet/4.webp", title: "About — Ingredients Story", body: "A three-panel “About Product” band frames the brand story: a left panel for “POTENT SHILAJIT” (strawberry and shilajit resin), a dark centre panel carrying the descriptive copy about Zam Zam water and saffron, and a right panel for “GOLDEN SAFFRON” (peach, saffron, orange). Cosmic imagery on either side surrounds the centred text, with panels that parallax and animate in on scroll for a considered, storytelling feel." },
      { src: "/asset/Shilajeet/5.webp", title: "Ingredients — Hero Cards", body: "An “Ingredients” showcase highlights the hero ingredients across three image cards — Ancient Ingredients (Zam Zam Water / Saffron), Premium Shilajit and Zam Zam Water — each with a subtle hover lift and zoom. A closing tagline sits below: “The combination of these legendary ingredients creates a blend that transcends ordinary energy drinks,” tying the differentiated ingredient story together." },
      { src: "/asset/Shilajeet/Screenshot%202026-07-05%20200426.webp", title: "Footer", body: "The footer organises everything into three tidy columns. Quick Links covers Home, Shop, Pre-Workout Supplements, Products, Members, Contact, Wholesale and Our Distributor; Connectivity shows the accepted payment methods (Apple Pay, Amex, Diners, Discover, GPay, JCB, Mastercard, PayPal, Stripe, Visa); and Support carries the phone number, Privacy Policy and Terms & Conditions — a clean, well-structured close to the experience." },
    ],
  },

  nike: {
    name: "Nike — Air Jordan",
    tagline: "Footwear · Interactive Showcase",
    summary:
      "An interactive Air Jordan landing concept — a single hero sneaker staged like a gallery piece, with motion-driven feature reveals and bold editorial typography.",
    video: "/asset/Nike/video.mp4",
    hero: "/asset/Nike/hero.webp",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept build",
      overview:
        "A self-initiated showcase built around the Air Jordan silhouette. The goal was a product landing page that feels like a premium sneaker drop — one hero product, confident type and motion that keeps attention on the shoe.",
      sections: [
        { title: "The Idea", body: "Rather than a busy store, the page centres a single floating sneaker on a lit pedestal with a carousel to move through the range. Everything — colour, type, motion — is tuned to make the product the hero." },
        { title: "The Build", body: "A bold “Wear Your Style With Comfort” hero leads into a motion-led “Quality Matters” section where descriptive tags orbit the shoe along the swoosh, followed by an editorial product-detail block with heritage framing, price and a clear buy action." },
        { title: "The Result", body: "The showcase reads as a polished, high-end sneaker experience — flagship silhouettes presented as one continuous, interactive story that stays focused on the product from hero to footer." },
      ],
    },
    shots: [
      { src: "/asset/Nike/hero.webp", title: "Hero — Wear Your Style With Comfort", body: "The landing hero floats an Air Jordan 1 over a lit pedestal against a deep maroon backdrop, with an oversized headline on the left and a carousel to cycle through the range. A traced swoosh sits behind the shoe, and “Scroll for more details” invites the walkthrough below." },
      { src: "/asset/Nike/qualitu.webp", title: "Quality Matters — Feature Orbit", body: "The shoe re-appears on the left while descriptive pills — Iconic, Versatile, Premium, Timeless, Comfortable — float along a swoosh-shaped path across the screen. A “Quality Matters” statement and supporting copy on the right frame the craftsmanship story." },
      { src: "/asset/Nike/shoes%20info.webp", title: "Air Jordan Sneakers — Product Detail", body: "An editorial product block pairs a large “Air Jordan Sneakers” heading and a “Heritage · 1985” tag with a short product description, a Buy Now button and a “Starting at $219” price, the sneaker angled dynamically to the right." },
      { src: "/asset/Nike/footer.webp", title: "Footer — Interactive Showcase", body: "A clean dark footer organises Shop, Help and Company links into columns, with a short note that the page presents six flagship silhouettes as a single interactive showcase and the copyright line beneath." },
    ],
  },

  pia: {
    name: "PIA — Pakistan International Airlines",
    tagline: "Airline · Website Revamp",
    summary:
      "A concept revamp of Pakistan International Airlines built around a booking-first experience — flight search up front, clear cabin classes, a modern fleet showcase and a global route map.",
    video: "/asset/PIA/Screen%20Recording%202026-08-11%20140016.mp4",
    hero: "/asset/PIA/Hero.webp",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept revamp",
      overview:
        "A reimagining of the PIA experience with a calm, premium interface in the airline’s green-and-gold identity. The focus was to make booking effortless while showcasing cabins, fleet, destinations and offers with confidence.",
      sections: [
        { title: "The Challenge", body: "National-carrier sites tend to bury the primary action — searching a flight — under dense navigation. The revamp needed to lead with booking while still presenting the airline’s breadth: cabins, fleet, routes and fares." },
        { title: "The Approach", body: "A full-bleed cabin hero carries a prominent Round Trip / One Way / Multi City search panel. Below it, cabin classes, a modern fleet carousel with real specs, a special-offers slider and an animated global route map each get a focused, scannable section in a consistent design system." },
        { title: "The Outcome", body: "The result feels modern and trustworthy — international quality with a Pakistani heart — with the fastest route to booking front and centre and the rest of the airline’s story presented cleanly around it." },
      ],
    },
    shots: [
      { src: "/asset/PIA/Hero.webp", title: "Hero — Find Your Perfect Flight", body: "A cabin-interior hero frames a large flight-search panel with Round Trip / One Way / Multi City tabs, From/To (KHI → DXB), dates, passengers and class, plus a green Search Flights button. Trust markers — Best Fare Guarantee, Flexible Booking, Trusted Airline, Secure Payment — sit beneath." },
      { src: "/asset/PIA/Cabin%20Class.webp", title: "Cabin Class — Choose How You Fly", body: "Three cabin cards — Economy, Economy Plus and Business — each list their perks (seating, entertainment, meals, baggage) with an Explore action, over a softly blurred cabin backdrop and a supporting service-promise bar." },
      { src: "/asset/PIA/fleet.webp", title: "Fleet — Modern Fleet, Global Standards", body: "A carousel of aircraft cards — Boeing 777-300ER, 777-200LR, Airbus A320-200 — each showing capacity, range and cruise speed with a short description and a View Details link, headed by a “Modern Fleet. Global Standards.” title." },
      { src: "/asset/PIA/offers.webp", title: "Offers — Fly More, Save More", body: "A special-offers carousel centres a Dubai fare card with a 30% OFF badge, discounted price and Book Now, flanked by blurred neighbouring destinations, over a green-and-gold PIA tailfin. A benefits bar (Best Fares, Extra Baggage, Flexible Options, Secure Booking) anchors the section." },
      { src: "/asset/PIA/location.webp", title: "Destinations — Global Route Map", body: "An animated world map plots PIA’s network with golden arcs radiating from Pakistan to destinations across Asia, the Middle East, Europe, Africa and North America, each marked with a labelled pin." },
      { src: "/asset/PIA/Contact.webp", title: "Contact — Let’s Get You Airborne", body: "A split contact section pairs call, email, head-office and ticketing-hours cards on the left with a “Send us a message” form (name, email, subject, message) on the right, over an aircraft backdrop." },
      { src: "/asset/PIA/footer.webp", title: "Footer", body: "A dark green footer organises Explore, Support, Airline and Contact columns alongside a “Fare alerts” newsletter signup and social links, closing with the “Connecting Pakistan with the world since 1946” line." },
    ],
  },

  "samurae-punk": {
    name: "Samurae Punk",
    tagline: "Game · Landing Page",
    summary:
      "A cinematic landing page for a fictional open-world action-RPG — a neon-samurai world rendered in a bold red-on-black identity, with feature reveals, dispatches and a strong call to play.",
    video: "/asset/Samurae%20punk/Screen%20Recording%202026-08-11%20173941.mp4",
    hero: "/asset/Samurae%20punk/hero.webp",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept build",
      overview:
        "A concept marketing site for “Samurae Punk”, a cyberpunk-samurai action-RPG. The brief was pure atmosphere — a landing page that sells a world and a mood as much as a game, and pushes players toward Play Now.",
      sections: [
        { title: "The Idea", body: "Set in a dying neon megacity where feudal honour meets machine-age chaos, the site had to feel like a AAA game portal — dramatic character art, glitch typography and a relentless red-on-black palette." },
        { title: "The Build", body: "A full-bleed character hero opens with the tagline and platform badges, flowing into a numbered “Forged in Steel & Code” feature grid, a “From the Dojo” news wall (patch notes, lore, tournaments) and a final “Enter the Iron Age” call to action." },
        { title: "The Result", body: "The page reads as a confident, immersive game landing — every section reinforces the world and funnels attention to Play Now, closing on studio and community links." },
      ],
    },
    shots: [
      { src: "/asset/Samurae%20punk/hero.webp", title: "Hero — Rise as the Last Iron Ronin", body: "A neon-lit samurai stands centre-frame beside the glitch-styled “Samurae Punk” logotype, with a “Season One” tag, a short world pitch and Play Now / Watch Trailer actions. Player rating (4.9) and “2.4M+ active warriors” float on the right." },
      { src: "/asset/Samurae%20punk/Screenshot%202026-08-11%20173703.webp", title: "Core Features — Forged in Steel & Code", body: "A numbered feature grid pairs “Blade Combat Evolved” (a fluid, responsive combat system) with “Open World Neon City” (explore the megacity of Tokkyo), each over moody cityscape imagery with red accent labels." },
      { src: "/asset/Samurae%20punk/Screenshot%202026-08-11%20173714.webp", title: "From the Dojo — Latest Dispatches", body: "A three-up news wall — tagged Patch Notes, Lore and Tournament — surfaces the latest updates with dated cards, character art and Read More links, under a bold “From the Dojo” heading." },
      { src: "/asset/Samurae%20punk/Screenshot%202026-08-11%20173725.webp", title: "Enter the Iron Age", body: "A full-bleed closing hero centres “Enter the Iron Age” over the armoured protagonist, with Play Free Now / Watch Trailer buttons and PC · PlayStation 5 · Xbox Series X availability." },
      { src: "/asset/Samurae%20punk/Screenshot%202026-08-11%20173733.webp", title: "Footer — Iron Ghost Studios", body: "A dark footer organises Game, Community and Company links into columns beside a short description of the title, closing with the studio credit and social icons." },
    ],
  },

  highfy: {
    name: "Highfy",
    tagline: "Beauty & Cosmetics · E-commerce",
    summary:
      "A beauty and cosmetics e-commerce concept — a category-rich storefront with animated product showcases, brand spotlights and a bright, trustworthy shopping experience.",
    video: "/asset/highfy/video.mp4",
    hero: "/asset/highfy/hero.webp",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept build",
      overview:
        "A storefront concept for Highfy, a beauty marketplace carrying thousands of authentic products. The goal was to make a very large catalogue feel curated and friendly, with motion that adds delight without getting in the way of shopping.",
      sections: [
        { title: "The Challenge", body: "Beauty platforms juggle huge catalogues across skincare, makeup, haircare and fragrance. The design had to make that breadth navigable while feeling premium and reassuring about authenticity." },
        { title: "The Approach", body: "A clean purple-accented system leads with search and a full category nav, then flows into a fanned promo carousel, a best-seller row, animated brand spotlights (including a Korean-beauty showcase) and an FAQ, all built to keep browsing effortless." },
        { title: "The Outcome", body: "The result feels like a trusted, well-organised beauty destination — large and varied, but easy to scan, with authenticity and delivery promises reinforced throughout." },
      ],
    },
    shots: [
      { src: "/asset/highfy/hero.webp", title: "Hero — Pakistan’s Most Trusted Beauty Platform", body: "The storefront opens with a search bar and a full category nav (Skincare, Makeup & Nails, Perfumes, Haircare, Bodycare, Beauty Tools, Personal Care), a “10,000+ authentic products” promo banner and a fanned deck of brand/offer cards below." },
      { src: "/asset/highfy/best%20seller.webp", title: "Best Seller — Customer Favourites", body: "A horizontal row of product cards — hair masks, setting sprays, tools and more — each with authentic badges, discount tags, star ratings, price and Add to Cart, under a “Best Seller” heading." },
      { src: "/asset/highfy/korean.webp", title: "Korean Beauty — Brand Spotlight", body: "A playful radial layout arranges Korean-beauty brands — Beauty of Joseon, numbuzin, AXIS-Y, Anua, Dr.Althea — as tilted discount cards around a central “Korean Beauty” label on a soft pink backdrop." },
      { src: "/asset/highfy/FAQ.webp", title: "FAQ — Good To Know", body: "An accordion of common questions (what Highfy is, how to order, delivery, shipping, returns, authenticity) with an expanded answer styled in the brand’s purple, under a bold “Frequently Asked Questions” heading." },
      { src: "/asset/highfy/footer.webp", title: "Footer", body: "A reassurance bar (Easy Returns, 100% Authentic, Fast Delivery) sits above a multi-column footer — Contact, Policies, Company, Categories, Top 5 Brands and Work With Us — closing with the “Pakistan’s largest beauty destination” line." },
    ],
  },

  "boss-leaf": {
    name: "Boss Leaf",
    tagline: "Natural Leaf Wraps · Website (18+)",
    summary:
      "A dark, premium storefront for Boss Leaf, a natural tobacco leaf-wraps brand — cinematic product staging, a flavour-led shop and a wholesale funnel. Intended for adults 18+.",
    video: "/asset/boss-leaf/Screen%20Recording%202026-08-11%20180539.mp4",
    hero: "/asset/boss-leaf/Screenshot%202026-08-11%20180230.webp",
    caseStudy: {
      role: "Design & Front-End Development",
      timeline: "Concept build",
      overview:
        "A product-led site for Boss Leaf, a natural leaf-wraps brand. The design leans into cinematic, high-contrast product staging to present the range confidently, with a clear path to shop and a dedicated wholesale/retailer funnel. (Adults 18+.)",
      sections: [
        { title: "The Challenge", body: "The brand needed a premium, grown-up presence that showcases a broad flavour range and supports both retail shoppers and wholesale/retailer partners, with age-appropriate framing throughout." },
        { title: "The Approach", body: "A near-black palette with cinematic red lighting stages each pack like a product shoot. A bold hero and brand-story section lead into flavour-led shop rows, a “Tru Cuts” range and a stats-driven wholesale block with a clear Apply for Wholesale action." },
        { title: "The Outcome", body: "The result reads as a confident, premium product site — dramatic staging and a clear structure that make the range easy to browse while routing retailers cleanly toward wholesale." },
      ],
    },
    shots: [
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180230.webp", title: "Hero — Premium Collection", body: "A dramatic hero stages a “Black Cherry Gelato” pack on a lit pedestal in cinematic red smoke, with a large product title, Explore Now action and an age/legal compliance bar across the bottom." },
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180240.webp", title: "Natural Leaf Wraps 7pk", body: "A product spotlight pairs a big “Natural Leaf Wraps 7pk” headline with the featured pack and quick feature badges — 100% Natural Leaf, Slow Burning, Premium Quality — plus Add to Cart and a View More link." },
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180256.webp", title: "Who We Are — Better Leaf. Better Smoke.", body: "A brand-story section sets a giant “Better leaf. Better smoke.” statement against copy about hand-picked, hand-cut whole leaf, closed by a scrolling marquee — Hand Cut · Slow Burning · 100% Natural Tobacco Leaf." },
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180318.webp", title: "Shop — Flavour Range", body: "A product grid presents flavours — Aromatic, Cookie Dream, Dark XO, Gasconsin Milky White — each staged in its own coloured lighting with price and Add to Cart, over a “View More” call to the full shop." },
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180357.webp", title: "Tru Cuts — Hand-Graded Range", body: "A “Tru Cuts” showcase fans four numbered product cards — Aromatic Classic, Original Natural, Dark Diamond, Vanilla Caramel Cream — in warm, smoky lighting with per-card Add to Cart actions." },
      { src: "/asset/boss-leaf/Screenshot%202026-08-11%20180421.webp", title: "The Range & Wholesale", body: "A stats band — 6 collections, 24 flavours, 100% natural leaf, slow burning — sits above a “Put Boss Leaf on your shelf” retailer block with case-pricing perks and an Apply for Wholesale action." },
    ],
  },
};
