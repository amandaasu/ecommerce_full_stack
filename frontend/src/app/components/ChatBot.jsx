"use client";

import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import Logo from "@/assets/MNlogo_small.svg";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi there! 👋 How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
      items: [],
    },
  ]);
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 600);
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        onClick={toggleChat}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg focus:outline-none transition-all duration-300 ${isOpen ? "bg-[var(--primary-color)] text-white" : "bg-white text-[var(--primary-color)] border border-[var(--primary-color)]"} ${isButtonAnimating ? "animate-bounce" : ""} ${isOpen ? "scale-95" : "scale-100 hover:scale-105"}`}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <IconX className="w-6 h-6" />
        ) : (
          <>
            <Image className="appLogo" src={Logo} alt="Logo" width={48} height={48} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </>
        )}
      </button>

      <div className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 transform origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}>{shouldRender && <ChatWindow messages={messages} setMessages={setMessages} />}</div>
    </div>
  );
}

export default ChatBot;
