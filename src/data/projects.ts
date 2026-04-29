export const PROJECTS = [
  {
    slug: "aurora-dtc",
    n: "01",
    title: "Aurora DTC",
    cat: "Performance · DTC",
    blurb: "We rebuilt the funnel for a sleep brand and 4×'d new-customer revenue in two quarters.",
    metrics: [
      { k: "4.1×", v: "ROAS" },
      { k: "−38%", v: "CAC" },
      { k: "+220%", v: "Revenue" },
    ],
    services: ["Paid Social", "Creative", "CRO", "Lifecycle"],
    summary:
      "Aurora came to us with strong product-market fit but a creative pipeline that couldn't keep up with paid spend. We embedded a creative pod, rebuilt the testing framework, and rewrote the post-purchase journey.",
  },
  {
    slug: "helio-finance",
    n: "02",
    title: "Helio Finance",
    cat: "B2B SaaS · SEO",
    blurb: "Took a fintech from page-3 obscurity to category leader on 80+ commercial keywords.",
    metrics: [
      { k: "12×", v: "Organic traffic" },
      { k: "#1", v: "for 23 terms" },
      { k: "$2.1M", v: "Pipeline / yr" },
    ],
    services: ["SEO", "Content", "PR", "Web"],
    summary:
      "We mapped the entire buyer journey, rebuilt the site IA around topical authority, and shipped a 60-piece content engine that compounds quarterly.",
  },
  {
    slug: "orbiter-studio",
    n: "03",
    title: "Orbiter Studio",
    cat: "Brand · Web",
    blurb: "A full identity, motion system, and product site for a satellite imaging startup.",
    metrics: [
      { k: "6 wks", v: "to launch" },
      { k: "$14M", v: "Series A" },
      { k: "98", v: "Lighthouse" },
    ],
    services: ["Brand", "Motion", "Web", "Copy"],
    summary:
      "From naming workshops to a generative type system to a launch site that helped close their Series A in under two months.",
  },
  {
    slug: "nimbus-health",
    n: "04",
    title: "Nimbus Health",
    cat: "Healthcare · Growth",
    blurb: "Multi-channel growth program for a telehealth brand expanding into 12 new states.",
    metrics: [
      { k: "+340%", v: "Bookings" },
      { k: "12", v: "states live" },
      { k: "$0.42", v: "per lead" },
    ],
    services: ["Paid Search", "Local SEO", "Lifecycle"],
    summary:
      "We launched geo-targeted campaigns, a programmatic landing system, and a CRM that nurtured leads from first click to first appointment.",
  },
  {
    slug: "vector-atlas",
    n: "05",
    title: "Vector Atlas",
    cat: "Climate · Data",
    blurb: "An interactive globe of climate signals — built to drive enterprise inbound.",
    metrics: [
      { k: "1.2M", v: "first-month visits" },
      { k: "44", v: "press hits" },
      { k: "$8M", v: "in pipeline" },
    ],
    services: ["Brand", "WebGL", "PR", "Content"],
    summary:
      "An interactive data piece that became the company's #1 inbound channel within 30 days of launch.",
  },
  {
    slug: "luma-cosmetics",
    n: "06",
    title: "Luma Cosmetics",
    cat: "Beauty · Social",
    blurb: "Built a TikTok-first creative engine that took a clean beauty brand to category-leading CPMs.",
    metrics: [
      { k: "9.4M", v: "monthly views" },
      { k: "−61%", v: "CPM" },
      { k: "+180%", v: "DTC sales" },
    ],
    services: ["Social", "Creator", "Paid Social"],
    summary:
      "A weekly creative rhythm, a stable of 24 creators, and a paid amplification model that turned organic wins into revenue.",
  },
];

export type Project = {
  slug: string;
  n: string;
  title: string;
  cat: string;
  blurb: string;
  metrics: { k: string; v: string }[];
  services: string[];
  summary: string;
};
