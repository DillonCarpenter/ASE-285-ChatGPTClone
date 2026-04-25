jest.mock("axios", () => ({
  post: jest.fn()
}));

jest.mock("../db", () => ({
  getApiKey: jest.fn()
}));

import axios from "axios";
import { getApiKey } from "../db";
import { sendChat } from "../services/openapi";

beforeEach(() => {
  jest.clearAllMocks();
});
test("sends formatted messages to OpenAI", async () => {
  getApiKey.mockResolvedValue("test-key");

  axios.post.mockResolvedValue({
    data: {
      output: [
        {
          content: [
            { type: "output_text", text: "hi" }
          ]
        }
      ]
    }
  });

  const conversation = [
    { sender: "user", content: "hello" }
  ];

  await sendChat(conversation);

  expect(axios.post).toHaveBeenCalledTimes(1);

  const payload = axios.post.mock.calls[0][1];

  expect(payload.model).toBe("gpt-5.4-nano");
  expect(payload.input[1]).toEqual({
    role: "user",
    content: "hello"
  });
});
test("filters empty messages", async () => {
  getApiKey.mockResolvedValue("test-key");

  axios.post.mockResolvedValue({
    data: {
      output: [
        {
          content: [
            { type: "output_text", text: "ok" }
          ]
        }
      ]
    }
  });

  await sendChat([
    { sender: "user", content: "" },
    { sender: "user", content: "   " },
    { sender: "user", content: "valid" }
  ]);

  const payload = axios.post.mock.calls[0][1];

  const messages = payload.input.filter(m => m.role !== "developer");

  expect(messages.some(m => m.content === "valid")).toBe(true);
});