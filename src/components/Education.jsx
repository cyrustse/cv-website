import { useState, useEffect } from 'react';

const Education = ({ data }) => {
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

    const element = document.getElementById('education');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section bg-hacker-dark/30">
      <div className="container">
        <h2 className="section-title">{data.education.title}</h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {data.education.items.map((edu, index) => (
            <div
              key={index}
              className={`card flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-hacker-gray rounded-lg flex items-center justify-center text-hacker-green font-mono font-bold shrink-0 group-hover:bg-hacker-green group-hover:text-hacker-black transition-colors">
                  {index === 0 ? '01' : '10'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-hacker-green transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {edu.school}
                  </p>
                </div>
              </div>
              <div className="font-mono text-sm text-hacker-green bg-hacker-gray/50 px-4 py-2 rounded-full shrink-0">
                {edu.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
