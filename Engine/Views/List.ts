import { View } from './View'
import { ReadonlyObservableArray } from '../../reaction-framework/observable-array';
import { createElement } from './CreateElement';

export class ListView<ListItem> implements View {
  constructor (
    private array: ReadonlyObservableArray<ListItem>,
    private itemRenderer: (item: ListItem) => View,
    private className: string | null = null
  ) {
    array.itemAdded.subscribe(() => this.redraw())
    array.itemRemoved.subscribe(() => this.redraw())
    this.redraw()
  }

  private redraw() {
    this.destroy()
    this.array.items.forEach(item => {
      const view = this.itemRenderer(item)
      this.container.appendChild(view.element)
      this.renderedViews.push(view)
    })
  }

  private renderedViews = [] as View[]

  private container = createElement('div', ['list-view', this.className])

  public get element() {
    return this.container
  }

  public destroy() {
    let child: Node | null
    while (child = this.container.firstChild) {
      this.container.removeChild(child)
    }
    this.renderedViews.forEach(v => v.destroy())
    this.renderedViews = []
  }
}