import React, { useState, useRef, useEffect } from 'react';
import mermaid from 'mermaid';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Code, Download } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'Inter, sans-serif',
});

const MermaidDiagram = ({ chart }) => {
  const [svgUrl, setSvgUrl] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (chart && ref.current && !showCode) {
        try {
            mermaid.run({
                nodes: [ref.current],
            }).then(() => {
                const svgElement = ref.current.querySelector('svg');
                if (svgElement) {
                    const svgData = new XMLSerializer().serializeToString(svgElement);
                    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                    setSvgUrl(URL.createObjectURL(svgBlob));
                }
            }).catch(e => console.error("Mermaid Render Error", e));
        } catch (e) {
            console.error("Mermaid Sync Error", e);
        }
    }
  }, [chart, showCode]);

  return (
    <div className="my-6 relative group flex flex-col gap-2">
      <div className="flex justify-end px-2">
        <button 
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-orange-400 transition-colors bg-[#1E1F29] px-2 py-1 rounded-md border border-white/5 shadow-sm"
        >
            <Code size={12} />
            {showCode ? "Hide Source" : "View Source"}
        </button>
      </div>

      <div className="bg-[#11121a] p-6 rounded-2xl border border-white/10 overflow-hidden relative min-h-[150px]">
        {!showCode ? (
            <Zoom>
                <div 
                  ref={ref} 
                  className="mermaid-wrapper w-full h-full flex items-center justify-center text-sm overflow-x-auto" 
                >
                    {chart}
                </div>
            </Zoom>
        ) : (
            <pre className="text-xs text-orange-200/80 overflow-x-auto font-mono whitespace-pre-wrap">
                {chart}
            </pre>
        )}
        
        {svgUrl && !showCode && (
            <a 
                href={svgUrl} 
                download={`diagram-${Date.now()}.svg`}
                className="absolute top-4 right-4 p-2 bg-[#1E1F29] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-orange-500/50 transition-all opacity-0 group-hover:opacity-100"
                title="Download SVG"
            >
                <Download size={16} />
            </a>
        )}
      </div>
    </div>
  );
};

export default MermaidDiagram;