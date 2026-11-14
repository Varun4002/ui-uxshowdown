// Facts transcribed from metadata_preschool.md. Anything the Maps listing did
// not provide stays `null` — render it as "unconfirmed", never guess a value.
// See the gaps section of that file before filling anything in.

export const school = {
  name: "GYANHOUZ (GYANOOZ) LEARNING HUB",
  nameHi: "ज्ञान उज् लर्निंग हब",
  // The Devanagari rendering does not match "GYANHOUZ" (gyan + house) and was
  // captured verbatim from Maps. Kept as-is until the school confirms it.
  nameHiUnverified: true,
  category: "Preschool",
  rating: 4.7,
  reviewCount: 60,
  ratingAsOf: "November 2026",
  plusCode: "JQ45+6J",
  address: {
    line1: "behind Murari Petrolpump, Choudhary Park",
    line2: "Shankar Kalat Nagar, Wakad",
    city: "Pimpri-Chinchwad",
    state: "Maharashtra",
    postalCode: "411057",
  },
  // Only one hours datum was captured: "Closed · Opens 9 am Mon".
  hours: {
    known: { day: "Monday", opens: "9:00 am" },
    complete: false,
  },
  // Confirmed by the school directly (not inferred from the listing).
  phone: "+91 92720 99011",
  phoneHref: "+919272099011",
  // Derived from the verified number — same line, WhatsApp's click-to-chat form.
  whatsappHref: "https://wa.me/919272099011",
  // Still unknown: email, website, fees, programmes, admissions process,
  // coordinates, Place ID.
  email: null,
  website: null,

  // Instagram profile, captured November 2026 — a snapshot, so any UI showing
  // these numbers needs an "as of" label.
  instagram: {
    handle: "@gyanhouz",
    url: "https://www.instagram.com/gyanhouz/",
    bio: "Educational Games and toys",
    followers: 2116,
    posts: 139,
    asOf: "November 2026",
    // The recurring series, named verbatim in the profile bio. The bio calls
    // Growth Mondays "child physiologist tips", which reads as a typo for
    // "psychologist" — not repeated here until the school confirms it.
    series: [
      {
        name: "Growth Mondays",
        body: "Child-development notes for parents, every Monday.",
      },
      {
        name: "Factusdays",
        body: "General knowledge and surprise facts, midweek.",
      },
      {
        name: "Discovery Thursday",
        body: "Small discoveries, explained for curious children.",
      },
    ],
  },
};

export const addressLines = [
  school.address.line1,
  school.address.line2,
  `${school.address.city}, ${school.address.state} ${school.address.postalCode}`,
];

const query = [school.name, ...addressLines].join(", ");

// Derived from the address, not a Place ID — opens Maps search, not the
// verified place card.
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// Placeholder marketing copy. Warm in tone, but it asserts nothing verifiable
// about the school's programme or staff. Replace with the school's own words
// before this goes anywhere real.
export const copy = {
  heroTitle: "A gentle first step into school",
  heroLede:
    "A preschool in Wakad, Pimpri-Chinchwad. Small rooms, unhurried days, and space to be four years old.",
  highlights: [
    {
      title: "Preschool",
      body: "Early-years learning for the years before formal school.",
      pending: false,
    },
    {
      title: "In Wakad",
      body: "Behind Murari Petrolpump, in Choudhary Park.",
      pending: false,
    },
    {
      title: "Programme details",
      body: "Batch timings, age groups and fees are not published yet — ask the school directly.",
      pending: true,
    },
  ],
  formNote:
    "Demo form: nothing is sent anywhere and no data leaves your browser.",
};

// ----------------------------------------------------------------------------
// "Little Wonder" experience content. Provided directly in the design brief;
// anything the school has not verified is marked pending rather than invented.
// ----------------------------------------------------------------------------

export const theme = {
  tagline: "A little world of wonder, where every little step becomes a big adventure.",
  chips: ["Learn", "Play", "Discover", "Grow"],
  nav: [
    { label: "Home", href: "#top" },
    { label: "About Us", href: "#welcome" },
    { label: "Our Programs", href: "#programs" },
    { label: "A Day", href: "#day" },
    { label: "Contact", href: "#contact" },
    // "Activities" (#activities) and "Our Little World" (#little-world) are built
    // in the next phase. Nav links must resolve, so they are not published yet.
  ],
};

export const heroCopy = {
  title: "Big Adventures Start With",
  titleEm: "Little Steps!",
  lede: "A happy little place where curious minds grow, friendships bloom and every day brings a new adventure.",
  primary: { label: "Explore Our School", href: "#welcome" },
  secondary: { label: "Book a Visit", href: "#enrol" },
};

export const welcomeCopy = {
  title: "Every Little Heart Has a Place Here.",
  body:
    "Gyanhouz is a warm, unhurried preschool where children are known by name. Days are built around play — because play is how four-year-olds learn best.",
  pillars: [
    {
      title: "Learn Through Play",
      body: "Blocks, paint and pretend are the curriculum. Curiosity does the rest.",
      character: "fox",
      tone: "sage",
    },
    {
      title: "Grow With Confidence",
      body: "Small rooms and familiar faces, so trying something new feels safe.",
      character: "bear",
      tone: "butter",
    },
    {
      title: "Make Lifelong Little Friends",
      body: "Sharing, taking turns and giggling — the social skills that last longest.",
      character: "bunny",
      tone: "lavender",
    },
  ],
};

export const programs = [
  {
    name: "Tiny Tots",
    bullets: ["Early sensory exploration", "Music and movement", "Social development"],
    character: "penguin",
    tone: "butter",
    agesVerified: false,
  },
  {
    name: "Little Explorers",
    bullets: ["Creative discovery", "Nature and storytelling", "Interactive activities"],
    character: "fox",
    tone: "sage",
    agesVerified: false,
  },
  {
    name: "Growing Minds",
    bullets: ["Early literacy", "Numbers and problem-solving", "School readiness"],
    character: "turtle",
    tone: "sky",
    agesVerified: false,
  },
];

// ----------------------------------------------------------------------------
// Phase 2 content, supplied by the owner. Copy is used verbatim — it includes
// the school's own phrasing (e.g. "owl greetings") and named parent reviews,
// so treat it as approved copy, not something to paraphrase.
// ----------------------------------------------------------------------------

export const day = {
  eyebrow: "Our Little Day",
  title: "A Day at Gyanhouz",
  intro:
    "A gentle rhythm from the first song to the last story. Timings are the school's guide and may shift on the day.",
  blocks: [
    {
      time: "09:00 AM",
      label: "Morning Circle",
      body: "We start the day with songs, stretching, and our daily owl greetings to build routine and focus.",
    },
    {
      time: "10:30 AM",
      label: "Discovery Blocks",
      body: "Hands-on sensory play, messy art, and foundational puzzle-solving in small, guided groups.",
    },
    {
      time: "12:00 PM",
      label: "Energy Burn",
      body: "Supervised outdoor play in our sandbox and climbing frames to develop gross motor skills.",
    },
    {
      time: "01:30 PM",
      label: "Quiet / Wind Down",
      body: "Storytelling and soft-focus activities to help children transition calmly before pickup.",
    },
  ],
};

export const safety = {
  eyebrow: "Safety & Care",
  title: "Safe enough to stop worrying",
  items: [
    {
      icon: "cctv",
      title: "100% CCTV Monitored",
      body: "Secure, continuous monitoring across all classrooms and outdoor play zones for total peace of mind.",
    },
    {
      icon: "ratio",
      title: "Child-to-Teacher Ratio (1:8)",
      body: "Small class sizes ensure your child receives individualized attention and immediate care.",
    },
    {
      icon: "sanitize",
      title: "Medical-Grade Sanitization",
      body: "Toys and high-touch surfaces are sanitized daily using non-toxic, child-safe protocols.",
    },
    {
      icon: "access",
      title: "Restricted Campus Access",
      body: "Secure digital check-in and check-out procedures mean only authorized guardians enter the facility.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Parent Stories",
  title: "What parents tell us",
  items: [
    {
      quote:
        "The transformation in Aarav’s confidence in just 3 months is incredible. The teachers genuinely care.",
      author: "Priya S.",
      role: "Parent of a 3-year-old",
    },
    {
      quote:
        "Clean, safe, and my daughter comes home singing new songs every day. Highly recommend the Little Explorers program.",
      author: "Rahul M.",
      role: "Parent",
    },
    {
      quote:
        "The weekly updates and ‘Growth Mondays’ keep us so connected to what our son is learning.",
      author: "Sneha & Amit",
      role: "Parents",
    },
  ],
};

export const visit = {
  eyebrow: "Visit us",
  title: "Your Little One's Next Big Adventure Starts Here!",
  lede:
    "Come and see the rooms, meet the teachers, and ask us anything — there is no charge and no commitment.",
  checklist: [
    "Walk through the rooms and the outdoor play area",
    "Meet the teachers who would look after your child",
    "Ask about the day, the snack, and the first-week routine",
  ],
};

export const faq = {
  eyebrow: "Good to know",
  title: "Before you book a visit",
  items: [
    {
      q: "Are meals provided?",
      a: "Parents provide a packed snack, but we ensure supervised, hygienic eating times to encourage independence.",
    },
    {
      q: "Does my child need to be potty trained?",
      a: "For Tiny Tots, no. Our staff assists with diaper changes and supports your ongoing potty-training efforts.",
    },
    {
      q: "How do you handle separation anxiety?",
      a: "Our transition protocol includes shorter initial days and dedicated 1-on-1 comforting from our primary educators.",
    },
  ],
};
