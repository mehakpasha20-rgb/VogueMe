import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI Fashion Assistant. Ask me anything about fashion, jewellery matching, outfit suggestions, or styling advice!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'What jewellery matches a black dress?',
    'Suggest a wedding outfit',
    'Which necklace suits a red gown?',
    'What should I wear to a party?',
    'How do I match earrings with my dress?'
  ];

  const formatMessageContent = (content) => {
    if (!content) return '';
    
    // 1. Escape HTML to prevent XSS
    let html = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // 2. Replace bullet asterisks at the start of a line with an elegant bullet symbol
    html = html.replace(/^\s*\*\s+/gm, '• ');
    
    // 3. Replace **bold** with <strong>bold</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 4. Replace single *italic* with <em>italic</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 5. Remove any remaining stray asterisks
    html = html.replace(/\*/g, '');
    
    // 6. Replace linebreaks with <br />
    html = html.replace(/\n/g, '<br />');
    
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/ai/chat', { message: messageText });
      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      <div className="mb-4 flex items-center gap-3">
        <i className="ti ti-sparkles text-[#FF2E63] text-2xl animate-pulse"></i>
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">AI Fashion Assistant</h1>
      </div>
      <p className="text-[#7D3E4D] font-semibold mb-8">Get personalized fashion advice, jewellery matching ideas, and outfit recommendations.</p>

      {/* Chat Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.08)] overflow-hidden mb-8">
        {/* Messages */}
        <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-white/20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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

      {/* Suggested Questions */}
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
