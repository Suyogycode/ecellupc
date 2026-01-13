import { Linkedin, Mail } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/MockData';

const TeamCard = ({ member }) => {
  return (
    <div className="group relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer">
      {/* Image */}
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-0 md:grayscale md:group-hover:grayscale-0"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-80 transition-opacity duration-300"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-accent font-medium mb-4">{member.role}</p>
        
        {/* Hidden Social Icons */}
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
          <a href={member.linkedin} className="p-3 bg-white/10 rounded-full hover:bg-blue-600 hover:text-white text-white transition-colors backdrop-blur-md">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${member.email}`} className="p-3 bg-white/10 rounded-full hover:bg-accent hover:text-primary-dark text-white transition-colors backdrop-blur-md">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamGrid = () => {
  return (
    <section className="py-24 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Meet the <span className="text-accent">Minds</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A dedicated team of students working tirelessly to create an impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;