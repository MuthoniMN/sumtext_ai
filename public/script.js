const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

function verifyTextLength(e) {
  let text = e.target
  if (text.value.length > 100000) {
    alert("Text must be less than 100000 characters.");
  } else if (text.value.length < 200) {
    alert("Text must be more than 200 characters.");
  } else {
    submitButton.disabled = false;
  }
}
textArea.addEventListener("input", verifyTextLength);

submitButton.addEventListener("click", async () => {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/summarize", requestOptions)
    .then(response => response.text())
    .then(result => {
      summarizedTextArea.value = result
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => console.log('error', error));
})