function ConversationList({ conversations, onSelect }) {
  return (
    <div className="conversation-list">
      {conversations.map(conv => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
        >
          {conv.title}
        </button>
      ))}
    </div>
  );
}

export default ConversationList;