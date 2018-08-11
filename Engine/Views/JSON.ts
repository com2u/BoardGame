import { View } from './View'

export class JSONView<EditedObject> implements View {
  constructor(
    value: EditedObject,
    private onInput: (newValue: EditedObject) => void
  ) {
    this.input = document.createElement('textarea')
    this.input.addEventListener('keyup', this.handleInput)
    this.setValue(value)
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

  public get element() {
    return this.input
  }

  public destroy() {
    this.input.removeEventListener('keyup', this.handleInput)
  }
}
