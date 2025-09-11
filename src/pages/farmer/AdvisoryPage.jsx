import { useState, useRef, useEffect } from "react";

export default function ChatInterface() {
  const [chat, setChat] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // -----------------------------
  // Start/Stop Recording
  // -----------------------------
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // -----------------------------
  // Transcribe Audio
  // -----------------------------
  const transcribeAudio = async (blob) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(",")[1];
      const res = await fetch("http://localhost:5001/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioBase64: base64Audio, languageCode: "en-IN" }),
      });
      const data = await res.json();
      if (data.transcript) {
        setInputText(data.transcript);
        handleSendMessage(data.transcript);
      }
    };
    reader.readAsDataURL(blob);
  };

  // -----------------------------
  // Send Message to Gemini
  // -----------------------------
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: message, timestamp: new Date() }]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message }),
      });
      const data = await res.json();
      
      setIsTyping(false);
      
      if (data.answer) {
        setChat((prev) => [
          ...prev,
          { sender: "ai", text: data.answer, feedback: null, timestamp: new Date() },
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I encountered an error. Please try again.", feedback: null, timestamp: new Date() },
      ]);
    }
  };

  // -----------------------------
  // Text-to-Speech (Single Playback)
  // -----------------------------
  const speakText = async (text) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }

    const res = await fetch("http://localhost:5001/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, languageCode: "en-IN" }),
    });
    const data = await res.json();
    if (data.audioContent) {
      const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
      audioPlayerRef.current = audio;
      audio.play();
    }
  };

  // -----------------------------
  // Feedback (👍 / 👎)
  // -----------------------------
  const handleFeedback = (index, value) => {
    setChat((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, feedback: value } : msg
      )
    );
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="flex flex-col  max-w-8xl mx-auto ">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Farmer Advisor</h1>
              <p className="text-sm text-gray-500">Your agricultural assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-24 space-y-4">
        {chat.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-white rounded-full p-8 shadow-lg mb-4">
              <span className="text-6xl">🌱</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Farmer Advisor!</h2>
            <p className="text-gray-500 max-w-md">
              Ask me anything about farming, crops, weather, or agricultural practices. 
              You can type your question or use voice input.
            </p>
          </div>
        )}

        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 ${msg.sender === "user" ? "ml-3" : "mr-3"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  msg.sender === "user" ? "bg-green-600" : "bg-blue-600"
                }`}>
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col">
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* AI Controls */}
                {msg.sender === "ai" && (
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      title="Listen to response"
                    >
                      <span className="text-lg">🔊</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(idx, "up")}
                      className={`p-1 rounded-full transition-colors ${
                        msg.feedback === "up" ? "bg-green-100 text-green-600" : "hover:bg-gray-100 text-gray-500"
                      }`}
                      title="Good response"
                    >
                      <span className="text-lg">👍</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(idx, "down")}
                      className={`p-1 rounded-full transition-colors ${
                        msg.feedback === "down" ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-500"
                      }`}
                      title="Poor response"
                    >
                      <span className="text-lg">👎</span>
                    </button>
                  </div>
                )}

                {/* Timestamp */}
                <div className={`text-xs text-gray-400 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-xs lg:max-w-md xl:max-w-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  🤖
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Voice Recording Status */}
          {recording && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-3 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording... Click stop when done</span>
              </div>
            </div>
          )}

          {/* Audio Ready Indicator */}
          {audioBlob && !recording && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-3 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-blue-600">
                <span className="text-sm font-medium">Audio recorded! Click transcribe to convert to text</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Text Input */}
            <div className="md:col-span-3">
              <textarea
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your farming question here... (Press Enter to send)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 md:justify-end">
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`flex-1 md:flex-none px-3 py-2 rounded font-semibold shadow-sm transition-all duration-200 text-xs ${
                  recording
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
                title={recording ? "Stop recording" : "Start voice recording"}
              >
                {recording ? "🛑 Stop" : "🎤 Speak"}
              </button>

              {audioBlob && (
                <button
                  onClick={() => transcribeAudio(audioBlob)}
                  className="flex-1 md:flex-none px-3 py-2 rounded bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-600 transition-all duration-200 text-xs"
                  title="Convert audio to text"
                >
                  ⏩ Transcribe
                </button>
              )}

              <button
                onClick={() => handleSendMessage(inputText)}
                className={`flex-1 md:flex-none px-3 py-2 rounded font-semibold shadow-sm transition-all duration-200 text-xs ${
                  inputText.trim()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!inputText.trim()}
                title="Send message"
              >
                💬 Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}