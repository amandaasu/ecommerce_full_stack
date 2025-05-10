"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { IconSend, IconMoodSmile, IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import { ProductImage } from "./Products";
import Logo from "@/assets/MNlogo_small.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
const WS_BASE_URL = process.env.NEXT_WS_BASE_URL;
const suggestions = ["Show me items under $30", "List all skirts", "Search for SKU DB319-RED-0", "Show me hoodies above $20"];

function ChatWindow({ messages, setMessages }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [ws, setWs] = useState(null);

  const handleShowMore = (params) => {
    router.push(`/shop?${new URLSearchParams(params).toString()}`);
  };
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage(new Event("submit"), suggestion);
  };
  useEffect(() => {
    const websocket = new WebSocket(WS_BASE_URL);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.message,
          sender: "bot",
          timestamp: new Date().toISOString(),
          items: data.items || [],
          params: data.params || {},
        },
      ]);
      setIsTyping(false);
    };

    websocket.onclose = () => {
      console.warn("WebSocket connection closed");
    };

    return () => websocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e, suggestedMessage = null) => {
    e.preventDefault();
    const messageToSend = suggestedMessage || inputValue;

    if (!messageToSend.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: "user",
      timestamp: new Date().toISOString(),
      items: [],
      params: {},
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    if (ws) ws.send(messageToSend);
  };

  return (
    <div className="bg-white w-[340px] md:w-[380px] rounded-2xl shadow-xl flex flex-col border border-gray-200 overflow-hidden animate-slideIn">
      {/* Header */}
      <div className="bg-[var(--primary-color)] px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Image src={Logo} alt="Logo" width={24} height={24} />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Chat Assistant</h3>
            <p className="text-xs text-red-200">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-gray-50">
        {messages.map((message, index) => (
          <div key={message.id} className="mb-4">
            <ChatMessage message={message} />
            {index === 0 && message.sender === "bot" && message.text.toLowerCase().includes("hi there") && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {suggestions.map((suggestion, i) => (
                  <button key={i} onClick={() => handleSuggestionClick(suggestion)} className="text-sm bg-white text-[var(--primary-color)] px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors duration-200">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {message.items.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {message.items.slice(0, 6).map((item) => (
                  <div key={item._id} className="bg-white p-2 rounded-lg shadow-sm">
                    <ProductImage src={item.imageSrc} alt={item.title || "Product Image"} className="w-full h-32 object-cover rounded-md" />
                    <h4 className="mt-2 text-sm font-medium text-gray-800">{item.title}</h4>
                    <p className="text-[var(--primary-color)] font-semibold mt-1">${item.variantPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}

            {message.items.length > 6 && (
              <div className="text-center mt-2">
                <button onClick={() => handleShowMore(message.params)} className="text-sm text-[var(--secondary-color)] hover:text-[var(--primary-color)]">
                  View {message.items.length - 6} more items →
                </button>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1 mt-2 pl-2">
            <div className="bg-gray-200 p-2 rounded-lg inline-block">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex items-center bg-white">
        <button type="button" className="text-gray-400 hover:text-gray-600 p-1" aria-label="Add emoji">
          <IconMoodSmile className="w-5 h-5" />
        </button>
        <button type="button" className="text-gray-400 hover:text-gray-600 p-1 mr-2" aria-label="Attach image">
          <IconPhoto className="w-5 h-5" />
        </button>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type a message..." className="flex-1 px-3 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] text-sm" />
        <button type="submit" disabled={!inputValue.trim()} className={`ml-2 p-2 rounded-full ${inputValue.trim() ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]" : "bg-gray-300"} text-white`} aria-label="Send message">
          <IconSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
