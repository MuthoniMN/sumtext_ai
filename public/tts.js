const textToConvert = document.getElementById("text_to_convert");
const submitBtn = document.getElementById("submit-button");
const audioPlayer = document.getElementById("audio-player");

submitBtn.addEventListener("click", () => {
  submitBtn.classList.add("submit-button--loading");

  const text = textToConvert.value;

  const body = JSON.stringify({ "text_to_convert": text });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow'
  };

  fetch("/texttospeech", requestOptions)
    .then(result => {
      let blob = new Blob(
        [result.arrayBuffer()], { type: "audio/mpeg" });
      let audioUrl = URL.createObjectURL(blob);
      audioPlayer.src = audioUrl;
      console.log(audioUrl);
      submitBtn.classList.remove("submit-button--loading");
    })
    .catch(error => console.log('error', error));
})