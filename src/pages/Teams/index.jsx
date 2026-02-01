import { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { TEAMS_BY_YEAR } from '../../data/MockData';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TeamCard = ({ member }) => {
    return (
        <div className="relative w-full overflow-hidden cursor-pointer group h-100 rounded-2xl">
            {/* Image */}
            <img
                src={member.image}
                alt={member.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 grayscale-0 md:grayscale md:group-hover:grayscale-0"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-80"></div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="mb-1 text-2xl font-bold text-white">{member.name}</h3>
                <p className="mb-2 font-medium text-accent">{member.role}</p>
                {member.team === 'IIC UPC' && <p className="mb-4 text-sm text-gray-300">{member.team}</p>}

                {/* Hidden Social Icons */}
                <div className="flex gap-4 transition-opacity duration-300 delay-100 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <a href={member.linkedin} className="p-3 text-white transition-colors rounded-full bg-white/10 hover:bg-blue-600 hover:text-white backdrop-blur-md">
                        <Linkedin size={20} />
                    </a>
                    <a href={`mailto:${member.email}`} className="p-3 text-white transition-colors rounded-full bg-white/10 hover:bg-accent hover:text-primary-dark backdrop-blur-md">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

const Teams = () => {
    const [activeYear, setActiveYear] = useState('2024-25');

    const years = Object.keys(TEAMS_BY_YEAR);
    const currentData = TEAMS_BY_YEAR[activeYear];

    const renderTeamSection = (title, members) => {
        if (!members || members.length === 0) return null;

        return (
            <div className="mb-16">
                <h3 className="mb-8 text-3xl font-bold text-center text-white font-display">
                    <span className="text-accent">{title}</span>
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {members.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        );
    };

    const renderTeamGroup = (teamName, teamData) => {
        if (!teamData) return null;

        const memberCount = teamData.members ? teamData.members.length : 0;
        const totalCount = memberCount + 1; // +1 for head

        // If only head and 1 member, show them side by side centered
        if (memberCount === 1) {
            return (
                <div key={teamName} className="mb-16">
                    <h3 className="mb-8 text-3xl font-bold text-center text-white font-display">
                        <span className="text-accent">{teamData.head.team}</span>
                    </h3>

                    {/* Head and Single Member - Side by Side Centered */}
                    <div className="flex justify-center">
                        <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
                            <TeamCard member={teamData.head} />
                            <TeamCard member={teamData.members[0]} />
                        </div>
                    </div>
                </div>
            );
        }

        // For all other cases (no members, or 2+ members)
        return (
            <div key={teamName} className="mb-16">
                <h3 className="mb-8 text-3xl font-bold text-center text-white font-display">
                    <span className="text-accent">{teamData.head.team}</span>
                </h3>

                {/* All team members including head - centered grid */}
                <div className="flex justify-center">
                    <div className={`grid gap-6 ${totalCount === 1 ? 'grid-cols-1 w-full sm:w-64 md:w-60 lg:w-56' :
                        totalCount === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl' :
                            totalCount === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl' :
                                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl'
                        }`}>
                        {/* Head */}
                        <TeamCard member={teamData.head} />

                        {/* Members */}
                        {teamData.members && teamData.members.map((member) => (
                            <TeamCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen px-6 pb-20 bg-primary-dark pt-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-white md:text-6xl font-display">
                        Meet the <span className="text-accent">Minds</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-400">
                        A dedicated team of students working tirelessly to create an impact.
                    </p>
                </div>

                {/* Year Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeYear === year
                                ? 'bg-accent text-primary-dark shadow-lg scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Teams Display in Hierarchy */}
                <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* IIC Heads */}
                    {renderTeamSection('IIC Leadership', currentData.iicHeads)}

                    {/* E-Cell Leadership */}
                    {renderTeamSection('E-Cell Leadership', currentData.ecellLeadership)}

                    {/* Team-wise Groups */}
                    {currentData.teams && Object.keys(currentData.teams).map((teamKey) =>
                        renderTeamGroup(teamKey, currentData.teams[teamKey])
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Teams;
