import { useState, useEffect } from 'react';

const Certifications = ({ data }) => {
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

    const element = document.getElementById('certifications');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="section bg-hacker-dark/30">
      <div className="container">
        <h2 className="section-title">{data.certifications.title}</h2>
        
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {data.certifications.items.map((cert, index) => (
            <div
              key={index}
              className={`card group cursor-default transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-hacker-gray rounded-lg flex items-center justify-center text-hacker-green font-mono font-bold text-sm shrink-0 group-hover:bg-hacker-green group-hover:text-hacker-black transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-hacker-green transition-colors truncate">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {cert.issuer}
                  </p>
                </div>
                <div className="font-mono text-xs text-hacker-green bg-hacker-green/10 px-3 py-1 rounded-full shrink-0">
                  {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
