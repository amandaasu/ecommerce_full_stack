// Chat Interface Component
"use client";
import { useState, useEffect } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const SERVER_URL = "ws://localhost:3000";

  useEffect(() => {
    const websocket = new WebSocket(SERVER_URL);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, ...data.items]);
    };

    return () => websocket.close();
  }, []);

  const handleSend = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg">
      <div className="h-64 overflow-y-auto mb-4 p-2 bg-white rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-800">{msg.message || msg.title || "Unknown"}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about SKU, type, price, or say hello..." className="flex-1 p-2 border rounded" />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
