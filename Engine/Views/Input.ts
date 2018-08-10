import { View } from './View'
import { createElement } from './CreateElement';

export class InputView implements View {
  constructor(
    private onChange: (value: string) => void,
    private className: string | null = null
  ) {
    this.input.addEventListener('change', this.handleChange)
  }

  private input = createElement(
    'input',
    ['input-view', this.className],
    {},
    {
      type: 'text'
    }
  )

  public get value() {
    return this.input.value == '' ? null : this.input.value
  }

  public set value(value: string | null) {
    this.input.value = value == null ? '' : value
  }

  private handleChange = () => this.onChange(this.input.value)

  public get element() {
    return this.input
  }

  public destroy() {
    this.input.removeEventListener('change', this.handleChange)
  }
}