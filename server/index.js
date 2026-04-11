import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Sample API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { conversation } = req.body;
    console.log("Received conversation:", conversation);

    // 1. Validate + filter messages
    const messages = (conversation || [])
      .filter(msg =>
        msg &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0 &&
        (msg.sender === "user" || msg.sender === "assistant")
      )
      .map(msg => ({
        role: msg.sender,
        content: msg.content.trim(),
      }));
    
    console.log("Filtered messages:", messages);
    const trimmed = messages.slice(-10); //Save on token usage by removing the last 10 messages and assigning it to trimmed
    console.log("Trimmed messages:", trimmed);
    // 2. Call OpenAI Responses API
    const response = await openai.responses.create({
      model: "gpt-5.4-nano",
      reasoning: { effort: "low" },

      input: [
        {
          role: "developer",
          content: "You are a helpful assistant. Be concise, accurate, and friendly.",
        },
        ...trimmed,
      ],
    });

    const reply = response.output_text;

    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
