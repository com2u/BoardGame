export class GameSelectionView {
  constructor(
    private root: HTMLElement,
    private games: string[],
    private onSelect: (game: string) => void
  ) {
    this.select = document.createElement('select')
    this.render()
    this.select.addEventListener('change', this.changeListener)
    root.appendChild(this.select)
  }

  private changeListener = () => {
    if (this.select.value !== '') {
      console.log('value changed to ', this.select.value)
      this.onSelect(this.select.value)
    }
  }

  public set options(options: string[]) {
    this.games = options
    this.render()
  }

  public set value(v: string) {
    this.select.value = v
  }

  public get value() {
    return this.select.value
  }

  private render() {
    while (this.select.children.length) {
      this.select.removeChild(this.select.firstChild as Node)
    }
    this.games.forEach(game => {
      const option = document.createElement('option')
      option.value = game
      option.innerText = game
      this.select.appendChild(option)
    })
  }

  private select: HTMLSelectElement

  public destroy() {
    this.select.removeEventListener('change', this.changeListener)
  }
}