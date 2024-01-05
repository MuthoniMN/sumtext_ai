const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js')
const textToSpeech = require('./tts.js')

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(summary => {
      res.send(summary);
    })

})

app.post('/texttospeech', (req, res) => {
  const text = req.body.text_to_convert;
  textToSpeech(text)
    .then(audio => {
      res.send(JSON.stringify(audio));
    })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
