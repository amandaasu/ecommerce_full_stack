"use client";
import React from "react";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
        max-w-[80%] rounded-2xl px-4 py-2 shadow-sm animate-fadeIn
        ${isUser ? "bg-[var(--primary-color)] text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none border border-gray-200"}
      `}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 text-right ${isUser ? "text-red-200" : "text-gray-500"}`}>{time}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
