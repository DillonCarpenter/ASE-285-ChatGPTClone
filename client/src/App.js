import { useState } from "react";
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
  const [conversations, setConversations] = useState([initialConversation]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const handleSend = async (message) => {

    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversationId
      ? { ...conv, messages: [...conv.messages, {
          conversationId: conv.id,
          sender: "client",
          content: message
        }] 
      }
      : conv
    ));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      // add server reply
      setConversations(prev => prev.map(conv =>
        conv.id === selectedConversationId
        ? { ...conv, messages: [...conv.messages, {
            conversationId: conv.id,
            sender: "server", 
            content: data.reply
          }] }
        : conv
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateConversation = (title) => {
    const conversation = {
      id: crypto.randomUUID(),
      title,
      messages: []
    };

    setConversations(prev => [...prev, conversation]);
    setSelectedConversationId(conversation.id);
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