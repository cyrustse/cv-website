import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import cvData from './data/cv.json';

function App() {
  return (
    <div className="bg-hacker-black min-h-screen">
      <Navbar data={cvData} />
      <main>
        <Hero data={cvData} />
        <About data={cvData} />
        <Certifications data={cvData} />
        <Experience data={cvData} />
        <Skills data={cvData} />
        <Projects data={cvData} />
        <Education data={cvData} />
        <Contact data={cvData} />
      </main>
      <Footer data={cvData} />
    </div>
  );
}

export default App;
