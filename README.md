---
marp: true
theme: default
---
# ChatGPT Clone

---
# Project Description
- Basically using ChatGPT (Their API) to make ChatGPT

---
# Features and Requirements
---
## Frontend UI
- Users should be able to easily access nontrivial features - Completed
- Design should be simplistic and readable - Completed I guess
---
## ChatBox
- User can type out messages and send them to the server - Completed
- ChatBox sends the message to App.js for handling - Completed
---
## ChatHistory
- User can see the message history of the selected conversation - Completed
- User can see who sent the message, and its contents - Completed
- Selecting between conversations, or sending new messages, results in the ChatHistory updating - Completed
---
## ConversationList
- User can see a list of conversations they have stored - Completed
- User can select any conversation to view in ChatHistory - Completed
---
## NewConversationInput
- User can create new conversations - Completed
- User can create a name for the conversation - Completed
---
## Server
- HTTP Requests - Completed
- Express - Complete
- Handles communication between the client and Open AI API - Completed
---
## Schema
- Conversations - Completed
- Chat Messages - Completed
- User information - Completed
---
## Working with Open AI
- The app must be able to send API requests to Open AI, receive responses, and handle them accordingly - Completed
---
## Deployment
- Electron installer steps
1. navigate to root, client and server folders and run npm install in all three destinations
2. in root, run npm build then npm dist
---
## Data Model and Architecture
- Dexie.js to use Indexed DB. Axios is used to make calls to OpenAI and the last 10 messages of the conversation are passed to the model
---
# Team Members and Roles
- Dillon Carpenter
  - Project Owner and developer
---