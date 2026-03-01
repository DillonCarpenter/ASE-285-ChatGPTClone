interface Message {
  id: string;
  conversationId: string;
  sender: "client" | "server";
  content: string;
  timestamp: number;
}