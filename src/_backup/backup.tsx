import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 3D Keycap Component
const Keycap = ({ position, rotation, text, color = '#39FF14' }: any) => {
  const keycapRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (keycapRef.current) {
      keycapRef.current.rotation.x = rotation[0];
      keycapRef.current.rotation.y = rotation[1];
    }
  });

  return (
    <group position={position}>
      <mesh ref={keycapRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0.26, 0]}
        fontSize={0.8}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

// Skills Keyboard Component
const SkillsKeyboard = () => {
  return (
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#39FF14" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Keycap position={[0, 0, 0]} rotation={[0.1, 0.5, 0]} text="K8S" />
      <Keycap position={[-3, 0, 0]} rotation={[0, 0.2, 0]} text="Docker" />
      <Keycap position={[3, 0, 0]} rotation={[0.2, -0.3, 0]} text="AWS" />
      <Keycap position={[0, 0, -3]} rotation={[-0.1, 0, 0]} text="TF" />
      <Keycap position={[0, 0, 3]} rotation={[0.1, 0, 0.1]} text="CI/CD" />
      
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
};

const DevOpsPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const typingInterval = useRef<NodeJS.Timeout>();

  const fullText = "Hi, I'm John Doe";
  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  const techStack = [
    { name: 'Kubernetes', category: 'Container Orchestration', level: 90 },
    { name: 'Docker', category: 'Containerization', level: 95 },
    { name: 'Terraform', category: 'Infrastructure as Code', level: 85 },
    { name: 'AWS', category: 'Cloud Platform', level: 88 },
    { name: 'CI/CD Pipelines', category: 'Automation', level: 92 },
    { name: 'Prometheus/Grafana', category: 'Monitoring', level: 80 },
  ];

  const projects = [
    {
      title: 'Cloud Migration Project',
      description: 'Led migration of 50+ services to Kubernetes on AWS with zero downtime',
      tags: ['AWS', 'Kubernetes', 'Terraform']
    },
    {
      title: 'CI/CD Pipeline', 
      description: 'Designed and implemented automated deployment pipeline reducing release time by 80%',
      tags: ['Jenkins', 'Docker', 'Helm']
    }
  ];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    typingInterval.current = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval.current);
      }
    }, 100);

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Scrollspy for navigation
  useEffect(() => {
    const handleScroll = () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation state for 3D keyboard on skills hover
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      <Head>
        <title>Professional DevOps Portfolio</title>
        <meta name="description" content="Senior DevOps Engineer specializing in cloud infrastructure and automation" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { 
                    dark: '#0a0a0a',
                    neon: '#39FF14',
                    'neon-light': '#66ff66', // Added lighter neon green
                  },
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['Fira Code', 'monospace']
                  },
                  animation: {
                    float: 'float 6s ease-in-out infinite',
                  },
                  keyframes: {
                    float: {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }
                }
              }
            }
          `
        }} />
      </Head>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-neon"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-neon font-mono text-xl font-bold tracking-tight">DEVOPS</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map(section => (
                <motion.div
                  key={section.id}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * sections.indexOf(section) }}
                >
                  <a
                    href={`#${section.id}`}
                    className={`px-1 py-2 font-medium transition-all duration-300 relative ${
                      activeSection === section.id 
                        ? 'text-neon' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {section.name}
                    {activeSection === section.id && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-neon"
                        layoutId="navUnderline"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </a>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-gray-900"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {sections.map(section => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block px-3 py-2 text-base font-medium ${
                      activeSection === section.id 
                        ? 'text-neon bg-gray-800' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                  >
                    {section.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)]"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img
                  src="https://placehold.co/600x600"
                  alt="Professional headshot of DevOps engineer in business casual attire with futuristic digital background elements"
                  className="rounded-lg shadow-2xl border-4 border-neon border-opacity-30 w-full max-w-md mx-auto"
                />
                <motion.div 
                  className="absolute -inset-4 border-2 border-neon border-opacity-20 rounded-lg -z-10"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 text-center md:text-left"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <motion.span 
                  className="text-neon inline-flex"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                >
                  {typedText}
                  <motion.span 
                    className="ml-1 inline-block w-1 h-8 bg-neon"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    |
                  </motion.span>
                </motion.span>
              </h1>
              
              <motion.h2 
                className="text-xl md:text-2xl text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Senior DevOps Engineer & Cloud Architect
              </motion.h2>
              
              <motion.p 
                className="text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                I design, build, and maintain highly available, scalable, and secure cloud infrastructure. 
                With 8+ years of experience automating deployments and optimizing development workflows.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <motion.a 
                  href="#contact" 
                  className="px-6 py-3 bg-neon text-black font-medium rounded hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-neon/30"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
                <motion.a 
                  href="#projects" 
                  className="px-6 py-3 border border-neon text-neon rounded hover:bg-neon hover:bg-opacity-10 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-neon rounded-full flex justify-center items-start p-1">
            <motion.div 
              className="w-1 h-2 bg-neon rounded-full"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-20 bg-gray-900 relative overflow-hidden"
      >
        <motion.div 
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-neon bg-opacity-10 filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-neon bg-opacity-10 filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <span className="text-neon">About</span> <span className="text-white">Me</span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img
                  src="https://placehold.co/800x500" 
                  alt="Infrastructure diagram showing cloud architecture with servers, databases and networking components connected with neon lines"
                  className="rounded-lg shadow-xl w-full"
                />
                <motion.div 
                  className="absolute inset-0 bg-neon bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-700"
                />
                <motion.div 
                  className="absolute -inset-4 border-2 border-neon border-opacity-0 group-hover:border-opacity-30 rounded-lg transition-all duration-700 -z-10"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                Infrastructure Specialist with a Passion for Automation
              </h3>
              <p className="text-gray-400 mb-4">
                As a certified AWS Solutions Architect and Kubernetes Administrator, I've helped organizations 
                transition from traditional infrastructure to modern cloud-native solutions. My approach combines 
                technical expertise with business acumen to deliver cost-effective, high-performance solutions.
              </p>
              <p className="text-gray-400 mb-6">
                I specialize in building CI/CD pipelines, infrastructure as code implementations, and SRE practices 
                that improve system reliability while reducing operational overhead.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="border-l-2 border-neon pl-4 hover:bg-gray-800/30 transition-all duration-300 rounded"
                  whileHover={{ x: 5 }}
                >
                  <h4 className="text-neon font-medium mb-2">Education</h4>
                  <p className="text-gray-400">MS in Computer Science</p>
                  <p className="text-gray-400">Stanford University, 2014</p>
                </motion.div>
                
                <motion.div 
                  className="border-l-2 border-neon pl-4 hover:bg-gray-800/30 transition-all duration-300 rounded"
                  whileHover={{ x: 5 }}
                >
                  <h4 className="text-neon font-medium mb-2">Certifications</h4>
                  <p className="text-gray-400">AWS Certified Solutions Architect</p>
                  <p className="text-gray-400">CKA, CKAD, Terraform Certified</p>
                </motion.div>
              </div>
              
              <motion.a 
                href="#" 
                className="inline-flex items-center text-neon hover:text-white transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <span className="mr-2 group-hover:mr-3 transition-all duration-300">Download Full Resume</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className="py-20 bg-black relative overflow-hidden"
        onMouseEnter={toggleAnimation}
        onMouseLeave={toggleAnimation}
      >
        <div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10"
          data-aos="fade"
          data-aos-delay="100"
        />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <span className="text-neon">Technical</span> <span className="text-white">Skills</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="h-96"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <SkillsKeyboard />
            </motion.div>
            
            <div className="space-y-6">
              {techStack.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-neon transition-all duration-500 hover:shadow-lg hover:shadow-neon/10 group"
                  data-aos="fade-left"
                  data-aos-delay={200 + (index * 50)}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-neon group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 group-hover:text-white transition-colors duration-300">
                    {skill.category}
                  </p>
                  <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                      className="bg-neon h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-aos="fade-down"
          >
            <span className="text-neon">Recent</span> <span className="text-white">Projects</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="bg-black p-6 rounded-lg border border-gray-800 hover:border-neon transition-all duration-500 group overflow-hidden relative"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.img
                  src="https://placehold.co/800x450" 
                  alt={`Project screenshot showing ${project.title} implementation with infrastructure diagram`}
                  className="w-full h-48 object-cover rounded-t-lg mb-6 transform transition-all duration-500 group-hover:scale-105"
                />
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 group-hover:text-white transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <motion.span 
                      key={i} 
                      className="text-xs px-2 py-1 bg-gray-800 text-neon rounded"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-neon hover:text-white transition-all duration-300 text-sm group/view"
                >
                  <span className="mr-1 group-hover/view:mr-2 transition-all duration-300">
                    View Case Study
                  </span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover/view:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-aos="fade-down"
          >
            <span className="text-neon">Get In</span> <span className="text-white">Touch</span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
              className="md:w-1/2"
              data-aos="fade-right"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Have a project in mind or want to discuss potential opportunities? 
                Feel free to reach out - I'd love to hear from you!
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-neon mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Email</h4>
                    <a 
                      href="mailto:contact@example.com" 
                      className="text-white hover:text-neon transition-colors duration-300"
                    >
                      contact@example.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="150"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-neon mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Phone</h4>
                    <a 
                      href="tel:+1234567890" 
                      className="text-white hover:text-neon transition-colors duration-300"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-neon mr-4 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Location</h4>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-12"
                data-aos="fade-right"
                data-aos-delay="250"
              >
                <h4 className="text-xl font-bold mb-4 text-white">Connect With Me</h4>
                <div className="flex space-x-4">
                  {['github', 'linkedin', 'twitter'].map((social, i) => (
                    <motion.a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-neon hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      data-aos="fade"
                      data-aos-delay={300 + (i * 100)}
                    >
                      <span className="sr-only">{social}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="md:w-1/2"
              data-aos="fade-left"
            >
              <form className="space-y-8">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-neon focus:outline-none text-white rounded transition-all duration-300 hover:shadow-md hover:shadow-neon/10"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-neon focus:outline-none text-white rounded transition-all duration-300 hover:shadow-md hover:shadow-neon/10"
                      placeholder="Your email"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-neon focus:outline-none text-white rounded transition-all duration-300 hover:shadow-md hover:shadow-neon/10"
                    placeholder="Subject"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-neon focus:outline-none text-white rounded transition-all duration-300 hover:shadow-md hover:shadow-neon/10"
                    placeholder="Your message"
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-neon text-black font-bold rounded hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-neon/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-neon font-mono text-2xl font-bold mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              DEVOPS ENGINEER
            </motion.span>
            
            <motion.p 
              className="text-gray-400 mt-2 mb-8 max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              Building scalable, reliable, and efficient infrastructure solutions.
            </motion.p>
            
            <div className="flex justify-center space-x-6 mb-6">
              {['github', 'linkedin', 'twitter', 'email'].map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-neon transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </motion.a>
              ))}
            </div>
            
            <motion.p 
              className="text-gray-500 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} Professional DevOps Portfolio. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Floating action button */}
      <motion.button 
        className="fixed bottom-8 right-8 w-12 h-12 bg-neon text-black rounded-full flex items-center justify-center shadow-2xl z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
);
};

export default DevOpsPortfolio;
