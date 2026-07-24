/**
 * AI Fashion Assistant Component
 * 
 * An interactive chatbot interface that lets users query an AI assistant for fashion tips,
 * jewellery matching advice, and general outfit ideas. Translates raw response text (with bullet
 * points and markdown bolding) into HTML dynamically and scrolls to the bottom on new messages.
 */

import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

const AIAssistant = () => {
  // State storing the list of chat messages. Initialized with a greeting from the assistant.
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI Fashion Assistant. Ask me anything about fashion, jewellery matching, outfit suggestions, or styling advice!' }
  ]);
  
  // State for tracking the current text entered in the chat input field
  const [input, setInput] = useState('');
  
  // State representing whether a request is currently pending with the AI backend server
  const [loading, setLoading] = useState(false);
  
  // Ref referencing the end of the chat messages container (used for auto-scrolling)
  const messagesEndRef = useRef(null);

  /**
   * Smoothly scrolls the chat list container to the bottom line
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom every time the messages state array updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Default suggested question buttons shown underneath the chat box
  const suggestedQuestions = [
    'What jewellery matches a black dress?',
    'Suggest a wedding outfit',
    'Which necklace suits a red gown?',
    'What should I wear to a party?',
    'How do I match earrings with my dress?'
  ];

  /**
   * Formats raw chat content strings, converting markdown-style elements (**bold**, *italics*, *)
   * into clean, styled JSX components safely.
   */
  const formatMessageContent = (content) => {
    if (!content) return '';
    
    // 1. Escape HTML entities to protect against Cross-Site Scripting (XSS)
    let html = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // 2. Replace markdown bullet asterisks at the start of a line with bullet symbols
    html = html.replace(/^\s*\*\s+/gm, '• ');
    
    // 3. Replace markdown **bold** syntax with HTML strong tags
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 4. Replace markdown *italic* syntax with HTML em tags
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 5. Remove any leftover asterisks that weren't captured by formatting filters
    html = html.replace(/\*/g, '');
    
    // 6. Map newline characters to standard HTML break tags
    html = html.replace(/\n/g, '<br />');
    
    // Dangerously insert compiled HTML format safely since characters have been escaped in step 1
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  /**
   * Dispatches the user's message to the backend server and adds the resulting reply to context
   */
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Immediately push user message to state
    const userMessage = { role: 'user', content: messageText };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // API call to backend chatbot route
      const response = await api.post('/ai/chat', { message: messageText });
      const assistantMessage = { role: 'assistant', content: response.data.response };
      // Append assistant's answer to message state list
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Listen for keypress event to allow submission via 'Enter' key
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Title Header */}
      <div className="mb-4 flex items-center gap-3">
        <i className="ti ti-sparkles text-[#FF2E63] text-2xl animate-pulse"></i>
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">AI Fashion Assistant</h1>
      </div>
      <p className="text-[#7D3E4D] font-semibold mb-8">Get personalized fashion advice, jewellery matching ideas, and outfit recommendations.</p>

      {/* Chat Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.08)] overflow-hidden mb-8">
        {/* Messages list */}
        <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-white/20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Dynamic bubble styling based on sender */}
              <div
                className={`max-w-[80%] p-4 text-[14px] font-medium leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white rounded-2xl rounded-tr-none shadow-md'
                    : 'bg-[#FFE5EC] text-[#4A0E17] rounded-2xl rounded-tl-none border border-[#FFC2D1]/40 shadow-sm'
                }`}
              >
                {formatMessageContent(message.content)}
              </div>
            </div>
          ))}
          
          {/* Animated bounce bubbles for loading state */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#FFE5EC]/80 border border-[#FFC2D1]/30 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-[#FF2E63]/60 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-[#FF2E63]/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2.5 h-2.5 bg-[#FF2E63]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          {/* Anchor for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-[#FFC2D1] p-4 bg-white/40">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about fashion..."
              className="flex-1 border border-[#FFC2D1] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 bg-white font-semibold text-[14px] text-[#4A0E17] transition-all"
              disabled={loading}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_8px_20px_rgba(255,46,99,0.3)] transition-all duration-300 shadow-md disabled:opacity-50"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div>
        <h3 className="text-[18px] font-extrabold text-[#4A0E17] mb-4">Suggested Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#FFC2D1] shadow-sm hover:shadow-[0_8px_20px_rgba(255,46,99,0.1)] transition-all duration-300 text-left text-[14px] font-bold text-[#4A0E17] hover:border-[#FF2E63] hover:text-[#FF2E63]"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

