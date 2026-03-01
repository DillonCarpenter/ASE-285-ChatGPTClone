import React, { useState } from "react";

function NewConversationInput({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;

    onCreate(title);
    setTitle("");
  };

  return (
    <div className="new-conversation">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Conversation title"
      />

      <button onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default NewConversationInput;