export class JSONView<EditedObject> {
  constructor (
    private root: HTMLElement,
    value: EditedObject,
    private onInput: (newValue: EditedObject) => void
  ) {
    this.input = document.createElement('textarea')
    this.input.addEventListener('keyup', this.handleInput)
    this.setValue(value)
    this.root.appendChild(this.input)
  }

  public setValue(value: EditedObject) {
    this.input.value = JSON.stringify(value, null, 2)
  }

  private handleInput = () => {
    try {
      this.onInput(JSON.parse(this.input.value || ''))
    } catch (e) {
      console.log(e)
    }
  }

  private input: HTMLTextAreaElement

  public destroy() {
    this.input.removeEventListener('keyup', this.handleInput)
    this.root.removeChild(this.input)
  }
}