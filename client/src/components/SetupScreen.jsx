import { useState } from "react";

function SetupScreen({ onSave }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSave(input.trim());
  };

  return (
    <div>
      <h2>Enter API Key</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

export default SetupScreen;