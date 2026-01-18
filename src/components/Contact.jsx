import { useState, useEffect } from 'react';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
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

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">{data.contact.title}</h2>
        
        <div className={`grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {data.contact.text}
            </p>
            
            <div className="space-y-4 mb-8">
              <a
                href={`mailto:${data.profile.email}`}
                className="flex items-center gap-4 text-gray-300 hover:text-hacker-green transition-colors group"
              >
                <div className="w-12 h-12 bg-hacker-gray rounded-lg flex items-center justify-center text-hacker-green group-hover:bg-hacker-green group-hover:text-hacker-black transition-colors shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-mono text-sm">{data.profile.email}</span>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-hacker-gray rounded-lg flex items-center justify-center text-hacker-green shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-mono text-sm">{data.profile.location}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {data.profile.social.linkedin && (
                <a
                  href={data.profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-hacker-gray rounded-lg flex items-center justify-center text-gray-400 hover:text-hacker-green hover:bg-hacker-gray-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              {data.profile.social.website && (
                <a
                  href={data.profile.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-hacker-gray rounded-lg flex items-center justify-center text-gray-400 hover:text-hacker-green hover:bg-hacker-gray-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
              {data.profile.social.twitter && (
                <a
                  href={data.profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-hacker-gray rounded-lg flex items-center justify-center text-gray-400 hover:text-hacker-green hover:bg-hacker-gray-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  {data.contact.form.labels.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-hacker-gray border border-hacker-gray-light rounded-lg px-4 py-3 text-white focus:border-hacker-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                  {data.contact.form.labels.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-hacker-gray border border-hacker-gray-light rounded-lg px-4 py-3 text-white focus:border-hacker-green focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">
                {data.contact.form.labels.subject}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-hacker-gray border border-hacker-gray-light rounded-lg px-4 py-3 text-white focus:border-hacker-green focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">
                {data.contact.form.labels.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-hacker-gray border border-hacker-gray-light rounded-lg px-4 py-3 text-white focus:border-hacker-green focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`btn-primary w-full ${status === 'success' ? 'bg-hacker-green text-hacker-black' : ''}`}
            >
              {status === 'sending'
                ? data.contact.form.messages.sending
                : status === 'success'
                ? data.contact.form.messages.success
                : data.contact.form.labels.submit
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
