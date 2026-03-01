const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Sample API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

//Chat REST API
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  console.log("User said:", message);

  res.json({ reply: "Hello User!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
