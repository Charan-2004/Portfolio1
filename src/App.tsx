import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';
import './index.css';

const MagneticButton = ({ children, href, className, style }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: any) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.3);
    y.set(yPos * 0.3);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, x: springX, y: springY, display: 'inline-flex' }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
};

// --- DATA ---
const PROCESS = [
  { step: "01", name: "Problem", desc: "Defining the core constraints, user pain points, and primary business objectives." },
  { step: "02", name: "Research", desc: "Conducting competitor analysis, user interviews, and gathering quantitative data." },
  { step: "03", name: "Wireframes", desc: "Mapping out the information architecture and low-fidelity structural layouts." },
  { step: "04", name: "UI Design", desc: "Executing high-fidelity visual design, typography systems, and interaction models." },
  { step: "05", name: "Development", desc: "Translating the visual design into pixel-perfect, highly performant code." },
  { step: "06", name: "Result", desc: "Final handoff, deployment, and measuring the impact against initial goals." }
];

const EXPERIENCE = [
  { 
    role: "Technical Support Engineer", 
    company: "Unify CX", 
    date: "Sep 2025 - Jun 2026",
    details: [
      "Provided high-tier technical support and troubleshooting for US-based clients, ensuring rapid resolution of complex software and platform issues.",
      "Developed a strong understanding of end-user pain points and product usability issues, providing critical feedback to improve overall customer experience (CX)."
    ]
  },
  { 
    role: "UI/UX & Data Analytics Intern", 
    company: "Rooman Technologies", 
    date: "Sep 2024 - Apr 2025",
    details: [
      "Developed interactive data dashboards and visualizations, translating complex backend datasets into intuitive, accessible user interfaces for business stakeholders.",
      "Collaborated with cross-functional teams to integrate data science workflows into frontend environments, ensuring seamless and engaging user experiences."
    ]
  }
];

const SKILLS = [
  {
    category: "Design & UI/UX",
    items: ["Figma", "Webflow", "Wireframing", "Rapid Prototyping", "Design Systems", "Micro-interactions"]
  },
  {
    category: "Frontend Development",
    items: ["HTML5", "CSS3", "Flexbox & Grid", "JavaScript"]
  },
  {
    category: "Backend & Automation",
    items: ["Python", "Selenium", "Flask", "REST APIs", "MySQL"]
  },
  {
    category: "Webflow Expert",
    items: ["CMS", "Interactions", "Responsive Design", "Client First", "GSAP", "Finsweet Attributes", "SEO", "Performance"]
  }
];

const EDUCATION = [
  {
    school: "Vidya Vikas Institute of Engineering and Technology",
    degree: "Electronics and Communication Engineering",
    date: "2021 - 2025",
    cgpa: "7.57"
  }
];

const ACHIEVEMENTS = [
  "Paper Publication on Helical Antenna Design - International Journal of Creative Research Thoughts",
  "Led organic marketing campaigns for Chathere.online through community outreach and user acquisition initiatives."
];

const PROJECTS = [
  {
    title: "Nexus API Platform",
    tags: ["SaaS", "Webflow", "UI/UX"],
    desc: "Designed and built a high-converting SaaS landing page for an enterprise API infrastructure product. Implemented a custom terminal code block UI and responsive bento grid feature layouts.",
    link: "https://tests-dapper-site-8bec9f.webflow.io/",
    img: "/nexus.png"
  },
  {
    title: "Zero-Degree Brewery",
    tags: ["Hospitality", "Webflow", "Design System"],
    desc: "Designed and developed a premium, multi-page hospitality website featuring an 'Industrial Craft' design system with deep charcoal and warm amber aesthetics.",
    link: "https://zero-degree-brewery.webflow.io",
    img: "/zerodegree.png"
  },
  {
    title: "Kairos Storefront",
    tags: ["E-Commerce", "Webflow"],
    desc: "Developed a highly functional e-commerce storefront optimized for user experience, product visibility, and intuitive user navigation flows. Focused on clean typography and whitespace.",
    link: "https://kairos-e1139c.webflow.io",
    img: "/kairos.png"
  },
  {
    title: "AutoApplyAI",
    tags: ["Python", "Automation", "Selenium"],
    desc: "A powerful workflow automation tool built to streamline the job application process using Python, Selenium, and advanced DOM manipulation techniques.",
    link: "#",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=800"
  }
];

const EasterEggI = ({ setHover }: { setHover: (val: boolean) => void }) => (
  <span 
    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)}
    style={{ cursor: 'crosshair', display: 'inline-block' }}
  >
    i
  </span>
);

function App() {
  const [isHoveringEasterEgg, setIsHoveringEasterEgg] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener('mousemove', moveCursor);

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="app-container">
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          scale: isHoveringEasterEgg ? 8 : 1,
          opacity: isHoveringEasterEgg ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />

      <div className="content-wrapper">
        {/* Navigation */}
        <header>
          <div className="container nav-content">
            <div className="logo">Charan KY</div>
            <nav className="nav-links">
              <a href="#work" className="nav-link">Work</a>
              <a href="#process" className="nav-link">Process</a>
              <a href="#skills" className="nav-link">Expertise</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
            <div className="container" style={{ width: '100%' }}>
              <motion.h1 
                className="title-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Bu<EasterEggI setHover={setIsHoveringEasterEgg}/>ld<EasterEggI setHover={setIsHoveringEasterEgg}/>ng d<EasterEggI setHover={setIsHoveringEasterEgg}/>g<EasterEggI setHover={setIsHoveringEasterEgg}/>tal<br/>
                exper<EasterEggI setHover={setIsHoveringEasterEgg}/>ences that convert.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '48px', fontWeight: 500 }}
              >
                UI/UX Engineer and Frontend Developer passionate about bridging the gap between design and engineering using modern frameworks.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <MagneticButton href="#work" className="btn-primary">
                  View My Work <ArrowUpRight size={20} />
                </MagneticButton>
              </motion.div>
            </div>
          </section>

          {/* Selected Works */}
          <section id="work" className="section container">
            <div className="section-title">
              <span className="section-subtitle">01 / Portfolio</span>
              <h2>Selected Works</h2>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <motion.a 
                  href={project.link} target="_blank" rel="noreferrer"
                  key={index}
                  className="project-card"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: index * 0.1, type: "spring", damping: 20 }}
                >
                  <div className="project-img" style={{ overflow: 'hidden' }}>
                    <motion.img 
                      src={project.img} 
                      alt={project.title} 
                      style={{ y: yParallax, scale: 1.15 }}
                    />
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          {/* The Process */}
          <section id="process" className="section container">
            <div className="section-title">
              <span className="section-subtitle">02 / Methodology</span>
              <h2>The Process</h2>
            </div>

            <div className="process-grid">
              {PROCESS.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="process-step"
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: index * 0.15, type: "spring", damping: 20 }}
                >
                  <span className="process-number">{step.step}</span>
                  <h3 className="process-name">{step.name}</h3>
                  <p className="process-desc">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section container">
            <div className="section-title">
              <span className="section-subtitle">03 / Expertise</span>
              <h2>Technical Skills</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
              
              {SKILLS.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  className="list-item"
                  style={{ padding: '32px' }}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: index * 0.15, type: "spring", damping: 15 }}
                >
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>{skillGroup.category}</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="tag">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience & Education Grid */}
          <section id="experience" className="section container" style={{ paddingBottom: '160px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
              
              {/* Experience */}
              <div>
                <div className="section-title">
                  <span className="section-subtitle">04 / Journey</span>
                  <h2>Experience</h2>
                </div>
                <div className="list-container">
                  {EXPERIENCE.map((exp, index) => (
                    <motion.div 
                      key={index} className="list-item"
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", damping: 20 }}
                    >
                      <div className="list-header">
                        <div>
                          <h3 className="list-role">{exp.role}</h3>
                          <p className="list-org">{exp.company}</p>
                        </div>
                        <div className="list-date">{exp.date}</div>
                      </div>
                      <ul className="list-details">
                        {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education & Achievements */}
              <div>
                <div className="section-title">
                  <span className="section-subtitle">05 / Background</span>
                  <h2>Education</h2>
                </div>
                <div className="list-container" style={{ marginBottom: '60px' }}>
                  {EDUCATION.map((edu, index) => (
                    <motion.div 
                      key={index} className="list-item"
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", damping: 20 }}
                    >
                      <div className="list-header">
                        <div>
                          <h3 className="list-role">{edu.degree}</h3>
                          <p className="list-org">{edu.school}</p>
                        </div>
                        <div className="list-date">{edu.date}</div>
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>CGPA: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{edu.cgpa}</span></p>
                    </motion.div>
                  ))}
                </div>

                <div className="section-title" style={{ marginBottom: '32px' }}>
                  <h2>Achievements</h2>
                </div>
                <div className="list-container">
                  {ACHIEVEMENTS.map((achieve, index) => (
                    <motion.div 
                      key={index} className="list-item" style={{ padding: '24px 32px' }}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: index * 0.15, type: "spring", damping: 20 }}
                    >
                      <p style={{ fontWeight: '500', margin: 0, color: 'inherit' }}>{achieve}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
            </div>
          </section>
        </main>
      </div>

      {/* Sticky Reveal Footer */}
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginBottom: '8px' }}>Charan KY.</h2>
              <p>Designing and building extraordinary digital experiences. Let's create something impactful together.</p>
              <MagneticButton href="mailto:kycharan3@gmail.com" className="btn-primary btn-white" style={{ padding: '16px 36px' }}>
                Let's Talk <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
            
            <div className="footer-col">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#work" className="footer-link">Selected Works</a></li>
                <li><a href="#process" className="footer-link">The Process</a></li>
                <li><a href="#skills" className="footer-link">Expertise</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3>Connect</h3>
              <ul>
                <li><a href="https://www.linkedin.com/in/charan-ky-349a83249/" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a></li>
                <li><a href="https://github.com/Charan-2004" target="_blank" rel="noreferrer" className="footer-link">GitHub</a></li>
                <li><a href="mailto:kycharan3@gmail.com" className="footer-link">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Charan K Y. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
