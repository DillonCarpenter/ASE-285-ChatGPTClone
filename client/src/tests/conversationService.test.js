jest.mock("../db", () => ({
  db: {
    messages: {
      add: jest.fn(),
      where: jest.fn(() => ({
        equals: jest.fn(() => ({
          sortBy: jest.fn(() => Promise.resolve([]))
        }))
      }))
    },
    conversations: {
      add: jest.fn(),
      delete: jest.fn()
    }
  }
}));

jest.mock("../services/openapi", () => ({
  sendChat: jest.fn(() => Promise.resolve("AI reply"))
}));

global.crypto = {
  randomUUID: () => "test-id"
};

import { db } from "../db";
import { sendChat } from "../services/openapi";
import { sendMessage } from "../services/conversationService";

test("sendMessage stores user + assistant messages", async () => {
  const result = await sendMessage("conv1", "hello");

  expect(db.messages.add).toHaveBeenCalledTimes(2);
  expect(sendChat).toHaveBeenCalled();
  expect(result).toBe("AI reply");
});