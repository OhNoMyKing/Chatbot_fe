import React, { useState } from "react";
import "../chatbot/chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // Send the message to the API
      try {
        const response = await fetch(
          "http://172.24.136.124:5005/webhooks/rest/webhook",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
          }
        );

        const data = await response.json();

        // Iterate through response to add each bot message to messages
        data.forEach((item) => {
          const botMessage = { text: item.text, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">Chatbot</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
