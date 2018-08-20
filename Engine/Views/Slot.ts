import { View } from './View';
import { createElement } from '../HTMLHelpers/CreateElement';

export class SlotView<Content extends View> implements View {
  constructor(
    private className: string | null = null,
    currentContent: Content | null
  ) {
    this.content = currentContent
  }

  private currentContent: Content | null = null

  public set content(content: Content | null) {
    this.destroyContent()
    this.currentContent = content

    if (content == null) {
      return
    }

    this.root.appendChild(content.element)
  }

  public get content() {
    return this.currentContent
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
