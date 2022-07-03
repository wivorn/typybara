class App {
  constructor() {
    this.sampleTexts = []
    this.mainText = "Trust in the Lord with all your heart."
    this.typedText = []

    this.mainTextDiv = document.getElementById("main-text")
    this.typedTextDiv = document.getElementById("typed-text")
    this.correctionTextDiv = document.getElementById("correction-text")
    this.logoDiv = document.getElementById("logo")

    document.addEventListener("keydown", this.handleKeyDown.bind(this))
    this.logoDiv.onclick = this.handleLogoClick.bind(this)

    this.mainTextDiv.innerHTML = this.mainText
  }

  handleKeyDown(char) {
    const key = char.key
    const regex = new RegExp("^[a-zA-Z0-9 \,\.\"\'\?\!;]$")
    if (key === "Backspace") {
      this.typedText.pop()
      this.renderTypedText()
      this.animateKey('delete')
    } else if (char.code === 'ShiftLeft') {
      this.animateKey('shiftLeft')
    } else if (char.code === 'ShiftRight') {
      this.animateKey('shiftRight')
    } else if (key.match(regex)) {
      this.typedText.push(key)
      this.renderTypedText()
      this.animateKey(key)
    }
  }

  handleLogoClick() {
    const currentPosition = this.typedText.length
    this.animateKey(this.mainText[currentPosition].toLowerCase())
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

    this.renderCorrectionText()
  }

  renderCorrectionText() {
    const mainText = this.mainText.split('')
    const diff = this.textDiff(mainText, this.typedText)
    const renderedHtml = diff.map((correct, index) => {
      const color = correct ? "text-correct" : "text-incorrect"
      const letter = mainText[index] === " " ? "&nbsp;" : mainText[index]
      return `<span class="${color}">${letter}</span>`
    }).join('')

    this.correctionTextDiv.innerHTML = renderedHtml
  }

  animateKey(key) {
    const keyElement = document.querySelector(`[data-key="${key}"]`)
    if (keyElement) {
      keyElement.classList.add("key--highlight");
      setTimeout(() => {
        keyElement.classList.remove("key--highlight");
      }, 100)
    }
  }
}

const app = new App()
