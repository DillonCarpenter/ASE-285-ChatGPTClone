import { db } from "../db";
import { sendChat } from "./openapi";

export async function sendMessage(conversationId, message) {
  await db.messages.add({
    id: crypto.randomUUID(),
    conversationId,
    sender: "user",
    content: message,
    timestamp: Date.now()
  });

  const conversation = await db.messages
    .where("conversationId")
    .equals(conversationId)
    .sortBy("timestamp");

  const response = await sendChat(conversation);

  await db.messages.add({
    id: crypto.randomUUID(),
    conversationId,
    sender: "assistant",
    content: response,
    timestamp: Date.now()
  });

  return response;
}

export async function createConversation(title) {
  const conversation = {
    id: crypto.randomUUID(),
    title,
    createdAt: Date.now()
  };

  await db.conversations.add(conversation);
  return conversation;
}
export async function deleteConversation(id) {
  await db.conversations.delete(id);
  await db.messages.where("conversationId").equals(id).delete();
}