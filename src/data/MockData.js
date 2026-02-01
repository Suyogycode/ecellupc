import {  Users, Lightbulb, Rocket, Trophy, Heart, TrendingUp, FileText, } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'About Us', path: '/about' },
  { name: 'Initiatives', path: '/initiatives' },
  { name: 'Blogs', path: '/blog' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Team', path: '/team' },
  { name: 'Startups', path: '/startups' },
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
    id: 'campus-ambassador',
    title: 'Campus Ambassador',
    tagline: 'Chance to gain leadership quality',
    description: 'The campus ambassador selection on the campus of UP college',
    stats: { participation: '10', attendents: '50+', opportunity: 'Leadership' },
    icon: Users,
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'nec',
    title: 'Mentor Mantee',
    tagline: 'Keynote addressing from notable tech personalities',
    description: 'The notable faculty of IIMT noida addressed inspiring speech to youth of UP college',
    stats: { participation: '50+', attendents: '250+', opportunity: 'Mentorship' },
    icon: Rocket,
    color: 'from-emerald-400 to-teal-600'
  }
];

export const ABOUT_VALUES = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We believe in pushing boundaries and encouraging unconventional thinking.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Building a network of passionate entrepreneurs supporting each other.'
  },
  {
    icon: Heart,
    title: 'Student Centric',
    description: 'Every initiative is designed keeping student needs and aspirations at the core.'
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'Continuous learning and adaptation is our way forward.'
  }
];

export const GROW_RESUME_OPPORTUNITIES = [
  {
    icon: Users,
    title: 'Campus Ambassador Program',
    description: 'Represent E-Cell UPC in your network and gain leadership experience.',
    perks: ['Certificate', 'Letter of Recommendation', 'Networking'],
    link: '/initiatives#campus-ambassador'
  },
  {
    icon: Trophy,
    title: 'Event Volunteer',
    description: 'Be part of organizing flagship events like Eureka! and gain hands-on experience.',
    perks: ['Event Management Skills', 'Certificate', 'Goodies'],
    link: '/contact'
  },
  {
    icon: Rocket,
    title: 'Startup Internships',
    description: 'Work with startups incubated at E-Cell and get real-world startup experience.',
    perks: ['Stipend', 'Experience Letter', 'Skill Development'],
    link: '/startups'
  },
  {
    icon: FileText,
    title: 'Content Creation',
    description: 'Write blogs, create social media content, and build your personal brand.',
    perks: ['Portfolio Building', 'Byline Credit', 'Exposure'],
    link: '/blog'
  }
];

export const GROW_RESUME_BENEFITS = [
  'Add valuable experience to your resume',
  'Build a strong professional network',
  'Develop leadership and teamwork skills',
  'Get recognized by industry leaders',
  'Access exclusive workshops and mentorship',
  'Earn certificates and recommendations'
];

export const TIMELINE_DATA = [
  { year: '2023', title: 'Inception', description: 'The Entrepreneurship Cell was founded with a vision to create job creators.' },
  { year: '2024', title: 'First Eureka!', description: 'Hosted the first-ever Eureka event with 200+ attendees.' },
  { year: '2025', title: 'Second Eureka!', description: 'Received participation from over all the faculties.' },
  { year: '2026', title: 'Year of Ambition', description: 'Looking forward for a year of fostering innovation.' },
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

// TODO: Deepak bhaiya mail
// TODO: Update images for everyone
// TODO: Add more members for 2023-24 and 2022-23 when data will be available
// TODO: Add IIC Heads Data
// YEAR-WISE TEAM DATA STRUCTURE
export const TEAMS_BY_YEAR = {
  '2024-25': {
    iicHeads: [
      {
        id: 101,
        name: 'Prof. Ashutosh Gupta',
        role: 'President',
        team: 'IIC UPC',
        image: 'assets/ashutosh_sir.png',
        linkedin: 'https://www.linkedin.com/in/ashutosh-gupta-a74b7810/',
        email: 'ashu1809@gmail.com'
      },
      {
        id: 103,
        name: 'Dr. Deo Narayan Singh',
        role: 'Convenor',
        team: 'IIC UPC',
        image: 'assets/deo_Sir.png',
        linkedin: 'https://www.linkedin.com/in/dr-deo-narayan-singh-840524125/',
        email: 'sdeonarayan@gmail.com'
      },
      {
        id: 104,
        name: 'Shri. Satya Sharan Mishra',
        role: 'Coordinator',
        team: 'IIC UPC',
        image: 'assets/satya_sharan_sir.webp',
        linkedin: 'https://www.linkedin.com/in/satya-sharan-mishra-b46008234/',
        email: 'satyamishra9058@gmail.com'
      }
    ],
    ecellLeadership: [
      {
        id: 1,
        name: 'Deepak Mishra',
        role: 'President',
        team: 'Leadership',
        image: 'assets/Deepak.png',
        linkedin: 'https://www.linkedin.com/in/deepak-mishra-596231332/',
        email: 'deepakmishra67482@gmail.com'
      },
      {
        id: 2,
        name: 'Pratyasha Singh',
        role: 'Vice President',
        team: 'Leadership',
        image: 'assets/Pratyasha.png',
        linkedin: 'https://www.linkedin.com/in/pratyasha-singh-39b82031a/',
        email: 'spratyasha13@gmail.com'
      },
      {
        id: 3,
        name: 'Krishna Mishra',
        role: 'Convener',
        team: 'Leadership',
        image: 'assets/Krishna.png',
        linkedin: 'https://www.linkedin.com/in/krishna-mishra-67a982293/',
        email: 'mishra.krishna9646@gmail.com'
      },
      {
        id: 4,
        name: 'Shubhi Tripathi',
        role: 'Co-convener',
        team: 'Leadership',
        image: 'assets/shubhi.webp',
        linkedin: 'https://www.linkedin.com/in/shubhi-tripathi-a3174431a/',
        email: 'Shubhi01vns@gmail.com'
      }
    ],
    teams: {
      finance: {
        head: {
          id: 5,
          name: 'Kshitij Baranwal',
          role: 'Finance Head',
          team: 'Finance Team',
          image: 'assets/Kshitij.png',
          linkedin: 'https://www.linkedin.com/in/kshitij-baranwal/',
          email: 'baranwal.kshitij99@gmail.com'
        },
        members: [
          {
            id: 14,
            name: 'Khushi Jaiswal',
            role: 'Member',
            team: 'Finance Team',
            image: 'assets/Khushi.png',
            linkedin: 'https://www.linkedin.com/in/khushi-jaiswal-2b0958381/',
            email: 'Jaiswalkhushi2205@gmail.com'
          }
        ]
      },
      creative: {
        head: {
          id: 6,
          name: 'Jagriti Agrawal',
          role: 'Creative Head',
          team: 'Creative Team',
          image: 'assets/Jagriti.png',
          linkedin: 'https://www.linkedin.com/in/jagriti-agrawal-1611b5354/',
          email: 'Jagritiagrawal403@gmail.com'
        },
        members: [
          {
            id: 11,
            name: 'Sanjeevni Rajesh',
            role: 'Member',
            team: 'Creative Team',
            image: 'assets/Sanjeevni.png',
            linkedin: 'https://www.linkedin.com/in/sanjeevani-rajesh-138bb9321/',
            email: 'Sanjeevanirajesh55@gmail.com'
          },
          {
            id: 12,
            name: 'Harsh Pandey',
            role: 'Member',
            team: 'Creative Team',
            image: 'assets/Harsh1.png',
            linkedin: 'https://www.linkedin.com/in/harsh-pandey-5487a3381/',
            email: 'pandeyharsh49380@gmail.com'
          }
        ]
      },
      social: {
        head: {
          id: 7,
          name: 'Tushar Keshari',
          role: 'Social Media Head',
          team: 'Social Media Team',
          image: 'assets/tushar.webp',
          linkedin: 'https://www.linkedin.com/in/tushar-keshari-5a6a57331/',
          email: 'usharkeshari93@gmail.com'
        },
        members: [
          {
            id: 13,
            name: 'Ashmita Raghuvanshi',
            role: 'Member',
            team: 'Social Media Team',
            image: 'assets/Ashmita.png',
            linkedin: 'https://www.linkedin.com/in/ashmita-raghuvanshi-77870232a/',
            email: 'r.ashmitaraghuvanshi@gmail.com'
          }
        ]
      },
      events: {
        head: {
          id: 8,
          name: 'Priyanshu Singh',
          role: 'Event Head',
          team: 'Event Management Team',
          image: 'assets/Priyanshu.png',
          linkedin: 'https://www.linkedin.com/in/priyanshu-singh-84a79b31a/',
          email: 'priyanshusingh06343@gmail.com'
        },
        members: [
          {
            id: 15,
            name: 'Swikriti Jaiswal',
            role: 'Member',
            team: 'Event Management Team',
            image: 'assets/Swikriti.png',
            linkedin: 'https://www.linkedin.com/in/swikriti-jaiswal-a01896375/',
            email: 'swikriti0306@gmail.com'
          },
          {
            id: 16,
            name: 'Oshika Singh',
            role: 'Member',
            team: 'Event Management Team',
            image: 'assets/Oshika.png',
            linkedin: 'https://www.linkedin.com/in/oshika-singh-473320373/',
            email: 'singhoshika6121@gmail.com'
          }
        ]
      },
      pr: {
        head: {
          id: 9,
          name: 'Harsh Singh',
          role: 'PR Head',
          team: 'Public Relations Team',
          image: 'assets/harsh2.webp',
          linkedin: 'https://www.linkedin.com/in/harsh-singh-9a9b04331/',
          email: 'harsh40357@gmail.com'
        },
        members: [
          {
            id: 17,
            name: 'Niraj Prajapati',
            role: 'Member',
            team: 'Public Relations Team',
            image: 'assets/Neeraj.jpeg',
            linkedin: 'https://www.linkedin.com/in/niraj-prajapati-711522384/',
            email: 'nkp.889664@gmail.com'
          }
        ]
      },
      tech: {
        head: {
          id: 10,
          name: 'Suyogy Shah',
          role: 'Tech Head',
          team: 'Tech Team',
          image: 'assets/Suyogy.jpeg',
          linkedin: 'https://www.linkedin.com/in/suyogy-shah-4b1678370/',
          email: 'suyogyshah709@gmail.com'
        },
        members: [
          {
            id: 18,
            name: 'Rishu Vishwakarma',
            role: 'Member',
            team: 'Tech Team',
            image: 'assets/Rishu.png',
            linkedin: 'https://www.linkedin.com/in/rishu-vishwakarma-441682381/',
            email: 'rishuvishwakarma990@gmail.com'
          },
          {
            id: 19,
            name: 'Aaditya Dubey',
            role: 'Member',
            team: 'Tech Team',
            image: 'assets/Aaditya.webp',
            linkedin: 'https://www.linkedin.com/in/aadityadubey/',
            email: 'aadityadubey219@gmail.com'
          },
        ]
      }
    }
  },
  '2023-24': {
    iicHeads: [],
    ecellLeadership: [],
    teams: {}
  },
  '2022-23': {
    iicHeads: [],
    ecellLeadership: [],
    teams: {}
  }
};

// Startups Page Sample Data Structure

// export const STARTUPS_DATA = [
//   {
//     id: 1,
//     name: 'EduTech Solutions',
//     tagline: 'Revolutionizing Learning for Rural India',
//     description: 'An AI-powered platform making quality education accessible to students in remote areas through vernacular content and adaptive learning.',
//     founder: 'Rahul Sharma',
//     year: 2024,
//     stage: 'Seed',
//     funding: '₹25L',
//     sector: 'EdTech',
//     logo: 'assets/startup-logo1.png',
//     image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
//     website: '#',
//     status: 'Active'
//   },
//   {}
// ];