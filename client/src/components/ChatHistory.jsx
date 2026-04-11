function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((msg) => (
        <p key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.content}
        </p>
      ))}
    </div>
  );
}

export default ChatHistory;