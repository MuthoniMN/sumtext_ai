async function textToSpeech(text) {
  const data = {
    "inputs": text
  };

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech", config);
    console.log(response);

    return response.arrayBuffer()
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = textToSpeech;