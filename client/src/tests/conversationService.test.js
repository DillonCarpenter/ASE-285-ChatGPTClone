import { sendMessage, deleteConversation, createConversation } from "../services/conversationService";
import { db } from "../db";
import { sendChat } from "../services/openapi";

jest.mock("../db", () => ({
  db: {
    messages: {
      add: jest.fn(),
      where: jest.fn(() => ({
        equals: jest.fn(() => ({
          sortBy: jest.fn(() => Promise.resolve([
            { sender: "user", content: "hi" }
          ]))
        }))
      }))
    }
  }
}));

jest.mock("../services/openapi", () => ({
  sendChat: jest.fn(() => Promise.resolve("AI reply"))
}));

test("sendMessage stores user + assistant messages", async () => {
  const result = await sendMessage("conv1", "hello");

  expect(db.messages.add).toHaveBeenCalledTimes(2);

  expect(sendChat).toHaveBeenCalled();

  expect(result).toBe("AI reply");
});

jest.mock("../db", () => ({
  db: {
    conversations: {
      add: jest.fn()
    }
  }
}));

test("creates conversation with id and timestamp", async () => {
  const result = await createConversation("My Chat");

  expect(db.conversations.add).toHaveBeenCalled();

  expect(result).toHaveProperty("id");
  expect(result.title).toBe("My Chat");
});
jest.mock("../db", () => ({
  db: {
    conversations: {
      delete: jest.fn()
    },
    messages: {
      where: jest.fn(() => ({
        equals: jest.fn(() => ({
          delete: jest.fn()
        }))
      }))
    }
  }
}));

test("deletes conversation and messages", async () => {
  await deleteConversation("conv1");

  expect(db.conversations.delete).toHaveBeenCalledWith("conv1");
  expect(db.messages.where).toHaveBeenCalled();
});
import axios from "axios";

jest.mock("axios");
jest.mock("../db", () => ({
  getApiKey: jest.fn(() => Promise.resolve("fake-key"))
}));

test("formats messages correctly before sending", async () => {
  axios.post.mockResolvedValue({
    data: {
      output: [
        {
          content: [{ type: "output_text", text: "hi" }]
        }
      ]
    }
  });

  const result = await sendChat([
    { sender: "user", content: "hello" }
  ]);

  expect(axios.post).toHaveBeenCalled();

  const payload = axios.post.mock.calls[0][1];

  expect(payload.input[1]).toEqual({
    role: "user",
    content: "hello"
  });

  expect(result).toBe("hi");
});