import "../styles/ConversationList.css";

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
      <button className="conversation-title" onClick={() => onSelect(conv.id)}>
        {conv.title}
      </button>

      <button className="delete-btn" onClick={() => onDelete(conv.id)}>
        Delete
      </button>
    </div>
  );
}

export default ConversationList;