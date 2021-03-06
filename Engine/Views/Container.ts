import { View } from './View'
import { createElement } from '../HTMLHelpers/CreateElement'

export class ContainerView<Content extends { [key: string]: View | HTMLElement }> implements View {
  constructor(
    private _content: Content,
    className: string | string[] | null = null,
    private eventListeners?: {
      [K in keyof HTMLElementEventMap]?: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any
    }
  ) {
    const classNames = ['container-view']

    if (Array.isArray(className)) {
      classNames.push(...className)
    } else if (typeof className === 'string') {
      classNames.push(className)
    }
    this.container = createElement('div', classNames)

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
      const node = _content[key]
      if (node instanceof HTMLElement) {
        this.container.appendChild(node)
      } else {
        this.container.appendChild(node.element)
      }
    })
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
      const node = this._content[key]
      if (node instanceof HTMLElement) {
        this.container.removeChild(node)
      } else {
        this.container.removeChild(node.element)
        node.destroy()
      }
    })
  }
}
