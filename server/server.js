
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.post('/generate', async (req, res) => {
  try {
    let prompt = req.body.prompt.toString();

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');

    const response = await axios({
      method: 'post',
      url: 'http://localhost:11434/api/generate',
      data: {
        model: 'qwen2:1.5b',
        prompt: prompt,
      },
      responseType: 'stream', 
    });

    let buffer = '';

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.trim() !== '') {
          try {
            const jsonLine = JSON.parse(line);
            if (jsonLine.response) {
              buffer += jsonLine.response;
              // Send the buffer immediately
              res.write(buffer);
              buffer = '';
            }
          } catch (error) {
            console.error('Failed to parse line:', line);
          }
        }
      });
    });

    response.data.on('end', () => {
      if (buffer.trim()) {
        res.write(buffer.trim());
      }
      res.end();
    });

    response.data.on('error', (err) => {
      console.error('Error during streaming:', err);
      res.status(500).send('Failed to generate text');
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate text');
  }
});
app.listen(port, () => {
  console.log(`codellama API listening at http://localhost:${port}`);
});
