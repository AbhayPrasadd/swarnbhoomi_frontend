import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  UserCircle,
  MessageSquare,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
  Trash2,
  ArrowLeft,
  Send,
  Plus,
  Heart,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Memoized Post Component for better performance
const PostCard = React.memo(({ post, onLike, onDelete, onToggleComments, onAddComment, commentsVisible, commentInputs, setCommentInputs, timeAgo }) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes || 0);

  const handleLocalLike = () => {
    if (!liked) {
      setLiked(true);
      setLocalLikes(prev => prev + 1);
      onLike(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
            <User className="text-white" size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">{post.user}</h3>
            <p className="text-xs text-gray-500">{timeAgo(post.timestamp)}</p>
          </div>
        </div>
        {post.user === "You" && (
          <button 
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="px-3 md:px-4 pb-3">
        <p className="text-gray-800 leading-relaxed text-sm md:text-base">{post.text}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-3 md:px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-64 md:max-h-80 object-cover rounded-lg border border-gray-200"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Post Actions Bar */}
      <div className="px-3 md:px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLocalLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm md:text-base ${
              liked 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            <span className="font-medium">{localLikes}</span>
          </button>
          
          <button
            onClick={() => onToggleComments(post.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm md:text-base"
          >
            <MessageSquare size={18} />
            <span>{(post.comments || []).length}</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all text-sm md:text-base">
            <Share2 size={18} />
          </button>
        </div>

        {/* Comments Section */}
        {commentsVisible[post.id] && (
          <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
            {(post.comments || []).map((comment, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-gray-600" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1">
                  <p className="text-sm text-gray-700">{comment}</p>
                </div>
              </div>
            ))}
            
            {/* Add Comment */}
            <div className="flex gap-2 mt-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-white" />
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                  }
                  className="flex-1 border border-gray-300 p-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && onAddComment(post.id)}
                />
                <button
                  onClick={() => onAddComment(post.id)}
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const Community = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [posting, setPosting] = useState(false);

  // Memoized demo posts data
  const demoPosts = useMemo(() => [
    {
      id: "demo1",
      user: "Kisan Bhai",
      text: "Just harvested my wheat crop! Getting great yield this season. Any tips for post-harvest storage?",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
      likes: 15,
      comments: [
        "Great harvest! Make sure to dry properly before storage.",
        "Congratulations! What variety did you plant?"
      ],
      timestamp: Date.now() - 3600000
    },
    {
      id: "demo2", 
      user: "Farmer Lakshmi",
      text: "Looking for advice on organic pest control for tomatoes. Chemical pesticides are too expensive. Need budget-friendly solutions.",
      image: null,
      likes: 9,
      comments: [
        "Try neem oil spray, works well for me",
        "Companion planting with marigolds helps",
        "Soap water spray is also effective"
      ],
      timestamp: Date.now() - 7200000
    },
    {
      id: "demo3",
      user: "Anand Kisan", 
      text: "New irrigation system installed! Water efficiency improved by 40%. Happy to share details if anyone interested.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
      likes: 23,
      comments: [
        "Please share the details!",
        "What type of system did you install?",
        "Cost effective? Planning to install one too"
      ],
      timestamp: Date.now() - 10800000
    },
    {
      id: "demo4",
      user: "Raj Farmer",
      text: "Monsoon preparation checklist: ✓ Check drainage ✓ Secure equipment ✓ Stock seeds ✓ Repair tools. Stay safe everyone!",
      image: null,
      likes: 7,
      comments: [],
      timestamp: Date.now() - 14400000
    },
    {
      id: "demo5",
      user: "Priya Devi",
      text: "Started organic farming this year. The soil health has improved dramatically! No chemical fertilizers needed. Nature knows best 🌱",
      image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=600&q=80",
      likes: 31,
      comments: [
        "That's amazing! How long did the transition take?",
        "Organic is the future",
        "Share your methods please"
      ],
      timestamp: Date.now() - 18000000
    },
    {
      id: "demo6",
      user: "Tech Farmer",
      text: "Using drones for crop monitoring has been a game changer. Early pest detection and precise spraying saves so much time and money!",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80",
      likes: 18,
      comments: [
        "Which drone model are you using?",
        "Cost vs benefit analysis please"
      ],
      timestamp: Date.now() - 21600000
    }
  ], []);

  // Initialize posts immediately
  useEffect(() => {
    setPosts(demoPosts);
  }, [demoPosts]);

  // Optimized post creation
  const handlePost = useCallback(async () => {
    if (!newPost.trim() && !image) return;
    
    setPosting(true);
    
    const newDemoPost = {
      id: `user_${Date.now()}`,
      user: "You",
      text: newPost.trim(),
      image: imagePreview,
      likes: 0,
      comments: [],
      timestamp: Date.now()
    };

    // Optimistic update - add post immediately
    setPosts(prev => [newDemoPost, ...prev]);
    
    // Reset form
    setNewPost("");
    setImage(null);
    setImagePreview(null);
    setModalOpen(false);
    setPosting(false);
  }, [newPost, image, imagePreview]);

  // Optimized like handler
  const handleLike = useCallback((postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: (post.likes || 0) + 1 }
        : post
    ));
  }, []);

  // Optimized comment handler
  const handleComment = useCallback((postId) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...(post.comments || []), commentText.trim()] }
        : post
    ));
    
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  }, [commentInputs]);

  // Optimized delete handler
  const handleDelete = useCallback((postId) => {
    if (!window.confirm("Delete this post?")) return;
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  // Handle image selection
  const handleImageSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  // Toggle comments visibility
  const toggleComments = useCallback((postId) => {
    setCommentsVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  }, []);

  // Format time ago
  const timeAgo = useCallback((timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-green-700 hover:text-green-900 flex items-center gap-2 p-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold text-lg">Community</span>
            </button>
            
            {/* Desktop Create Post Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 p-4">
          
          {/* Main Feed - Takes full width on mobile, 2/3 on desktop */}
          <div className="flex-1 lg:w-2/3 space-y-4 md:space-y-6">
            {/* Create Post Card - Desktop Only */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={16} />
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 bg-gray-100 text-left px-4 py-3 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  What's on your mind?
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading posts...
                </div>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onToggleComments={toggleComments}
                  onAddComment={handleComment}
                  commentsVisible={commentsVisible}
                  commentInputs={commentInputs}
                  setCommentInputs={setCommentInputs}
                  timeAgo={timeAgo}
                />
              ))
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block w-1/3 space-y-4">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Community Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Farmers</span>
                  <span className="font-medium text-green-600">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-medium text-green-600">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered</span>
                  <span className="font-medium text-green-600">892</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 font-medium">🌱 Crop Rotation</p>
                  <p className="text-green-700">Rotate crops every season for better soil health</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 font-medium">💧 Water Management</p>
                  <p className="text-blue-700">Early morning watering reduces evaporation</p>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Trending Topics</h3>
              <div className="space-y-2">
                {['#OrganicFarming', '#IrrigationTips', '#PestControl', '#HarvestTime', '#SoilHealth'].map((tag) => (
                  <span key={tag} className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mr-2 mb-2 hover:bg-green-200 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 z-50"
      >
        <Plus size={24} />
      </button>

      {/* Create Post Modal - Responsive */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-700">Create Post</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={16} />
                </div>
                <textarea
                  className="flex-1 border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="4"
                  placeholder="Share your farming experience, ask questions, or seek advice..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative ml-13">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 md:h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t flex items-center justify-between">
              <label className="flex items-center gap-2 text-green-600 cursor-pointer hover:text-green-800 transition-colors p-2 rounded-lg hover:bg-green-50">
                <ImageIcon size={20} />
                <span className="text-sm font-medium">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
              
              <button
                onClick={handlePost}
                disabled={posting || (!newPost.trim() && !image)}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                {posting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;