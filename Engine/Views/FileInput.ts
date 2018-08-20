import { View } from './View'
import { createElement } from '../HTMLHelpers/CreateElement';

export class FileInputView implements View {
  constructor(
    private onInput: (file: File | null) => void,
    private extensions: string,
    private className: string | null = null
  ) {
    this.input.addEventListener('change', this.handleChange)
  }

  private handleChange = () => {
    this.onInput(this.input.files && this.input.files[0])
  }

  public get value() {
    return this.input.files && this.input.files[0]
  }

  private input = createElement(
    'input',
    ['file-input-view', this.className],
    {},
    {
      type: 'file',
      accept: this.extensions
    }
  )

  public get element() {
    return this.input
  }

  public destroy() {
    this.input.removeEventListener('change', this.handleChange)
  }
}
