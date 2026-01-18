import { useState, useEffect } from 'react';

const About = ({ data }) => {
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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section bg-hacker-dark/30">
      <div className="container">
        <h2 className="section-title">{data.about.title}</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-hacker-green font-mono mb-8 leading-relaxed text-center">
            {data.about.lead}
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {data.about.stats.map((stat, index) => (
              <div
                key={index}
                className={`card text-center group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-hacker-green mb-2 font-mono">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          <div className="card mb-8">
            <div className="space-y-5 text-gray-400 leading-relaxed">
              {data.about.description.map((desc, index) => (
                <p key={index}>
                  {desc}
                </p>
              ))}
            </div>
          </div>
          
          {/* Languages Section */}
          {data.about.languages && (
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
            >
              <h3 className="font-mono text-sm text-gray-500 mb-4 uppercase tracking-wider">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {data.about.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-hacker-gray border border-hacker-gray-light px-4 py-2 rounded-lg"
                  >
                    <span className="text-white font-medium">{lang.name}</span>
                    <span className="text-hacker-green font-mono text-xs">• {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
