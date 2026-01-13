import { Monitor, Users, Lightbulb, Rocket, Trophy, Calendar, MapPin } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Initiatives', path: '/initiatives' },
  { name: 'Blogs', path: '/blog' },  // <--- ADD THIS LINE
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const STATS = [
  { id: 1, label: 'Startups Incubated', value: 150, suffix: '+' },
  { id: 2, label: 'Funding Raised', value: 50, suffix: 'Cr+' },
  { id: 3, label: 'Student Reach', value: 25, suffix: 'K+' },
  { id: 4, label: 'Events Hosted', value: 500, suffix: '+' },
];

export const INITIATIVES = [
  {
    id: 'eureka',
    title: 'Eureka!',
    tagline: 'Asia\'s Largest Business Model Competition',
    description: 'Eureka! is intended to encourage youth to become job creators rather than job seekers. It provides a platform for potential ideas to grow into successful startups.',
    stats: { participation: '50+', attendents: '250+', opportunity: 'Pitching' },
    icon: Lightbulb,
    color: 'from-blue-400 to-purple-600'
  },
  {
    id: 'esummit',
    title: 'Campus Ambassador',
    tagline: 'Chance to gain leadership quality',
    description: 'The campus ambassador selection on the campus of UP college',
    stats: { participation: '10', attendents: '50+', opportunity: 'Leadership' },
    icon: Users,
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'nec',
    title: 'Mentor Mante',
    tagline: 'Keynote addressing from notable tech personalities',
    description: 'The notable faculty of IIMT noida addressed inspiring speech to youth of UP college',
    stats: { participation: '50+', attendents: '250+', opportunity: 'Mentorship' },
    icon: Rocket,
    color: 'from-emerald-400 to-teal-600'
  }
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Deepak Mishra',
    role: 'President of Ecell',
    image: '/assets/Deepak.png',
    linkedin: '#',
    email: 'deepak@emial'
  },
  {
    id: 2,
    name: 'Pratyasha Singh',
    role: 'Vice President',
    image: '/assets/Pratyasha.png',
    linkedin: '#',
    email: 'pratyasha@email'
  },
  {
    id: 3,
    name: 'Krishna Mishra',
    role: 'Convener',
    image: '/assets/Krishna.png',
    linkedin: '#',
    email: 'krishna@email'
  },
  {
    id: 4,
    name: 'Subhi Tripathi',
    role: 'Co-convener',
    image: '/assets/Subhi.png',
    linkedin: '#',
    email: 'subhi@email'
  },
  {
    id: 5,
    name: 'Kshitij Baranwal',
    role: 'Finance Head',
    image: '/assets/Kshitij.png',
    linkedin: '#',
    email: 'kshitiji@email'
  },
  {
    id: 6,
    name: 'Jagriti Agrawal',
    role: 'Creative Head',
    image: '/assets/Jagriti.png',
    linkedin: '#',
    email: 'jagriti@email'
  },
  {
    id: 7,
    name: 'Tushar Keshari',
    role: 'Social Head',
    image: '/assets/Tushar.png',
    linkedin: '#',
    email: 'tushar@email'
  },
  {
    id: 8,
    name: 'Priyanshu Singh',
    role: 'Event Head',
    image: '/assets/Priyanshu.png',
    linkedin: '#',
    email: 'priyanshu@email'
  },
  {
    id: 9,
    name: 'Harsh Singh',
    role: 'PR Head',
    image: '/assets/Harsh2.png',
    linkedin: '#',
    email: 'harsh@email'
  },
  {
    id: 11,
    name: 'Sanjeevni Rajesh',
    role: 'Creative team',
    image: '/assets/Sanjeevni.png',
    linkedin: '#',
    email: 'sanjeevni@email'
  },
  {
    id: 12,
    name: 'Harsh Pandey',
    role: 'Creative team',
    image: '/assets/Harsh1.png',
    linkedin: '#',
    email: 'harsh@email'
  },
  {
    id: 13,
    name: 'Ashmita Raghuvanshi',
    role: 'Social media',
    image: '/assets/Ashmita.png',
    linkedin: '#',
    email: 'ashmita@email'
  },
  {
    id: 14,
    name: 'Khushi Jaiswal',
    role: 'Finance team',
    image: '/assets/Khushi.png',
    linkedin: '#',
    email: 'khushi@email'
  },
  {
    id: 15,
    name: 'Swakriti Jaiswal',
    role: 'Event Management',
    image: '/assets/Swakriti.png',
    linkedin: '#',
    email: 'swakriti@email'
  },
  {
    id: 16,
    name: 'Oshika Singh',
    role: 'Event Management',
    image: '/assets/Oshika.png',
    linkedin: '#',
    email: 'rishu@email'
  },
  {
    id: 17,
    name: 'Aditya Dubey',
    role: 'Tech team',
    image: '/assets/Aditya.png',
    linkedin: '#',
    email: 'rishu@email'
  },
  {
    id: 18,
    name: 'Rishu Vishwakarma',
    role: 'Tech team',
    image: '/assets/Rishu.png',
    linkedin: '#',
    email: 'rishu@email'
  },
  {
    id: 10,
    name: 'Suyogy Shah',
    role: 'Tech Head',
    image: '/assets/Suyogy.jpeg',
    linkedin: '#',
    email: 'suyogy@email'
  },
  
];

export const TIMELINE_DATA = [
  { year: '2023', title: 'Inception', description: 'The Entrepreneurship Cell was founded with a vision to create job creators.' },
  { year: '2024', title: 'First Eureka!', description: 'Hosted the first-ever Eureka event with 200+ attendees.' },
  { year: '2025', title: 'Second Eureka!', description: 'Received participation from over all the faculties.' },
  { year: '2026', title: 'Year of Ambition', description: 'Looking forward for a year of fostering innovation.' },
];

// ... existing imports
// Add these mock images if you don't have them, or just use the URLs below

export const BLOG_CATEGORIES = ["All", "Tech", "Strategy", "Finance", "Student Life"];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The AI Revolution in India: Beyond the Hype",
    excerpt: "How Indian startups are moving from wrapper-APIs to building core foundational models. A deep dive into the ecosystem shifts in Bengaluru and Mumbai.",
    author: {
      name: "Aditya Rao",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80"
    },
    category: "Tech",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    size: "large", // Will span 2 cols and 2 rows
    content: `
      <h2>The Shift is Real</h2>
      <p>For years, 'AI' in India meant chatbots. Today, we are seeing a fundamental shift.</p>
      <blockquote>"The next unicorn won't just use AI; it will be native to it."</blockquote>
      <p>We analyzed 50+ startups in the IITB incubation center. 60% are now integrating LLMs into their core workflow, not just as a support tool.</p>
    `
  },
  {
    id: 2,
    title: "Bootstrapping vs VC: The Eternal Dilemma",
    excerpt: "Why raising $1M might be the worst thing for your early-stage startup. Lessons from founders who rejected the term sheet.",
    author: {
      name: "Meera Kapoor",
      role: "Alumni Relations",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    category: "Strategy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
    size: "tall", // Will span 1 col but 2 rows
    content: `
      <h2>The Trap of Easy Money</h2>
      <p>Validation is not money in the bank. Validation is paying customers.</p>
    `
  },
  {
    id: 3,
    title: "DeFi for Gen Z",
    excerpt: "Making decentralized finance accessible to the student population.",
    author: {
      name: "Rohan Das",
      role: "Finance Club",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    category: "Finance",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    size: "normal",
    content: "<p>Blockchain is more than just crypto trading...</p>"
  },
  {
    id: 4,
    title: "Balancing Academics and a Startup",
    excerpt: "A survival guide for student entrepreneurs. How to hack your attendance and still get a 9.0 CPI.",
    author: {
      name: "Sriya Verma",
      role: "Content Team",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80"
    },
    category: "Student Life",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    size: "wide", // Will span 2 cols but 1 row
    content: "<p>Sleep, Grades, Startup. Pick two? No, pick a better schedule.</p>"
  },
  {
    id: 5,
    title: "Green Energy Grid",
    excerpt: "The hardware startups solving India's power distribution crisis.",
    author: {
      name: "Karan Singh",
      role: "Energy Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
    },
    category: "Tech",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1473341304170-5799a2331139?w=800&q=80",
    size: "normal",
    content: "<p>Solar is cheap. Storage is expensive. That is where the opportunity lies.</p>"
  },
  {
    id: 6,
    title: "The Art of the Pitch Deck",
    excerpt: "We reviewed 100+ decks. Here are the 5 slides that investors actually look at.",
    author: {
      name: "Editor's Desk",
      role: "E-Cell Core",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80"
    },
    category: "Strategy",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1559136555-930d72f1d300?w=800&q=80",
    size: "tall",
    content: "<p>Stop putting the 'Thank You' slide. Ask for the money.</p>"
  }
];

export const HOME_FEATURES = [
  {
    title: "Incubation",
    desc: "From idea to IPO. We provide the soil for your seed.",
    icon: "🌱"
  },
  {
    title: "Mentorship",
    desc: "Guidance from alumni who have walked the path.",
    icon: "💡"
  },
  {
    title: "Funding",
    desc: "Connecting brilliance with capital. $5M+ raised.",
    icon: "💰"
  },
  {
    title: "Network",
    desc: "A brotherhood of innovators across the globe.",
    icon: "🤝"
  }
];