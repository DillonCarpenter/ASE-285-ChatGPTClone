import axios from "axios";
import { getApiKey } from "../db"; // Dexie helper

export async function sendChat(conversation) {
  const apiKey = await getApiKey();

  const messages = (conversation || [])
    .filter(msg =>
      msg?.content &&
      typeof msg.content === "string" &&
      msg.content.trim()
    )
    .map(msg => ({
      role: msg.sender, // "user" | "assistant"
      content: msg.content.trim()
    }))
    .slice(-10);
  console.log("Sending conversation to API:", messages);
  const res = await axios.post(
    "https://api.openai.com/v1/responses",
    {
      model: "gpt-5.4-nano",
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content: "You are a helpful assistant. Be concise, accurate, and friendly."
        },
        ...messages
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }
  );
  console.log("API response:", res.data);
  console.log(
    res.data.output.flatMap(o => o.content || [])
  );
  const reply = res.data.output
  ?.flatMap(item => item.content || [])
  ?.filter(c => c.type === "output_text")
  ?.map(c => c.text)
  ?.join("") || "";
  return reply;
}