import { View } from './View';
import { createElement } from '../HTMLHelpers/CreateElement';

export class InputField<Input extends View> implements View {
  constructor(
    private label: string,
    private inputView: Input,
    private className: string | null = null
  ) {
    this.text.innerHTML = this.label
    this.labelElement.appendChild(this.text)
    this.labelElement.appendChild(this.inputView.element)
  }

  private text = createElement('span', ['input-field-view__label'])

  private labelElement = createElement('label', ['input-field-view', this.className])

  public get input() {
    return this.inputView
  }

  public get element() {
    return this.labelElement
  }

  public destroy() {
    this.labelElement.removeChild(this.text)
    this.labelElement.removeChild(this.inputView.element)
  }
}
