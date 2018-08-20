import { View } from './View';
import { createElement } from '../HTMLHelpers/CreateElement';
import { setClassName } from '../HTMLHelpers/SetClassName';

export class GameSelectionView implements View {
  constructor(
    private games: string[],
    private onSelect: (game: string) => void
  ) {
    this.render()
    this.select.addEventListener('click', this.clickListener)
  }

  public get element() {
    return this.select
  }

  private _value: string | null = null

  private clickListener = (event: Event) => {
    const node = event.target as HTMLElement
    if (node.dataset.value != null) {
      this.value = node.dataset.value
      this.onSelect(node.dataset.value)
    }
  }

  public set options(options: string[]) {
    this.games = options
    this.render()
  }

  public set value(v: string | null) {
    this._value = v
    for (const node of this.select.childNodes) {
      const n = node as HTMLElement
      setClassName(n, 'selected', n.dataset.value === v)
    }
  }

  public get value() {
    return this._value
  }

  private render() {
    while (this.select.children.length) {
      this.select.removeChild(this.select.firstChild as Node)
    }
    this.games.forEach(game => {
      const option = createElement('button', ['select-option'], {}, { tabIndex: '0' })
      option.dataset.value = game
      option.innerText = game
      this.select.appendChild(option)
    })
  }

  private select = createElement('div', [], { display: 'flex', flexFlow: 'column' })

  public destroy() {
    this.select.removeEventListener('click', this.clickListener)
  }
}
