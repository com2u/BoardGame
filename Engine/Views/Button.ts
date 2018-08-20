import { View } from './View'

export class ButtonView implements View {
  constructor(
    private buttonLabel: string,
    private onClick: () => void,
    className = 'button-view'
  ) {
    this.button = document.createElement('button')
    this.button.classList.add(className)
    this.button.innerHTML = buttonLabel
    this.button.addEventListener('click', this.onClick)
  }

  private button: HTMLButtonElement

  public get element() {
    return this.button
  }

  public destroy() {
    this.button.removeEventListener('click', this.onClick)
  }
}
