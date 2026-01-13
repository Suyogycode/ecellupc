import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, 
  Linkedin, Instagram, Facebook, Twitter, Youtube, MessageCircle, 
  ExternalLink, ArrowUpRight 
} from 'lucide-react';

// --- 1. CONFIGURATION DATA ---
const SOCIALS = [
  { 
    id: "linkedin",
    name: "LinkedIn", 
    handle: "E-Cell UPC",
    link: "https://www.linkedin.com/company/e-cell-upcollege", 
    icon: Linkedin, 
    color: "group-hover:bg-[#0077b5]", 
    gradient: "from-blue-400/20 to-blue-600/20"
  },
  { 
    id: "instagram",
    name: "Instagram", 
    handle: "@ecell_upc",
    link: "https://www.instagram.com/ecell_upcollege/", 
    icon: Instagram, 
    color: "group-hover:bg-pink-600", 
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  { 
    id: "youtube",
    name: "YouTube", 
    handle: "E-Cell UPC",
    link: "https://youtube.com", 
    icon: Youtube, 
    color: "group-hover:bg-[#FF0000]", 
    gradient: "from-red-500/20 to-orange-500/20"
  },
  { 
    id: "twitter",
    name: "X (Twitter)", 
    handle: "@ecell_upc",
    link: "https://twitter.com", 
    icon: Twitter, 
    color: "group-hover:bg-black", 
    gradient: "from-gray-500/20 to-gray-700/20"
  },
  { 
    id: "facebook",
    name: "Facebook", 
    handle: "E-Cell UPC",
    link: "https://www.facebook.com/Ecell.upcollege/", 
    icon: Facebook, 
    color: "group-hover:bg-[#1877F2]", 
    gradient: "from-blue-400/20 to-cyan-500/20"
  },
  { 
    id: "whatsapp",
    name: "WhatsApp", 
    handle: "Community Channel",
    link: "https://whatsapp.com", 
    icon: MessageCircle, 
    color: "group-hover:bg-[#25D366]", 
    gradient: "from-green-400/20 to-emerald-600/20"
  },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "connect@ecell.in",
    action: "mailto:connect@ecell.in"
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    action: "tel:+919876543210"
  }
];

// --- 2. SUB-COMPONENTS ---

const SocialCard = ({ platform, index }) => (
  <motion.a
    href={platform.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:-translate-y-1 transition-all duration-300"
  >
    {/* Hover Gradient Background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

    <div className="relative z-10 flex justify-between items-start">
      <div className={`p-3 rounded-full bg-white/5 text-white ${platform.color} transition-colors duration-300`}>
        <platform.icon size={24} />
      </div>
      <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
    </div>

    <div className="relative z-10 mt-8">
      <h3 className="text-white font-bold text-lg">{platform.name}</h3>
      <p className="text-gray-400 text-sm group-hover:text-white/80 transition-colors">{platform.handle}</p>
    </div>
  </motion.a>
);

const ContactCard = ({ info }) => (
  <a 
    href={info.action}
    className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group"
  >
    <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary-dark transition-colors">
      <info.icon size={24} />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{info.label}</p>
      <p className="text-white font-bold text-lg">{info.value}</p>
    </div>
  </a>
);

// --- 3. MAIN COMPONENT ---

const Contact = () => {
  return (
    <div className="min-h-screen relative pt-28 pb-20 px-6 font-sans">
      
      {/* 1. FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://content.jdmagicbox.com/comp/varanasi/28/0542p542std1402828/catalogue/uday-pratap-college-bhojpur-varanasi-colleges-2zobq4h.jpg" 
          alt="Campus Background" 
          className="w-full h-full object-cover blur-sm opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-primary-dark/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm"
          >
            <span className="text-accent text-xs font-bold uppercase tracking-widest">24/7 Connectivity</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">Touch</span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you are a student, investor, or startup enthusiast, we are just one click away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Social Grid (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span> Social Hub
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOCIALS.map((platform, index) => (
                <SocialCard key={platform.id} platform={platform} index={index} />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Direct Info & Map (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Direct Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span> Direct Line
              </h3>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map((info) => (
                  <ContactCard key={info.label} info={info} />
                ))}
              </div>
            </div>

            {/* Glass Map Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-grow rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden relative min-h-[300px] group"
            >
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                 <span className="text-xs font-bold text-white flex items-center gap-1">
                   <MapPin size={12} className="text-accent" /> IIC, UP College
                 </span>
              </div>

              {/* Interactive Google Map Embed */}
              <iframe 
                src="https://maps.google.com/maps?q=Udai+Pratap+Autonomous+College+Varanasi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} // Dark Mode Map Style
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;