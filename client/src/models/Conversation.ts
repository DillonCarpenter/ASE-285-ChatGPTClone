interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string;
  conversationId: string;
  sender: "client" | "server";
  content: string;
}