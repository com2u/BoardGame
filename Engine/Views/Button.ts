import { View } from './View'

export class ButtonView implements View {
  constructor (
    private root: HTMLElement | null,
    private buttonLabel: string,
    private onClick: () => void
  ) {
    this.button = document.createElement('button')
    this.button.innerHTML = buttonLabel
    this.button.addEventListener('click', this.onClick)
    if (this.root != null) {
      this.root.appendChild(this.button)
    }
  }

  private button: HTMLButtonElement

  public get element() {
    return this.button
  }

  public destroy() {
    if (this.root != null) {
      this.root.removeChild(this.button)
    }
    this.button.removeEventListener('click', this.onClick)
  }
}