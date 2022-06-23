class App {
  constructor() {
    this.mainText = "Hello world, my name is Capybara"
    this.typedText = []
    document.addEventListener("keydown", this.handleKeyDown.bind(this))

    this.mainTextDiv = document.getElementById("main-text")
    this.typedTextDiv = document.getElementById("typed-text")

    this.mainTextDiv.innerHTML = this.mainText
  }

  handleKeyDown(char) {
    const key = char.key
    const regex = new RegExp("^[a-zA-Z \,\.\"\'\?]$")
    if (key === "Backspace") {
      this.typedText.pop()
      this.renderTypedText()
    } else if (key.match(regex)) {
      this.typedText.push(key)
      this.renderTypedText()
    }
  }

  // return boolean for each matched typed character to main text character
  textDiff(mainText, typedText) {
    return typedText.map((char, index) => char === mainText[index] ? true : false)
  }

  renderTypedText() {
    const diff = this.textDiff(this.mainText, this.typedText)
    const renderedHtml = this.typedText.map((char, index) => {
      const color = diff[index] ? "" : "bg-red-100"
      const letter = char === " " ? "&nbsp;" : char
      return `<span class="${color}">${letter}</span>`
    }).join('')

    this.typedTextDiv.innerHTML = renderedHtml
  }
}

const app = new App()
