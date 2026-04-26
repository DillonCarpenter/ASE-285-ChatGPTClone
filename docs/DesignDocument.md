---

marp: true
theme: default
paginate: true
--------------

# React / Electron App Architecture

### App.js as Central Coordinator

---

## High-Level Overview

* **App.js = central orchestrator**
* Coordinates UI, state, data access, and side effects
* Follows: **UI = f(State)**

---

## Core Responsibilities of App.js

* Manages **application state**
* Passes **props (data)** to components
* Passes **callback functions (actions)** to components
* Coordinates external systems:

  * IndexedDB (via Dexie.js)
  * REST APIs (via Axios)
  * Shared services (refactored functions)

---

## Component Communication Model

### Downward Data Flow

* App.js → Components
* Props contain:

  * State values
  * Derived values
---

### Upward Interaction

* Components → App.js
* Via callbacks:

  * onClick handlers
  * event triggers
  * user actions

---

## UI Principle

> UI is a function of State

* State changes in App.js trigger re-render
* Components remain mostly **stateless or controlled**
* Predictable UI rendering flow

---

## Data Layer: IndexedDB (Dexie.js)

* App.js communicates with **Dexie.js wrapper**
* Used for persistent local storage
* Responsibilities:

  * Read data (initial load / queries)
  * Write data (user actions / updates)
  * Sync local state with DB

---

## External API Layer (Axios)

* App.js performs HTTP requests using Axios

* Responsibilities:

  * Fetch remote data from openAI
  * Handle async workflows
---

## Flow Summary

```
User Action
   ↓
Component
   ↓ (callback)
App.js
   ↓ ↓ ↓
State update | Dexie.js | Axios | Services
   ↓
Re-render UI
```

---

## Key Design Pattern

* **Single coordination point (App.js)**
* **Separation of concerns**:

  * UI (Components)
  * State orchestration (App.js)
  * Persistence (Dexie.js)
  * Remote data (Axios)
  * Logic (Services)

---

## Benefits

* Predictable data flow
* Easier debugging
* Reusable service logic
* Clear separation of concerns

---

## Potential Scaling Considerations

* App.js can become a **god component**
* Mitigation strategies:

  * Move logic to services/hooks
  * Introduce state management (Redux/Zustand)
  * Split orchestration into modules

---

# End
