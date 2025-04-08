const express = require('express');
const app = express();
const port = 3000;

// ...existing code...

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send('API is running');
});

// ...existing code...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});