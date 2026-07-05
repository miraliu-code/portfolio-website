export const site = {
  wordmark: "The Atlas",
  name: "Mira Liu",
  affiliation: "Business & Psychology · American University",
  location: "Washington, D.C.",
  email: "miraliumc@gmail.com",
  linkedin: "https://www.linkedin.com/in/4mira-liu/",
  bio: "I study how organizations earn trust, create meaning, and make decisions — through strategy, communication, psychology, design, and a camera.",
  nav: [
    { label: "Atlas", href: "/atlas" },
    { label: "Photography", href: "/photography" },
    { label: "Observatory", href: "/observatory" },
    { label: "Index", href: "/the-index" },
    { label: "About", href: "/about" },
  ],
};

/* Tailored resumes — the Resume Library in the panel and at /resumes. */
export interface Resume {
  slug: string;
  title: string;
  description: string;
  pdf: string;
}

export const resumes: Resume[] = [
  {
    slug: "strategy-consulting",
    title: "Strategy & Consulting",
    description:
      "Strategy, problem solving, research, organizational behavior, case studies.",
    pdf: "/resumes/mira-liu-strategy-consulting.pdf",
  },
  {
    slug: "communications-public-affairs",
    title: "Communications & Public Affairs",
    description:
      "Communications, writing, messaging, reputation, stakeholder engagement.",
    pdf: "/resumes/mira-liu-communications-public-affairs.pdf",
  },
  {
    slug: "marketing-brand-strategy",
    title: "Marketing & Brand Strategy",
    description:
      "Branding, consumer psychology, campaigns, design, storytelling.",
    pdf: "/resumes/mira-liu-marketing-brand-strategy.pdf",
  },
  {
    slug: "social-impact-policy",
    title: "Social Impact & Policy",
    description:
      "Advocacy, research, policy, nonprofit work, donor engagement.",
    pdf: "/resumes/mira-liu-social-impact-policy.pdf",
  },
];
