import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`${API_URL}/messages`);
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (sender && message) {
      await axios.post(`${API_URL}/messages`, { sender, message });
      const response = await axios.get(`${API_URL}/messages`);
      setMessages(response.data);
      setMessage("");
    }
  };

  return (
    <div className="App">
      <h1>Chat Interface</h1>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.sender}: </strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Your name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
