import Dexie from "dexie";

export const db = new Dexie("chatApp");

db.version(1).stores({
  conversations: "id, title, createdAt",
  messages: "id, conversationId, timestamp"
});