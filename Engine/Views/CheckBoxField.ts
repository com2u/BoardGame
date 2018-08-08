export class CheckBoxField {
  constructor(
    private root: HTMLElement,
    private labelText: string,
    private onChange: (checked: boolean) => void
  ) {
    this.label = document.createElement('label')
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'checkbox')
    this.input.addEventListener('change', this.handleCheck)

    this.label.innerText = labelText
    this.label.appendChild(this.input)
    this.root.appendChild(this.label)
  }

  private label: HTMLLabelElement
  private input: HTMLInputElement
  private handleCheck = () => this.onChange(this.input.checked)

  public destroy() {
    this.input.removeEventListener('change', this.handleCheck)
    this.root.removeChild(this.label)
  }
}