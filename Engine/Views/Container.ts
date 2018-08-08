import { View } from './View'
import { createElement } from './CreateElement'

export class ContainerView<Content extends { [key: string]: View }> implements View {
  constructor(
    private root: HTMLElement | null,
    private _content: Content,
    private className: string | null = null,
    private eventListeners?: {
      [K in keyof HTMLElementEventMap]?: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any
    }
  ) {
    this.container = createElement('div', ['container-view', className])

    if (this.eventListeners != null) {
      Object
        .keys(this.eventListeners)
        .forEach(
          eventName => this.container.addEventListener(
            eventName,
            (this.eventListeners as any)[eventName]
          )
        )
    }

    Object.keys(_content).forEach(key => {
      this.container.appendChild(_content[key].element)
    })
    if (this.root != null) {
      this.root.appendChild(this.container)
    }
  }

  public get content() {
    return this._content
  }

  private container: HTMLDivElement

  public get element() {
    return this.container
  }

  public destroy() {
    if (this.eventListeners != null) {
      Object
        .keys(this.eventListeners)
        .forEach(
          eventName => this.container.removeEventListener(
            eventName,
            (this.eventListeners as any)[eventName]
          )
        )
    }
    Object.keys(this._content).forEach(key => {
      this.container.removeChild(this._content[key].element)
      this._content[key].destroy()
    })
    if (this.root != null && this.root.contains(this.container)) {
      this.root.removeChild(this.container)
    }
  }
}