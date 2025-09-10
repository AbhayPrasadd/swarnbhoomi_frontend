import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight, Shield, Sparkles } from "lucide-react";

const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AuthPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 1️⃣ Sign in with Firebase Auth
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User profile not found!");
        setIsLoading(false);
        return;
      }

      const userData = userDoc.data();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // 3️⃣ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.6); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating geometric shapes */}
        <FloatingElement delay={0} className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full backdrop-blur-sm"></div>
        </FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-20">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-lg backdrop-blur-sm transform rotate-12"></div>
        </FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-32 left-16">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full backdrop-blur-sm"></div>
        </FloatingElement>
        <FloatingElement delay={1} className="absolute bottom-20 right-32">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg backdrop-blur-sm transform -rotate-12"></div>
        </FloatingElement>

        {/* Scattered particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingElement key={i} delay={i * 0.5} className="absolute">
            <div 
              className="w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Logo and Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl pulse-glow">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Swarn<span className="text-green-400">Bhoomi</span>
            </h1>
            <p className="text-green-100/80 text-lg">
              Smart Agriculture Platform
            </p>
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            
            {/* Card shimmer effect */}
            <div className="absolute inset-0 shimmer opacity-30"></div>
            
            {/* Card content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-white/70">
                  Sign in to your farming dashboard
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                  <p className="text-red-200 text-sm text-center flex items-center justify-center">
                    <Shield className="w-4 h-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {/* Login Form */}
              <div className="space-y-6">
                
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 backdrop-blur-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50 group-focus-within:text-green-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 backdrop-blur-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-green-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-green-300 hover:text-green-200 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-center text-white/70 text-sm">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-green-300 hover:text-green-200 font-semibold transition-colors inline-flex items-center"
                  >
                    Create Account
                    <Sparkles className="w-4 h-4 ml-1" />
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <Shield className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-white/80 text-xs">Secured with Firebase Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;