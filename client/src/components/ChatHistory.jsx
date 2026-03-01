function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.sender}:</strong> {msg.content}
        </p>
      ))}
    </div>
  );
}

export default ChatHistory;