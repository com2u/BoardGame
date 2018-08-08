import { View } from './View'
import { createElement } from './CreateElement';

export class LabelView implements View {
  constructor(
    private _text: string,
    private className: string
  ) {
    this.text = _text
  }

  public set text(newValue: string) {
    this._text = newValue
    this._element.innerHTML = newValue
  }

  public get text() {
    return this._text
  }

  private _element = createElement('div', [this.className])

  public get element() {
    return this._element
  }

  public destroy() {

  }
}