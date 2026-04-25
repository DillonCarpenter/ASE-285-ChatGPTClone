import { useState, useEffect } from "react";
import { db } from "./db";
import ChatBox from "./components/ChatBox.jsx";
import ChatHistory from "./components/ChatHistory.jsx";
import ConversationList from "./components/ConversationList.jsx";
import NewConversationInput from "./components/NewConversationInput.jsx";
import "./App.css";
import { sendChat } from "./openapi.js";
import { getApiKey, saveApiKey } from "./db";
import SetupScreen from "./components/SetupScreen.jsx";


function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [apiKey, setApiKey] = useState(undefined); 

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
    async function loadKey() {
      const key = await getApiKey();
      setApiKey(key);
    }

    loadKey();
  }, []);

  const handleSaveApiKey = async (key) => {
    await saveApiKey(key);
    setApiKey(key);
  };

  const handleSend = async (message) => {
    const convId = selectedConversationId;

    // 1. write user message to DB
    await db.messages.add({
      id: crypto.randomUUID(),
      conversationId: convId,
      sender: "user",
      content: message,
      timestamp: Date.now()
    });
    //2. grab the entire conversation history from DB
    const conversation = await db.messages.where("conversationId").equals(convId).sortBy("timestamp");

    // 3. call server
    const data = await sendChat(conversation);

    // 4. store server response
    await db.messages.add({
      id: crypto.randomUUID(),
      conversationId: convId,
      sender: "assistant",
      content: data,
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

  const deleteConversation = async (id) => {
    await db.conversations.delete(id);
    await db.messages.where("conversationId").equals(id).delete();
    // What if they delete conversation they have selected?
    if (selectedConversationId === id) {
      setSelectedConversationId(null);
    }
    loadConversations();
  }
  if (!apiKey) {
    return <SetupScreen onSave={handleSaveApiKey} />;
  }

  return (
    
    <div className="app">
      <div className="app-header">
        ChatGPT Clone
      </div>
      <div className="sidebar">
        <NewConversationInput onCreate={handleCreateConversation} />
        <ConversationList
          conversations={conversations}
          onSelect={setSelectedConversationId}
          onDelete={deleteConversation}
        />
      </div>

      <div className="main">
        <ChatHistory
          messages={
            conversations.find(c => c.id === selectedConversationId)?.messages || []
          }
        />
      </div>

      {selectedConversationId && (
        <ChatBox onSend={handleSend} />
      )}
    </div>
  );
}

export default App;