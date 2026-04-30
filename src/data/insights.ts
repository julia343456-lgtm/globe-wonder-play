export type Insight = {
  slug: string;
  tag: "Playbook" | "Teardown" | "POV";
  title: string;
  excerpt: string;
  date: string;
  time: string;
  author: string;
  body: string[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "4x-roas-playbook",
    tag: "Playbook",
    title: "The 4× ROAS playbook for sub-$50 AOV brands",
    excerpt:
      "A complete teardown of how we rebuilt the funnel for a sleep brand and quadrupled new-customer revenue without raising spend.",
    date: "Apr 2026",
    time: "12 min",
    author: "The Neom Teckverse team",
    body: [
      "Sub-$50 AOV brands live and die on contribution margin. The playbook below is the exact sequence we run when we inherit a Meta account that's stuck below 2× ROAS.",
      "Step one is always creative volume. Not testing volume — production volume. Most stuck accounts ship four assets a month. We ship forty.",
      "Step two is funnel compression. We rewrite the post-click experience so the offer, the proof, and the action all live above the fold on mobile. Ninety percent of the lift comes from the first 600 vertical pixels.",
      "Step three is lifecycle. A second purchase inside 30 days roughly doubles LTV. We instrument a four-touch post-purchase flow that earns it.",
    ],
  },
  {
    slug: "b2b-sites-look-the-same",
    tag: "Teardown",
    title: "Why every B2B site looks the same — and what to do about it",
    excerpt:
      "Gradient hero, three-up feature grid, logo bar, testimonial carousel. We mapped 200 B2B sites and the median is depressing.",
    date: "Apr 2026",
    time: "8 min",
    author: "The Neom Teckverse team",
    body: [
      "We pulled the homepage of the top 200 Series B+ B2B SaaS companies and tagged them by layout pattern. 73% used the same six-block scaffold.",
      "The fix isn't 'be different for the sake of it.' The fix is to build a homepage around the one thing only you can say.",
      "If your homepage could be lifted onto a competitor's domain and still make sense, it isn't doing its job.",
    ],
  },
  {
    slug: "brand-vs-performance",
    tag: "POV",
    title: "Brand vs performance is a false dichotomy",
    excerpt:
      "Anyone arguing brand vs performance in 2026 is selling you something. Here's how we run them as one motion.",
    date: "Mar 2026",
    time: "6 min",
    author: "The Neom Teckverse team",
    body: [
      "Brand builds the demand that performance harvests. When the two teams sit on different floors, the harvester always wins the budget — and the harvest shrinks year over year.",
      "We run a single weekly forum where brand and performance review the same dashboard: blended CAC, branded search velocity, and incrementality lift.",
    ],
  },
  {
    slug: "creative-engine",
    tag: "Playbook",
    title: "Building a creative engine that fuels both paid and organic",
    excerpt:
      "A repeatable weekly rhythm — concepts, shoots, edits, ships — that turns creative from a bottleneck into a moat.",
    date: "Mar 2026",
    time: "14 min",
    author: "The Neom Teckverse team",
    body: [
      "The teams that win on TikTok and Reels in 2026 aren't the most creative — they're the most consistent.",
      "Our pods run a Monday concept jam, a Wednesday shoot day, and a Friday ship review. Forty assets a month, every month, no exceptions.",
    ],
  },
  {
    slug: "aurora-case",
    tag: "Teardown",
    title: "How Aurora 4×'d revenue without raising the budget",
    excerpt:
      "The behind-the-scenes of one of our favorite engagements — what we changed, what we measured, what we'd do differently.",
    date: "Feb 2026",
    time: "10 min",
    author: "The Neom Teckverse team",
    body: [
      "Aurora came in at 1.8× blended ROAS on a $400k/month spend. Six months later they were at 4.1× on the same budget.",
      "The unlock wasn't a new channel. It was a creative pod, a rebuilt PDP, and a four-touch lifecycle flow.",
    ],
  },
  {
    slug: "mmm-weekly",
    tag: "POV",
    title: "MMM is back. Here's how we use it weekly",
    excerpt:
      "Marketing mix modeling used to mean a six-figure engagement and a PDF. Open-source MMM changed that — here's our stack.",
    date: "Feb 2026",
    time: "9 min",
    author: "The Neom Teckverse team",
    body: [
      "We run open-source MMM weekly for every client over $200k/month in spend. The model isn't perfect — but a directional answer on Monday beats a precise answer in eight weeks.",
    ],
  },
];
