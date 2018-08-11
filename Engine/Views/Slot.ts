import { View } from './View';
import { createElement } from '../HTMLHelpers/CreateElement';

export class SlotView<Content extends View> implements View {
  constructor(
    private className: string | null = null,
    private currentContent: Content | null
  ) {

  }

  public set content(content: Content) {
    this.destroyContent()
    this.currentContent = content

    if (content == null) {
      return
    }

    this.root.appendChild(content.element)
  }

  private destroyContent() {
    if (this.currentContent == null) {
      return
    }
    this.root.removeChild(this.currentContent.element)
    this.currentContent.destroy()
  }

  private root = createElement('div', ['slot-view', this.className])

  public get element() {
    return this.root
  }

  public destroy() {
    this.destroyContent()
  }
}
