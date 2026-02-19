import React from 'react';

const SuggestionChip = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1E1F29] hover:bg-[#2A2B36] border border-white/5 hover:border-orange-500/30 rounded-xl text-xs font-medium text-gray-300 transition-all cursor-pointer group w-full active:scale-95"
  >
    <span className="text-gray-500 group-hover:text-orange-400 transition-colors shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

export default SuggestionChip;