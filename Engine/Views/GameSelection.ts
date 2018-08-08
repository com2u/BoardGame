export class GameSelectionView {
  constructor(
    private root: HTMLElement,
    private games: string[],
    private onSelect: (game: string) => void
  ) {
    this.select = document.createElement('select')
    games.forEach(game => {
      const option = document.createElement('option')
      option.value = game
      option.innerText = game
      this.select.appendChild(option)
    })
    this.select.addEventListener('change', this.changeListener)
    root.appendChild(this.select)
  }

  private changeListener = () => {
    if (this.select.value !== '') {
      this.onSelect(this.select.value)
    }
  }

  private select: HTMLSelectElement

  public destroy() {
    this.select.removeEventListener('change', this.changeListener)
  }
}