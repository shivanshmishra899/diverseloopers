
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showTrainerTip, setShowTrainerTip] = useState(false);

  // Trainer tips data
  const trainerTips = [
    {
      avatar: "https://readdy.ai/api/search-image?query=Professional%20female%20trainer%20with%20headset%2C%20friendly%20smile%2C%20modern%20classroom%20setting%2C%20diverse%20students%20in%20background%2C%20educational%20environment%2C%20warm%20lighting%2C%20contemporary%20design&width=80&height=80&seq=trainer-1&orientation=squarish",
      name: "Dr. Sarah Martinez",
      role: "Lead Technical Trainer",
      tip: "💡 Pro Tip: Practice coding for just 30 minutes daily - consistency beats intensity every time!"
    },
    {
      avatar: "https://readdy.ai/api/search-image?query=Experienced%20male%20business%20mentor%2C%20professional%20attire%2C%20consulting%20office%20background%2C%20confident%20expression%2C%20modern%20workspace%2C%20professional%20lighting&width=80&height=80&seq=trainer-2&orientation=squarish",
      name: "Michael Chen",
      role: "Business Strategy Coach",
      tip: "🚀 Success Secret: Network actively - 70% of opportunities come through connections, not applications!"
    },
    {
      avatar: "https://readdy.ai/api/search-image?query=Young%20diverse%20female%20career%20counselor%2C%20casual%20professional%20outfit%2C%20bright%20office%20space%2C%20motivational%20atmosphere%2C%20modern%20workspace%20design&width=80&height=80&seq=trainer-3&orientation=squarish",
      name: "Amanda Rodriguez",
      role: "Career Development Expert",
      tip: "⭐ Career Hack: Build your portfolio while learning - employers love seeing real project experience!"
    },
    {
      avatar: "https://readdy.ai/api/search-image?query=Senior%20male%20technology%20instructor%2C%20glasses%2C%20modern%20tech%20classroom%2C%20computer%20screens%20in%20background%2C%20professional%20teaching%20environment&width=80&height=80&seq=trainer-4&orientation=squarish",
      name: "David Kumar",
      role: "Tech Skills Mentor",
      tip: "🎯 Learning Tip: Focus on one technology deeply before moving to the next - mastery trumps breadth!"
    }
  ];

  // Handle bulb click to show trainer tip
  const handleBulbClick = () => {
    setShowTrainerTip(true);
    setTimeout(() => {
      setCurrentTip(prev => (prev + 1) % trainerTips.length);
    }, 4000);
    setTimeout(() => {
      setShowTrainerTip(false);
    }, 4500);
  };

  useEffect(() => {
    // Loading animation progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Smooth scroll function
    const smoothScroll = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // Add click handlers for smooth scroll
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        smoothScroll(targetId);
      }
    };

    // Add event listeners
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      clearInterval(loadingInterval);
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Clickable Bulb Icon for Tips */}
      {!isLoading && (
        <button 
          onClick={handleBulbClick}
          className="fixed top-20 left-4 z-40 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer animate-pulse"
        >
          <i className="ri-lightbulb-flash-line text-2xl text-white"></i>
        </button>
      )}

      {/* Live Trainer Tips Notification */}
      {!isLoading && (
        <div className={`fixed top-20 right-4 z-40 transform transition-all duration-500 ${showTrainerTip ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm animate-bounce">
            <div className="flex items-start space-x-3">
              <img 
                src={trainerTips[currentTip].avatar}
                alt={trainerTips[currentTip].name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{trainerTips[currentTip].name}</h4>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{trainerTips[currentTip].role}</p>
                <p className="text-sm text-gray-800 leading-relaxed">{trainerTips[currentTip].tip}</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>
        </div>
      )}

      {/* Loading Screen with Infinity Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-24 h-12 mx-auto mb-8">
              <svg
                width="96"
                height="48"
                viewBox="0 0 96 48"
                className="absolute inset-0"
              >
                <defs>
                  <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 24c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm32 0c0 8.837 7.163 16 16 16s16-7.163 16-16-7.163-16-16-16-16 7.163-16 16z"
                  fill="none"
                  stroke="url(#infinityGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset={200 - (loadingProgress * 2)}
                  className="drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                  }}
                />
              </svg>
              {/* Floating particles around infinity symbol */}
              <div 
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{
                  top: '20%',
                  left: `${20 + Math.sin(loadingProgress * 0.1) * 30}%`,
                  animationDelay: '0s'
                }}
              ></div>
              <div 
                className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                style={{
                  top: '70%',
                  right: `${15 + Math.cos(loadingProgress * 0.08) * 25}%`,
                  animationDelay: '0.5s'
                }}
              ></div>
              <div 
                className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-pulse"
                style={{
                  top: `${40 + Math.sin(loadingProgress * 0.12) * 20}%`,
                  left: '80%',
                  animationDelay: '1s'
                }}
              ></div>
            </div>
            <div className="font-[\\\'Pacifico\\\'] text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Diverse Loopers
            </div>
            <div className="text-gray-600 text-lg mb-6">Loading your experience...</div>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mt-2">{loadingProgress}%</div>
          </div>
        </div>
      )}

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 backdrop-blur-xl border-b border-white/30 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center p-1 shadow-lg">
                <img 
                  src="https://static.readdy.ai/image/fb16128890741164a3b08ecf8083c9a1/c9c63c25622a959a48aef760c021a76f.jfif"
                  alt="Diverse Loopers Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="font-[\\\'Pacifico\\\'] text-2xl text-white drop-shadow-lg">
                Diverse Loopers
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#hero" className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 cursor-pointer rounded-full hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30">Home</a>
              <a href="#offerings" className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 cursor-pointer rounded-full hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30">Programs</a>
              <a href="#about" className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 cursor-pointer rounded-full hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30">About</a>
              <a href="#testimonials" className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 cursor-pointer rounded-full hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30">Reviews</a>
              <a href="#contact" className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 cursor-pointer rounded-full hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/30">Contact</a>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 font-medium rounded-full transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap hover:shadow-lg">
                Sign In
              </button>
              <button className="px-6 py-2 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-full transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap hover:shadow-lg">
                Get Started
              </button>
            </div>
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 transition-all duration-300">
              <i className="ri-menu-line text-xl text-white"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20futuristic%20digital%20workspace%20with%20floating%20holographic%20elements%2C%20diverse%20professionals%20collaborating%2C%20tech%20innovation%20atmosphere%2C%20clean%20minimalist%20background%20with%20blue%20purple%20gradient%2C%20professional%20lighting%2C%20contemporary%20office%20environment&width=1920&height=1080&seq=hero-diverse-loopers&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Floating Learning Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              <i className="ri-lightbulb-line text-2xl text-yellow-300"></i>
            </div>
          </div>
          <div className="absolute top-40 right-20 animate-float-delay-1">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              <i className="ri-rocket-line text-2xl text-blue-300"></i>
            </div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float-delay-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              <i className="ri-trophy-line text-2xl text-purple-300"></i>
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              <i className="ri-target-line text-2xl text-green-300"></i>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Empowering Minds,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Transforming Careers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Bridge the gap between education and industry with our innovative skill development programs and comprehensive business solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#offerings" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap">
                Explore Programs
              </a>
              <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live Learning Experience Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Live Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students in our interactive learning environment where expert trainers provide real-time guidance and personalized feedback
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                {/* Simulated Video Call Interface */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Live Session: React Fundamentals</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-600 font-medium">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://readdy.ai/api/search-image?query=Professional%20female%20instructor%20teaching%20coding%2C%20pointing%20at%20screen%2C%20modern%20classroom%20setup%2C%20engaging%20presentation%20style%2C%20tech%20education%20environment&width=200&height=150&seq=live-instructor&orientation=landscape"
                        alt="Instructor"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Dr. Sarah M. (Host)
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <img 
                        src="https://readdy.ai/api/search-image?query=Young%20male%20student%20attending%20online%20class%2C%20focused%20expression%2C%20home%20office%20setup%2C%20laptop%20screen%20glow%2C%20learning%20environment&width=200&height=150&seq=student-1&orientation=landscape"
                        alt="Student"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Alex Chen
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <img 
                        src="https://readdy.ai/api/search-image?query=Diverse%20female%20student%20participating%20in%20online%20learning%2C%20taking%20notes%2C%20comfortable%20study%20space%2C%20engaged%20learning%20expression&width=200&height=150&seq=student-2&orientation=landscape"
                        alt="Student"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Maria Rodriguez
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Chat Simulation */}
                <div className="bg-gray-50 rounded-lg p-4 h-32 overflow-hidden relative">
                  <div className="space-y-2 animate-scroll-up">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white rounded-lg px-3 py-1 text-sm">
                        <span className="font-semibold text-blue-600">Instructor:</span> Great question about state management! Let me show you...
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white rounded-lg px-3 py-1 text-sm">
                        <span className="font-semibold text-green-600">Alex:</span> This makes so much sense now! 🚀
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white rounded-lg px-3 py-1 text-sm">
                        <span className="font-semibold text-purple-600">Maria:</span> Can we see more examples?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-video-chat-line text-xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Live Sessions</h3>
                  <p className="text-gray-600">Join real-time coding sessions with expert trainers who provide instant feedback and answer your questions live.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-group-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborative Learning</h3>
                  <p className="text-gray-600">Work alongside peers from around the world, share screens, and solve problems together in our virtual classrooms.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-heart-line text-xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Mentorship</h3>
                  <p className="text-gray-600">Get one-on-one guidance from industry experts who've helped thousands launch successful tech careers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Diverse Loopers is an innovative EdTech platform that bridges the gap between academic learning and industry demands. We empower students and professionals with cutting-edge skill development programs while providing comprehensive business solutions and outsourcing services to help companies scale efficiently.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg text-blue-100">Students Impacted</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <div className="text-lg text-blue-100">Corporate Clients</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg text-blue-100">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section id="offerings" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Key Offerings
            </h2>
            <p className="text-lg text-gray-600">Comprehensive solutions designed to accelerate your growth and success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-graduation-cap-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Skill Training</h3>
              <p className="text-gray-600 text-center">
                Industry-relevant courses designed by experts to bridge the skills gap and prepare you for the modern workforce
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-building-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Business Solutions</h3>
              <p className="text-gray-600 text-center">
                Comprehensive outsourcing services including development, branding, and strategic consulting for growing companies
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-user-heart-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Career Support</h3>
              <p className="text-gray-600 text-center">
                Personalized mentorship, portfolio development, and job placement assistance to accelerate your career growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600">Real stories from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Asian%20female%20software%20engineer%2C%20confident%20smile%2C%20modern%20office%20background%2C%20clean%20professional%20lighting%2C%20high%20quality%20portrait%20photography&width=80&height=80&seq=testimonial-1&orientation=squarish"
                  alt="Sarah Chen"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-gray-600">Software Engineer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Diverse Loopers transformed my career trajectory. Their hands-on approach and real-world projects gave me the confidence and skills I needed to land my dream job in tech. The mentorship was invaluable!"
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20African%20American%20business%20executive%2C%20suit%20and%20tie%2C%20corporate%20office%20background%2C%20confident%20expression%2C%20professional%20portrait%20photography&width=80&height=80&seq=testimonial-2&orientation=squarish"
                  alt="Marcus Johnson"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Marcus Johnson</h4>
                  <p className="text-gray-600">CEO, StartupVenture Inc.</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Working with Diverse Loopers for our outsourcing needs was a game-changer. Their team delivered exceptional results on time and within budget. They truly understand what growing businesses need."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Logos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Trusted by Leading Organizations
            </h2>
            <p className="text-gray-600">Companies that have partnered with us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">TechCorp</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">InnovateLab</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">FutureTech</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">StartupHub</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">EduPlatform</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-12 w-24 rounded flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">CloudCorp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students and professionals who have already started their journey with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#offerings" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap">
              Explore Programs
            </a>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized learning journeys designed to take you from beginner to professional, with hands-on projects and industry certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Development Path */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-code-s-slash-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frontend Development</h3>
              <p className="text-gray-600 mb-6">Master HTML, CSS, JavaScript, React, and modern frontend frameworks. Build responsive, interactive web applications.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">12 weeks • Beginner to Advanced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">5 Real-world Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Industry Certification</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap">
                Start Learning Path
              </button>
            </div>

            {/* Full Stack Development Path */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-database-2-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Stack Development</h3>
              <p className="text-gray-600 mb-6">Complete web development mastery including frontend, backend, databases, and deployment strategies.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">16 weeks • Intermediate Level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">8 Complete Applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Advanced Certification</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap">
                Start Learning Path
              </button>
            </div>

            {/* Data Science Path */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-bar-chart-box-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Science & AI</h3>
              <p className="text-gray-600 mb-6">Learn Python, machine learning, data analysis, and AI technologies. Become a data-driven problem solver.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">14 weeks • Beginner to Pro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">6 Data Science Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">ML & AI Certification</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap">
                Start Learning Path
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories with Animation */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our students have transformed their careers and achieved their dreams through our comprehensive programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20young%20hispanic%20female%20software%20engineer%2C%20confident%20smile%2C%20modern%20tech%20office%20background%2C%20success%20story%20portrait%2C%20professional%20lighting&width=120&height=120&seq=success-1&orientation=squarish"
                  alt="Elena Vasquez"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900">Elena Vasquez</h3>
                <p className="text-blue-600 font-medium">Frontend Developer at Google</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Before:</span>
                  <span className="font-medium">Restaurant Manager</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">After:</span>
                  <span className="font-medium text-green-600">$95k Software Engineer</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">8 months</span>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mt-4">
                "Diverse Loopers didn't just teach me to code - they taught me to think like an engineer. The live mentoring made all the difference!"
              </blockquote>
            </div>

            {/* Success Story 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20young%20african%20american%20male%20data%20scientist%2C%20glasses%2C%20confident%20expression%2C%20modern%20tech%20company%20office%2C%20career%20success%20portrait&width=120&height=120&seq=success-2&orientation=squarish"
                  alt="Marcus Thompson"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900">Marcus Thompson</h3>
                <p className="text-purple-600 font-medium">Data Scientist at Netflix</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Before:</span>
                  <span className="font-medium">Marketing Analyst</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">After:</span>
                  <span className="font-medium text-green-600">$120k Data Scientist</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">10 months</span>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mt-4">
                "The AI and machine learning curriculum was exactly what I needed. Real projects with real data - that's how you learn!"
              </blockquote>
            </div>

            {/* Success Story 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20young%20asian%20female%20product%20manager%2C%20professional%20attire%2C%20modern%20startup%20office%20background%2C%20successful%20entrepreneur%20portrait&width=120&height=120&seq=success-3&orientation=squarish"
                  alt="Amy Chen"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900">Amy Chen</h3>
                <p className="text-green-600 font-medium">Product Manager at Spotify</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Before:</span>
                  <span className="font-medium">Teacher</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">After:</span>
                  <span className="font-medium text-green-600">$110k Product Manager</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">6 months</span>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mt-4">
                "The business skills training combined with tech knowledge opened doors I never knew existed. Best investment ever!"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Partnerships */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industry Partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading tech companies to ensure our curriculum stays current and our graduates get hired
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-google-fill text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Google</h3>
              <p className="text-gray-600">Cloud Platform Training Partner</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-microsoft-fill text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Microsoft</h3>
              <p className="text-gray-600">Azure Certification Provider</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-amazon-fill text-3xl text-orange-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Amazon</h3>
              <p className="text-gray-600">AWS Training Partner</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-meta-fill text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Meta</h3>
              <p className="text-gray-600">React Curriculum Partner</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              Our partnerships ensure you're learning the most in-demand skills and technologies
            </p>
            <a href="#offerings" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap">
              View All Programs
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to the most common questions about our programs
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do I need prior coding experience?</h3>
              <p className="text-gray-600">
                Not at all! Our programs are designed for complete beginners. We start with fundamentals and gradually build up to advanced concepts. Our live trainers ensure no one gets left behind.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What's included in the program cost?</h3>
              <p className="text-gray-600">
                Everything you need: live instruction, recorded sessions, projects, mentorship, career coaching, interview preparation, and lifetime access to our alumni network.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do job placements work?</h3>
              <p className="text-gray-600">
                We have dedicated career coaches and partnerships with 500+ companies. 87% of our graduates land jobs within 6 months. We provide interview prep, portfolio reviews, and direct introductions to hiring managers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I learn while working full-time?</h3>
              <p className="text-gray-600">
                Yes! We offer flexible scheduling with evening and weekend sessions. Our self-paced modules let you learn at your own speed, with live support sessions available 7 days a week.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What makes Diverse Loopers different?</h3>
              <p className="text-gray-600">
                Our unique combination of live expert instruction, real-world projects, personal mentorship, and business skills training. We don't just teach you to code - we prepare you to thrive in tech careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="font-[\\\'Pacifico\\\'] text-2xl text-blue-400 mb-4">
                Diverse Loopers
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering minds and transforming careers through innovative education and comprehensive business solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-lg"></i>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-lg"></i>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <i className="ri-instagram-fill text-lg"></i>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/programs" className="hover:text-blue-400 transition-colors cursor-pointer">Programs</Link></li>
                <li><Link href="/business" className="hover:text-blue-400 transition-colors cursor-pointer">Business Solutions</Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors cursor-pointer">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  hello@diverseloopers.com
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <i className="ri-map-pin-line mr-2"></i>
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Diverse Loopers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
