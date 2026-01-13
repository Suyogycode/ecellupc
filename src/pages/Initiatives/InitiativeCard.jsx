import { motion } from 'framer-motion';
import { Trophy, Users, Globe, ArrowRight, Calendar } from 'lucide-react';

const StatBadge = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
    <div className={`p-3 rounded-full bg-gradient-to-br ${color} bg-opacity-20`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  </div>
);

const InitiativeCard = ({ data }) => {
  return (
    // FIX 1: Added 'overflow-y-auto' so the card becomes scrollable if shrinked.
    // FIX 2: Added 'pb-24' (Padding Bottom) so the last text isn't cut off by the phone's edge.
    // FIX 3: Added 'pr-2' to prevent the scrollbar from overlapping text.
    <div className="h-full overflow-y-auto pr-2 pb-24 no-scrollbar">
      
      {/* Header with Dynamic Gradient Text */}
      <div className="mb-8">
        <motion.h2 
          className="text-3xl md:text-5xl font-display font-bold text-white mb-2" // Reduced text size slightly for mobile
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {data.title}
        </motion.h2>
        <motion.p 
          className={`text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r ${data.color}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {data.tagline}
        </motion.p>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StatBadge icon={Trophy} label="Participation" value={data.stats.participation} color={data.color} />
        <StatBadge icon={Users} label="Attendents" value={data.stats.attendents} color={data.color} />
        <StatBadge icon={Globe} label="Opportunity" value={data.stats.opportunity} color={data.color} />
      </motion.div>

      {/* Description & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              {data.description}
            </p>
          </div>
          
          <button className={`group px-8 py-4 rounded-xl bg-gradient-to-r ${data.color} text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2`}>
            Know more
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Mini Timeline Sidebar */}
        <motion.div 
          className="bg-white/5 rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-accent" /> Timeline
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm">
              <span className="text-gray-500">Aug 15</span>
              <span className="text-gray-300">Registrations Open</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-gray-500">Oct 20</span>
              <span className="text-gray-300">Submission Deadline</span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-gray-500">Feb 04</span>
              <span className="text-gray-300 font-bold text-accent">Grand Finale</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default InitiativeCard;