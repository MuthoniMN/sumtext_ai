const axios = require('axios');

async function textToSpeech(text) {
  let data = JSON.stringify({
    "inputs": text
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.json();
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = textToSpeech;