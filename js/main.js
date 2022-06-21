let mainText = "Hello world, my name is Capybara"

const mainTextDiv = document.getElementById("main-text")

function setMainText(text) {
  mainTextDiv.innerHTML = text
}

setMainText(mainText)
