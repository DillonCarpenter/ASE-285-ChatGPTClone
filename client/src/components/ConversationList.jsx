function ConversationList({ conversations, onSelect, onDelete }) {
  return (
    <div className="conversation-list">
      {conversations.map(conv => (
        <ConversationListItem
          key={conv.id}
          conv={conv}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function ConversationListItem({ conv, onSelect, onDelete }) {
  return (
    <div className="conversation-item">
      <button onClick={() => onSelect(conv.id)}>
        {conv.title}
      </button>

      <button onClick={() => onDelete(conv.id)}>
        Delete
      </button>
    </div>
  );
}

export default ConversationList;