// App.js – Mobile-First React App
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import './App.css';

// Header Component with Hamburger Menu
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuOpen && 
          !mobileMenuRef.current?.contains(event.target) && 
          !menuBtnRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", end: true },
    { path: "/about", label: "About" },
    { path: "/safety", label: "Safety" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <div className="logo">HOMANOL</div>
        
        {/* Desktop Navigation */}
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          ref={menuBtnRef}
          className={`mobile-menu-btn ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-nav-overlay ${menuOpen ? "active" : ""}`}
          onClick={closeMenu}
        ></div>
        
        {/* Mobile Navigation */}
        <nav 
          ref={mobileMenuRef}
          className={`mobile-nav ${menuOpen ? "active" : ""}`}
        >
          <ul className="mobile-nav__links">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  end={item.end}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>HOMANOL Gas Plant</h3>
            <p>Providing accurate, safe, and reliable cooking gas solutions since 2015. Your trusted partner for quality LPG services.</p>
            <p><strong>Open:</strong> Mon-Sat 7:00 AM - 8:00 PM<br/>
               <strong>Sundays:</strong> 9:00 AM - 4:00 PM</p>
          </div>
          
          <div className="footer__section">
            <h3>Quick Links</h3>
            <ul className="footer__links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/safety">Safety Tips</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h3>Contact Info</h3>
            <ul className="footer__contact">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>98 Port Harcourt Road, Aba, Abia State</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>info@homanolgas.com</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+234 803 123 4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {currentYear} HOMANOL Gas Plant. All rights reserved. | Safety First, Always.</p>
        </div>
      </div>
    </footer>
  );
}

// Mobile CTA Buttons Component
function MobileCTA() {
  return (
    <div className="mobile-cta">
      <a href="tel:+2348031234567" className="cta-button cta-call" aria-label="Call us">
        <span>📞</span>
        <div className="cta-button__text">
          <span>Call Now</span>
        </div>
      </a>
      <a 
        href="https://wa.me/2348031234567" 
        className="cta-button cta-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span>💬</span>
        <div className="cta-button__text">
          <span>WhatsApp</span>
        </div>
      </a>
    </div>
  );
}

// Home Page Component
function Home() {
  const navigate = useNavigate();
  const [visibleElements, setVisibleElements] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observerRef.current = observer;

    // Observe all sections with animation
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero__content">
          <h1 className="animate-on-load">Accurate Gas. Honest Weight.</h1>
          <p className="animate-on-load delay-1">
            High-quality cooking gas measured accurately with modern equipment. 
            We ensure you get exactly what you pay for, every single time.
          </p>
          <div className="hero__actions animate-on-load delay-2">
            <button
              className="btn btn--primary btn--full"
              onClick={() => navigate("/contact")}
            >
              Get Directions
            </button>
            <button
              className="btn btn--secondary btn--full"
              onClick={() => {
                navigate("/contact");
                document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Today's Price
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why">
        <div className="container">
          <h2 className="animate-on-scroll" id="why">Why Choose Homanol</h2>
          <div className="why__grid">
            <div className={`why__item animate-on-scroll ${visibleElements.why ? 'visible' : ''}`}>
              <h3>Accurate Measurement</h3>
              <p>Digital scales ensure you get exactly what you pay for</p>
            </div>
            <div className={`why__item animate-on-scroll delay-1 ${visibleElements.why ? 'visible' : ''}`}>
              <h3>Quality Gas</h3>
              <p>Premium LPG from certified suppliers</p>
            </div>
            <div className={`why__item animate-on-scroll delay-2 ${visibleElements.why ? 'visible' : ''}`}>
              <h3>Fair Pricing</h3>
              <p>Transparent pricing with no hidden fees</p>
            </div>
            <div className={`why__item animate-on-scroll delay-3 ${visibleElements.why ? 'visible' : ''}`}>
              <h3>Safety First</h3>
              <p>Trained staff and proper equipment handling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="price">
        <div className="container">
          <div className="price__card animate-on-scroll" id="services">
            <h2>Our Services</h2>
            <div className="services-list">
              <div className="service-item">
                <h3>LPG Refilling</h3>
                <p>All cylinder sizes (3kg, 5kg, 6kg, 12.5kg, 25kg, 50kg)</p>
              </div>
              <div className="service-item">
                <h3>Cylinder Exchange</h3>
                <p>Safe exchange program with proper inspection</p>
              </div>
              <div className="service-item">
                <h3>Home Delivery</h3>
                <p>Prompt delivery within Aba and surrounding areas</p>
              </div>
              <div className="service-item">
                <h3>Safety Checks</h3>
                <p>Free safety inspection of your gas setup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="map">
        <div className="container">
          <h2 className="animate-on-scroll">Visit Us Today</h2>
          <p className="animate-on-scroll">98 Port Harcourt Road, Aba, Abia State</p>
          <div className="map__embed animate-on-scroll">
            <div className="map-placeholder">
              <p>📍 Our Location</p>
              <p>Open: Mon-Sat 7AM-8PM</p>
              <button 
                className="btn btn--primary btn--small"
                onClick={() => navigate("/contact")}
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// About Page Component
function About() {
  const [visible, setVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="page">
      <div className="container">
        <h1 ref={aboutRef} className={visible ? 'visible' : ''}>About Homanol</h1>
        
        <div className="page__content">
          <section className="page__section animate-on-scroll">
            <h2>Our Story</h2>
            <p>
              Founded in 2015, HOMANOL Gas Plant has been serving the Aba community with 
              reliable and safe cooking gas solutions. What started as a small family 
              business has grown into one of the most trusted gas plants in the region.
            </p>
            <p>
              Our commitment to accuracy and transparency has earned us the trust of 
              thousands of households and businesses. We believe in building relationships 
              based on honesty and quality service.
            </p>
          </section>

          <section className="page__section animate-on-scroll">
            <h2>Our Mission</h2>
            <p>
              To provide every customer with accurately measured, high-quality cooking gas 
              using modern technology, ensuring safety, fairness, and complete transparency 
              in every transaction.
            </p>
          </section>

          <section className="page__section animate-on-scroll">
            <h2>What We Stand For</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Accuracy</h3>
                <p>Digital weighing for precise measurement</p>
              </div>
              <div className="value-card">
                <h3>Transparency</h3>
                <p>Clear pricing and honest service</p>
              </div>
              <div className="value-card">
                <h3>Safety</h3>
                <p>Proper handling and trained staff</p>
              </div>
              <div className="value-card">
                <h3>Quality</h3>
                <p>Certified gas from trusted suppliers</p>
              </div>
            </div>
          </section>

          <section className="page__section animate-on-scroll" id="pricing">
            <h2>Pricing & Transparency</h2>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Today's Gas Prices</h3>
                <p>Updated daily | No hidden charges</p>
              </div>
              <div className="pricing-list">
                <div className="price-item">
                  <span>Gas per KG</span>
                  <span className="price">₦1,050</span>
                </div>
                <div className="price-item">
                  <span>3kg Cylinder</span>
                  <span className="price">₦3,150</span>
                </div>
                <div className="price-item">
                  <span>5kg Cylinder</span>
                  <span className="price">₦5,250</span>
                </div>
                <div className="price-item">
                  <span>12.5kg Cylinder</span>
                  <span className="price">₦13,125</span>
                </div>
                <div className="price-item">
                  <span>25kg Cylinder</span>
                  <span className="price">₦26,250</span>
                </div>
              </div>
              <p className="pricing-note">
                <em>We weigh cylinders in front of customers and provide detailed receipts.</em>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Safety Page Component
function Safety() {
  useEffect(() => {
    const elements = document.querySelectorAll('.safety-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <main className="page">
      <div className="container">
        <h1>Gas Safety Guidelines</h1>
        
        <div className="page__content">
          <section className="page__section safety-intro animate-on-scroll">
            <h2>Safety First, Always</h2>
            <p>
              LPG is safe when handled properly. Follow these essential guidelines to ensure 
              the safe use of cooking gas in your home or business.
            </p>
          </section>

          <section className="page__section safety-dos animate-on-scroll">
            <h2>✅ Safety Do's</h2>
            <div className="safety-list">
              <div className="safety-item">
                <h3>Keep Upright</h3>
                <p>Store cylinders upright at all times</p>
              </div>
              <div className="safety-item">
                <h3>Ventilation</h3>
                <p>Store in well-ventilated areas</p>
              </div>
              <div className="safety-item">
                <h3>Regular Checks</h3>
                <p>Check for leaks using soap solution</p>
              </div>
              <div className="safety-item">
                <h3>Proper Equipment</h3>
                <p>Use approved regulators and hoses</p>
              </div>
              <div className="safety-item">
                <h3>Turn Off</h3>
                <p>Turn off cylinder valve when not in use</p>
              </div>
            </div>
          </section>

          <section className="page__section safety-donts animate-on-scroll">
            <h2>❌ Safety Don'ts</h2>
            <div className="safety-list">
              <div className="safety-item">
                <h3>No Enclosed Spaces</h3>
                <p>Don't store in enclosed areas</p>
              </div>
              <div className="safety-item">
                <h3>No Damaged Equipment</h3>
                <p>Don't use damaged cylinders or accessories</p>
              </div>
              <div className="safety-item">
                <h3>No Open Flames</h3>
                <p>Don't use flames to check for leaks</p>
              </div>
              <div className="safety-item">
                <h3>No Direct Sunlight</h3>
                <p>Don't expose to direct sunlight</p>
              </div>
              <div className="safety-item">
                <h3>No Self-Repairs</h3>
                <p>Don't attempt to repair cylinders yourself</p>
              </div>
            </div>
          </section>

          <section className="page__section emergency animate-on-scroll">
            <h2>🚨 Emergency Procedures</h2>
            <p>If you suspect a gas leak:</p>
            <ol className="emergency-steps">
              <li>Turn off the cylinder valve immediately</li>
              <li>Extinguish all flames (no smoking, no electrical switches)</li>
              <li>Open doors and windows for ventilation</li>
              <li>Call our emergency line: <strong>+234 803 999 4567</strong></li>
              <li>Do not use the gas until inspected by professionals</li>
            </ol>
          </section>

          <section className="page__section safety-offer animate-on-scroll">
            <div className="safety-card">
              <h2>Free Safety Inspection</h2>
              <p>We offer free safety inspections of your gas setup. Contact us to schedule a visit from our trained technicians.</p>
              <button 
                className="btn btn--primary"
                onClick={() => window.location.href = "tel:+2348031234567"}
              >
                Schedule Inspection
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Contact Page Component
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    service: 'refill'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert('Message sent! We\'ll contact you shortly.');
    setFormData({ name: '', phone: '', message: '', service: 'refill' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="page">
      <div className="container">
        <h1>Contact & Location</h1>
        
        <div className="contact-content">
          <section className="contact-section animate-on-scroll">
            <h2>Visit Our Plant</h2>
            <div className="contact-info">
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>98 Port Harcourt Road, Aba, Abia State</p>
                <p><em>Opposite Trinity Hospital, Near Ariaria Junction</em></p>
              </div>
              
              <div className="info-item">
                <h3>📞 Contact</h3>
                <p><strong>Phone:</strong> +234 803 123 4567</p>
                <p><strong>WhatsApp:</strong> +234 803 123 4567</p>
                <p><strong>Email:</strong> info@homanolgas.com</p>
                <p><strong>Emergency:</strong> +234 803 999 4567 (24/7)</p>
              </div>
              
              <div className="info-item">
                <h3>⏰ Business Hours</h3>
                <p><strong>Monday - Saturday:</strong> 7:00 AM - 8:00 PM</p>
                <p><strong>Sundays & Holidays:</strong> 9:00 AM - 4:00 PM</p>
                <p><strong>Emergency Service:</strong> Available 24/7</p>
              </div>
            </div>
          </section>

          <section className="contact-section animate-on-scroll">
            <h2>Quick Contact Form</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="0803 123 4567"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select 
                  id="service" 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="refill">Gas Refill</option>
                  <option value="delivery">Home Delivery</option>
                  <option value="cylinder">Cylinder Purchase</option>
                  <option value="safety">Safety Inspection</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your message or special instructions..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn--primary">
                Send Message
              </button>
            </form>
          </section>

          <section className="contact-section animate-on-scroll">
            <h2>Location Map</h2>
            <div className="map__embed">
              <div className="map-placeholder">
                <h3>📍 HOMANOL Gas Plant</h3>
                <p>98 Port Harcourt Road, Aba</p>
                <p>Coordinates: 5.1167° N, 7.3667° E</p>
                <div className="direction-buttons">
                  <a 
                    href="https://maps.google.com/?q=98+Port+Harcourt+Road+Aba" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--small"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-section animate-on-scroll">
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <a href="tel:+2348031234567" className="action-btn call-btn">
                  📞 Call Now
                </a>
                <a 
                  href="https://wa.me/2348031234567" 
                  className="action-btn whatsapp-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp
                </a>
                <a href="mailto:info@homanolgas.com" className="action-btn email-btn">
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Main App Component
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <MobileCTA />
      <Footer />
    </Router>
  );
}