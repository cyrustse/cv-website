const Footer = ({ data }) => {
  return (
    <footer className="bg-hacker-dark border-t border-hacker-gray py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {data.footer.copyright}
            </p>
            <p className="text-hacker-green font-mono text-xs mt-1">
              {data.footer.tagline}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
            <span>Built with</span>
            <span className="text-hacker-green">React</span>
            <span>+</span>
            <span className="text-hacker-green">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
