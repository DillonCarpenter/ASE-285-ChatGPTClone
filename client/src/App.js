import { useState, useEffect } from "react";
import { db } from "./db";
import ChatBox from "./components/ChatBox.jsx";
import ChatHistory from "./components/ChatHistory.jsx";
import ConversationList from "./components/ConversationList.jsx";
import NewConversationInput from "./components/NewConversationInput.jsx";


function App() {
  const initialConversation = {
    id: "1",
    title: "My First Conversation",
    messages: []
  };
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const loadConversations = async () => {
    const [convs, messages] = await Promise.all([
      db.conversations.toArray(),
      db.messages.toArray()
    ]);

    const grouped = convs.map(conv => ({
      ...conv,
      messages: messages.filter(m => m.conversationId === conv.id).sort((a, b) => a.timestamp - b.timestamp)
    }));

    setConversations(grouped);
  };

  useEffect(() => {
    loadConversations();
  }, []);


  const handleSend = async (message) => {
    const convId = selectedConversationId;

    // 1. write user message to DB
    await db.messages.add({
      id: crypto.randomUUID(),
      conversationId: convId,
      sender: "client",
      content: message,
      timestamp: Date.now()
    });

    // 2. call server
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // 3. store server response
    await db.messages.add({
      id: crypto.randomUUID(),
      conversationId: convId,
      sender: "server",
      content: data.reply,
      timestamp: Date.now()
    });

    // 4. reload UI from DB
    loadConversations();
  };
  const handleCreateConversation = async (title) => {
    const conversation = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now()
    };

    await db.conversations.add(conversation);

    setSelectedConversationId(conversation.id);
    loadConversations();
  };

  return (
    <div className="App">
      <h1>React + Node.js Express</h1>

      <ChatHistory messages={conversations.find(c => c.id === selectedConversationId)?.messages || []} />
      <ChatBox onSend={handleSend} />
      <ConversationList
        conversations={conversations}
        onSelect={setSelectedConversationId}
      />
      <NewConversationInput onCreate={handleCreateConversation} />
    </div>
  );
}

export default App;