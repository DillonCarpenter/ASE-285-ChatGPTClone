import { useState } from "react";
import "../styles/ChatBox.css";


function ChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    onSend(input);   // <-- send to parent
    setInput("");    // clear input
  };

  return (
    <div className="chat-floating-container">
      <h2>Chat</h2>

      <input
        className="chat-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />

      <button className="chat-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}


export default ChatBox;