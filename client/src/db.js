import Dexie from "dexie";

export const db = new Dexie("chatApp");

db.version(1).stores({
  conversations: "id, title, createdAt",
  messages: "id, conversationId, timestamp",
  settings: "id,value"
});

export async function saveApiKey(key) {
  await db.settings.put({
    id: "apiKey",
    value: key
  });
}

export async function getApiKey() {
  const record = await db.settings.get("apiKey");
  return record?.value || null;
}