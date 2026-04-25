import "../styles/ChatHistory.css";

function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((msg) => (
        <div className={`chat-message ${msg.sender}`} key={msg.id}>
          <div className="chat-sender">{msg.sender}</div>
          <div className="chat-content">{msg.content}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;