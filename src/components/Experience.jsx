import { useState, useEffect } from 'react';

const Experience = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const calculateDuration = (fromDate, toDate) => {
    const fromYear = parseInt(fromDate);
    const toYear = toDate === 'Present' ? new Date().getFullYear() : parseInt(toDate);
    const years = toYear - fromYear;
    
    if (years === 0) return '< 1 year';
    if (years === 1) return '1 year';
    return `${years} years`;
  };

  const handleTechClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">{data.experience.title}</h2>
        
        <div className="max-w-4xl mx-auto">
          {data.experience.items.map((item, index) => (
            <div
              key={index}
              className={`relative pl-8 pb-8 last:pb-0 border-l border-hacker-gray hover:border-hacker-green/50 transition-colors ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.5s ease-out' }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-hacker-black border-2 border-hacker-green"></div>
              
              <div 
                className="card cursor-pointer group hover:border-hacker-green/50 transition-all"
                onClick={() => toggleItem(index)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-hacker-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-hacker-green font-mono text-sm mt-1">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className="font-mono text-xs text-gray-500 bg-hacker-gray px-3 py-1 rounded-full">
                      {item.fromDate} - {item.toDate}
                    </span>
                    <span className="font-mono text-xs text-hacker-green bg-hacker-green/10 px-3 py-1 rounded-full">
                      {calculateDuration(item.fromDate, item.toDate)}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedItems[index] ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                {/* Tech Stack - Show in collapsed view (limited) */}
                {!expandedItems[index] && (
                  <div className="flex flex-wrap gap-2 mt-4" onClick={handleTechClick}>
                    {item.tech.map((tech, tIndex) => (
                      <span key={tIndex} className="tech-tag text-xs cursor-default opacity-70">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {expandedItems[index] && (
                  <div className="pt-4 border-t border-hacker-gray/50 space-y-4" onClick={handleTechClick}>
                    {/* Full Tech Stack */}
                    <div>
                      <span className="font-mono text-xs text-gray-500 mb-2 block">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech, tIndex) => (
                          <span key={tIndex} className="tech-tag text-xs bg-hacker-green/10 border-hacker-green/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-3">
                      <span className="font-mono text-xs text-gray-500 block">Key Achievements</span>
                      {item.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start gap-3">
                          <span className="text-hacker-green mt-0.5">▸</span>
                          <span className="text-sm text-gray-300 leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
