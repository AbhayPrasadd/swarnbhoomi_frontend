import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Leaf,
  TrendingUp,
  Shield,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- Floating Element ---------------- */
const FloatingElement = ({ children, delay = 0 }) => (
  <div
    className="animate-float"
    style={{
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite ${delay}s`,
    }}
  >
    {children}
  </div>
);

/* ---------------- Glass Card ---------------- */
const GlassCard = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </div>
);

/* ---------------- Stat Card ---------------- */
const StatCard = ({ number, label, icon: Icon }) => (
  <GlassCard className="p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
    <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
    <div className="text-3xl font-bold text-white mb-2">{number}</div>
    <div className="text-gray-200 text-sm">{label}</div>
  </GlassCard>
);

/* ---------------- Feature Card ---------------- */
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="group cursor-pointer">
    <div
      className={`p-8 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/90 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
        <span className="text-sm font-medium">Learn More</span>
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

/* ---------------- Section ---------------- */
const Section = ({ title, description, image, reverse, gradient }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById(
      `section-${title.replace(/\s+/g, "-").toLowerCase()}`
    );
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={`py-20 px-6 bg-gradient-to-br ${gradient} overflow-hidden`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Side */}
        <div
          className={`lg:w-1/2 ${reverse ? "lg:order-2" : ""} transform transition-all duration-1000 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : reverse
              ? "translate-x-12 opacity-0"
              : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
            ✨ Innovation
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="flex items-center space-x-6">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Learn More
            </button>
            <button className="flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors">
              <span>Watch Demo</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div
          className={`lg:w-1/2 ${reverse ? "lg:order-1" : ""} transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
            <img
              src={image}
              alt={title}
              className="relative w-full h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Parallax Section ---------------- */
const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Animated background dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
          Transforming Agriculture
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-16">
          Join thousands of farmers revolutionizing their harvests with
          AI-powered insights
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <StatCard number="10K+" label="Active Farmers" icon={Users} />
          <StatCard number="30%" label="Water Savings" icon={Leaf} />
          <StatCard number="25%" label="Yield Increase" icon={TrendingUp} />
          <StatCard number="50+" label="Countries Served" icon={Globe} />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Zap}
            title="AI-Powered Insights"
            description="Real-time crop analysis and predictive modeling for better farming."
            gradient="from-purple-600 to-pink-600"
          />
          <FeatureCard
            icon={Shield}
            title="Weather Protection"
            description="Advanced weather forecasting to protect your investments."
            gradient="from-blue-600 to-cyan-600"
          />
          <FeatureCard
            icon={Award}
            title="Market Intelligence"
            description="Live market prices and demand forecasting to maximize profits."
            gradient="from-green-600 to-teal-600"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------------- Testimonials ---------------- */
const TestimonialCard = ({ quote, author, role, rating }) => (
  <GlassCard className="p-8 h-full">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
      "{quote}"
    </blockquote>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
        {author.charAt(0)}
      </div>
      <div className="ml-4">
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-gray-600 text-sm">{role}</div>
      </div>
    </div>
  </GlassCard>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-4">
            <Leaf className="w-8 h-8 text-green-400 mr-3" />
            <span className="text-2xl font-bold">SwarnBhoomi</span>
          </div>
          <p className="text-gray-400 mb-6">
            Transforming agriculture with AI and smart data solutions for a
            sustainable future.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Features</li>
            <li>Pricing</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Help Center</li>
            <li>Documentation</li>
            <li>Community</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">
          &copy; 2024 SwarnBhoomi. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------------- Landing Page ---------------- */
const LandingPage = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const navigate = useNavigate();

  const scrollToContent = () => {
    document.getElementById("content").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-12">
            <GlassCard className="inline-block p-2">
              <select
                onChange={(e) => setCurrentLang(e.target.value)}
                value={currentLang}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer"
              >
                <option value="en" className="bg-gray-800">
                  English
                </option>
                <option value="hi" className="bg-gray-800">
                  हिन्दी
                </option>
              </select>
            </GlassCard>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome to{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
              SwarnBhoomi
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto">
            Transform your farming with AI-powered insights, smart irrigation,
            and real-time market intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => navigate("/auth")}
              className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </button>
            <button className="group border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <button
            onClick={scrollToContent}
            className="animate-bounce text-white/70 hover:text-white"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <div id="content">
        <Section
          title="Who We Are"
          description="We are a team of innovators, agronomists, and technologists working towards revolutionizing agriculture through AI and sustainable practices."
          image="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop"
          gradient="from-white to-green-50"
        />

        {/* Re-arranged flow */}
        <Section
          title="The Challenge We're Solving"
          description="Farmers face climate change, water scarcity, unpredictable weather, and lack of real-time market insights. Traditional methods are no longer enough."
          image="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop"
          reverse
          gradient="from-blue-50 to-indigo-50"
        />

        <Section
          title="Our Smart Solution"
          description="SwarnBhoomi delivers AI-powered crop health monitoring, irrigation guidance, weather predictions, and market analysis in one place."
          image="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop"
          gradient="from-green-50 to-teal-50"
        />

        <ParallaxSection />

        {/* Testimonials */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Farmers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of farmers are achieving better yields with SwarnBhoomi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Increased my yield by 40% while saving 25% water!"
              author="Rajesh Kumar"
              role="Rice Farmer, Punjab"
              rating={5}
            />
            <TestimonialCard
              quote="Weather predictions saved my crops from frost."
              author="Priya Sharma"
              role="Wheat Farmer, Haryana"
              rating={5}
            />
            <TestimonialCard
              quote="Market insights helped me sell at the right time."
              author="Amit Patel"
              role="Vegetable Farmer, Gujarat"
              rating={5}
            />
          </div>
        </section>

        <Section
          title="Measurable Impact"
          description="Farmers achieved 30% less water use, 25% better yields, and higher profits through smart farming decisions."
          image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
          reverse
          gradient="from-yellow-50 to-orange-50"
        />

        <Section
          title="Join the Agricultural Revolution"
          description="Be part of the future of farming. Join our community and grow smarter, more profitable crops with SwarnBhoomi."
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
          gradient="from-green-50 to-emerald-50"
        />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
