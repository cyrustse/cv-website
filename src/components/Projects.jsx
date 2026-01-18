import { useState, useEffect } from 'react';

const Projects = ({ data }) => {
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

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">{data.projects.title}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.projects.items.map((project, index) => (
            <div
              key={index}
              className={`card group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-hacker-gray rounded-lg flex items-center justify-center text-hacker-green font-mono font-bold shrink-0 group-hover:bg-hacker-green group-hover:text-hacker-black transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hacker-green hover:text-hacker-green-dim transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-hacker-green transition-colors line-clamp-2">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map((tech, tIndex) => (
                  <span key={tIndex} className="tech-tag text-xs py-1 px-2">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="tech-tag text-xs py-1 px-2 text-gray-500">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-hacker-green text-sm font-mono hover:gap-3 transition-all mt-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.linkText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
