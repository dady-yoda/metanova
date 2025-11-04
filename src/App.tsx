import { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Trophy, Users, Clock, Zap } from 'lucide-react';

function App() {
  useEffect(() => {
      // load the runtime-only starfield script from /public and initialize it
      const s = document.createElement('script');
      s.src = '/starfield.js';
      s.async = true;
      s.onload = () => {
        const SF = (window as any).Starfield;
        if (SF && typeof SF.setup === 'function') {
          SF.setup({
            numStars: 400,
            baseSpeed: 0.5,
            trailLength: 0.6,
            starColor: 'rgb(180, 180, 255)',
            canvasColor: 'rgba(0, 0, 0, 0.1)'
          });
        }
      };
      document.head.appendChild(s);

      return () => {
        // Cleanup starfield when App unmounts
        try {
          const SF = (window as any).Starfield;
          if (SF && typeof SF.cleanup === 'function') {
            SF.cleanup();
          }
        } catch (e) {
          console.warn('Error cleaning up Starfield:', e);
        }
      };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 11,
    minutes: 42,
    seconds: 14
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-28T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = Array.from(document.querySelectorAll<HTMLElement>(".circle"));
    const positions = new Map<HTMLElement, { x: number; y: number }>();

    // Initialize circles
    circles.forEach((circle) => {
      positions.set(circle, { x: 0, y: 0 });
      circle.style.backgroundColor = 'white';
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    // Animation function
    function animateCircles() {
      let x = coords.x;
      let y = coords.y;
      
      circles.forEach((circle, index) => {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        
        circle.style.scale = ((circles.length - index) / circles.length).toString();
        
        const pos = positions.get(circle)!;
        pos.x = x;
        pos.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        const nextPos = positions.get(nextCircle)!;
        x += (nextPos.x - x) * 0.3;
        y += (nextPos.y - y) * 0.3;
      });
     
      requestAnimationFrame(animateCircles);
    }

    // Add event listener and start animation
    window.addEventListener("mousemove", handleMouseMove);
    animateCircles();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden starfield">
      {/* Cursor circles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="circle" />
      ))}
      
      <div className="animated-bg"></div>

      <header className="fixed top-0 left-0 right-0 z-50 glass-nav starfield-origin">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Group_26086765[1].png" alt="HackWithIndia" className="h-12 w-12 object-cover rounded-full shadow-lg shadow-cyan-500/50" />
            <h1 className="font-bold text-xl tracking-tight">METANOVA</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="nav-link">About</a>
            <a href="#rules" className="nav-link">Rules</a>
            <a href="#venue" className="nav-link">Venue</a>
            <a href="#prizes" className="nav-link">Prizes</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="https://devnovate.co/event/metanova" target="_blank" rel="noopener noreferrer" className="glass-button px-6 py-2.5 rounded-lg font-medium inline-block">
              Register Now
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 glass-card rounded-lg"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-card mx-6 mb-4 rounded-xl overflow-hidden">
            <nav className="flex flex-col p-4 space-y-3">
              <a href="#about" className="nav-link-mobile">About</a>
              <a href="#rules" className="nav-link-mobile">Rules</a>
              <a href="#venue" className="nav-link-mobile">Venue</a>
              <a href="#prizes" className="nav-link-mobile">Prizes</a>
              <a href="#contact" className="nav-link-mobile">Contact</a>
              <a href="https://devnovate.co/event/metanova" target="_blank" rel="noopener noreferrer" className="glass-button px-6 py-2.5 rounded-lg font-medium w-full inline-block text-center">
                Register Now
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          

          {/* Hero section with logo and info boxes */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 max-w-6xl mx-auto">
            <div className="glass-card px-6 py-3 rounded-lg flex items-center gap-3 mb-4 md:mb-0 order-2 md:order-1">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-cyan-400">28th</span>
                <span className="text-sm">November 2025</span>
              </div>
            </div>
            
            <div className="order-1 md:order-2 mb-4 md:mb-0">
              <img src="/logo metanova.png" alt="MetaNova" className="mx-auto object-contain h-[15rem] md:h-[28rem]" />
            </div>
            
            <div className="glass-card px-6 py-3 rounded-lg flex items-center gap-3 order-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-yellow-400">₹30,000</span>
                <span className="text-sm">Prize Pool</span>
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Join the Ultimate
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              8-Hour Hackathon
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            The HackWithIndia Club of RRCE presents an intensive coding challenge
          </p>

          <p className="text-gray-400 mb-8">
            Problem Statement by <span className="text-cyan-400 font-semibold">Duality AI</span>
          </p>

          <a href="https://devnovate.co/event/metanova" target="_blank" rel="noopener noreferrer" className="cta-button px-10 py-4 rounded-xl font-semibold text-lg inline-block">
            Register on DevNovate
          </a>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Event Countdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover-lift">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prizes" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Prize Pool <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">₹30,000</span> + Goodies
          </h2>
          <p className="text-center text-gray-400 mb-12">Rewards for the top innovators</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                place: '1st Place',
                prize: 'Cash Prize + Winner Certificate',
                icon: '🥇',
                gradient: 'from-yellow-400 to-orange-500'
              },
              {
                place: '2nd Place',
                prize: 'Cash Prize + Runner-up Certificate',
                icon: '🥈',
                gradient: 'from-gray-300 to-gray-500'
              },
              {
                place: '3rd Place',
                prize: 'Cash Prize + Winner\'s Certificate',
                icon: '🥉',
                gradient: 'from-orange-400 to-amber-600'
              }
            ].map((item, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center hover-lift group">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className={`font-bold text-2xl mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                  {item.place}
                </h3>
                <p className="text-gray-300">{item.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">About METANOVA</h2>
          <div className="glass-card p-8 rounded-2xl mb-20 hover-lift">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <p className="text-lg text-gray-200 leading-relaxed relative z-[1]">
                    Hosted by <span className="text-cyan-400 font-semibold">HackWithIndia @ RRCE</span>, METANOVA is a fast-paced 8-hour hackathon designed to fuel innovation and teamwork. Watch ideas turn into reality as creativity and technology collide — all within one thrilling day. Coders, designers, and problem-solvers alike: this is your chance to build big under pressure!
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed mt-4 relative z-[1]">
                    Problem statements will be released prior to the hackathon, giving teams time to think, plan, and come prepared to innovate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center mb-12">Event Schedule</h2>
          <div className="glass-card p-8 rounded-2xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[2.4rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600 md:left-1/2 md:-ml-0.5"></div>

              {[
                {
                  time: "08:00-09:00 AM",
                  event: "Registration & Welcome",
                  icon: "🎫"
                },
                {
                  time: "09:00-10:00 AM",
                  event: "Inauguration",
                  icon: "🎭"
                },
                {
                  time: "10:00-1:00 PM",
                  event: "1st Round & CTF+Quiz",
                  icon: "💻"
                },
                {
                  time: "2:00-4:30 PM",
                  event: "2nd Round",
                  icon: "🚀"
                },
                {
                  time: "4:30-5:30 PM",
                  event: "Evaluation",
                  icon: "📊"
                },
                {
                  time: "5:30-7:00 PM",
                  event: "Prize Distribution",
                  icon: "🏆"
                }
              ].map((item, index) => (
                <div key={index} className="relative flex items-center mb-8 last:mb-0">
                  {/* Desktop time (left side) */}
                  <div className="hidden md:block w-1/2 pr-8 text-right">
                    <p className="text-cyan-400 font-medium">{item.time}</p>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-8 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 md:left-1/2 md:-ml-4">
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  {/* Mobile time and event (right side) */}
                  <div className="pl-20 md:w-1/2 md:pl-8">
                    <p className="text-cyan-400 font-medium md:hidden mb-1">{item.time}</p>
                    <div className="glass-card bg-white/5 p-4 rounded-lg hover:-translate-y-1 transition-transform duration-300">
                      <p className="text-gray-200">{item.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rules" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Rules & Guidelines</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Team Formation',
                icon: <Users className="w-6 h-6" />,
                items: [
                  'Teams of 3–4 members allowed',
                  'Cross-college teams permitted',
                  '₹25 per person participation fee'
                ]
              },
              {
                title: 'Main Event',
                icon: <Clock className="w-6 h-6" />,
                items: [
                  '8-hour intensive coding + CTF + Quiz',
                  'Any language or framework allowed',
                  'Internet and power access provided',
                  'Bring your own laptop & charger',
                  'Snacks and goodies provided'
                ]
              },
              {
                title: 'Submission',
                icon: <Zap className="w-6 h-6" />,
                items: [
                  'Two rounds of evaluation',
                  'CTF + Quiz scores add extra points',
                  'Presentation demo (max 5 minutes)',
                  '40% of code must be original'
                ]
              },
              {
                title: 'Evaluation',
                icon: <Trophy className="w-6 h-6" />,
                items: [
                  'Multiple evaluation stages',
                  'Initial screening and second round',
                  'Final judging based on creativity',
                  'Implementation and impact assessed'
                ]
              }
            ].map((section, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg text-white">
                    {section.icon}
                  </div>
                  <h3 className="font-bold text-xl">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Venue & Facilities</h2>
          <p className="text-center text-gray-400 mb-12">Everything you need for a successful hackathon</p>

          <div className="glass-card p-8 rounded-2xl mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-xl">Rajarajeswari College of Engineering</h3>
            </div>
            <p className="text-gray-300 mb-6">
              #14, Ramohalli Cross, Kumbalgodu, Mysore Road, Bengaluru-74
            </p>
            <a 
              href="https://maps.app.goo.gl/BWScAxkb5zGBbXiu5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-lg hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Open in Google Maps
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: '📶', text: 'High-speed WiFi' },
              { icon: '🔌', text: 'Power outlets' },
              { icon: '🍕', text: 'Meals & Refreshments' },
              { icon: '🚗', text: 'Parking Available' }
            ].map((facility, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center hover-lift">
                <div className="text-4xl mb-3">{facility.icon}</div>
                <p className="text-gray-300 text-sm">{facility.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card-highlight p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">Join Our WhatsApp Community</h2>
            <p className="text-gray-300 mb-6">
              Stay updated, connect with participants & get instant support!
            </p>
            <a 
              href="https://chat.whatsapp.com/EmzJRs0DYAJ6Ypm9X7TopU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="glass-nav py-12 px-6 mt-12 relative z-[2]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left section with logo and description */}
            <div className="flex flex-col items-center md:items-start md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/Group_26086765[1].png" alt="HackWithIndia" className="h-16 w-16 object-cover rounded-full shadow-lg shadow-cyan-500/50" />
                <div>
                  <h3 className="font-bold text-2xl">METANOVA</h3>
                  <p className="text-cyan-400">By HackWithIndia</p>
                </div>
              </div>
              <p className="text-gray-300 text-center md:text-left">
                Hackathon club of Rajarajeswari College of Engineering, Kumbalgodu
              </p>
            </div>

            {/* Contact Information */}
            <div className="glass-card rounded-xl p-6 md:col-span-1">
              <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Contact Us</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hackwithindiarrce@gmail.com" className="hover:text-cyan-400 transition-colors">
                    hackwithindiarrce@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Team Contacts */}
            <div className="glass-card rounded-xl p-6 md:col-span-1">
              <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Team Contacts</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="flex justify-between w-full">
                    <span>Mahima G I</span>
                    <a href="tel:+916360089804" className="hover:text-cyan-400 transition-colors">+91 6360089804</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="flex justify-between w-full">
                    <span>P C Karthik</span>
                    <a href="tel:+918310081582" className="hover:text-cyan-400 transition-colors">+91 8310081582</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="flex justify-between w-full">
                    <span>Santhosh</span>
                    <a href="tel:+917259228022" className="hover:text-cyan-400 transition-colors">+91 72592 28022</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright section */}
          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} HackWithIndia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;