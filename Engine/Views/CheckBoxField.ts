import { View } from './View'

export class CheckBoxField implements View {
  constructor(
    private labelText: string,
    private onChange: (checked: boolean) => void
  ) {
    this.label = document.createElement('label')
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'checkbox')
    this.input.addEventListener('change', this.handleCheck)

    this.label.innerText = labelText
    this.label.appendChild(this.input)
  }

  private label: HTMLLabelElement
  private input: HTMLInputElement
  private handleCheck = () => this.onChange(this.input.checked)

  public get element() {
    return this.label
  }

  public destroy() {
    this.input.removeEventListener('change', this.handleCheck)
  }
}